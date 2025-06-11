import { Injectable } from '@nestjs/common';
// import * as Canvas from 'canvas';
import axios from 'axios'
const qiniu = require("qiniu");

@Injectable()
export class UploadService {

    // 生成4位数的随机id
    public getRandomId() {
        return Math.random().toString(36).substring(2, 6);
    }

    public async getYuyueToken(scopeName: string, name: string) {
        const filename = this.getRandomId() + name;
        const options = {
            scope: `${scopeName}:yuyue/${filename}`
        }
        //初始化
        var mac = new qiniu.auth.digest.Mac(process.env.QINIUKEY, process.env.QINIUSECRET);
        const putPolicy = new qiniu.rs.PutPolicy(options)
        const uploadToken = putPolicy.uploadToken(mac)
        return {
            token: uploadToken,
            filename: `yuyue/${filename}`
        }
    }
}
