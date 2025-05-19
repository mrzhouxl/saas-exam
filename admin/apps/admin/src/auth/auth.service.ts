import { Result, Success, Error } from '@app/common/result';
import { InjectBaseModel } from '@app/tenant/inject-base-model';
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { AdminUser } from 'libs/db/models/admin.model';
import { Code } from 'libs/db/models/code.model';
import { Oauth } from 'libs/db/models/oauth.model';
import { Tenant } from 'libs/db/models/tenant.model';


@Injectable()
export class AuthService {
  constructor(
    @InjectBaseModel(Tenant) private tenantModel: ReturnModelType<typeof Tenant>,
    @InjectBaseModel(Oauth) private authModel: ReturnModelType<typeof Oauth>,
    @InjectBaseModel(Code) private codeModel: ReturnModelType<typeof Code>,
    @InjectBaseModel(AdminUser) private readonly adminUserModel: ReturnModelType<typeof AdminUser>,
    private readonly jwtService: JwtService
  ) { }

  /**
   * 用户登录
   * @param mobile 手机号
   * @param code 验证码
   */
  public async login(mobile: string, code: number) {
    let token;
    //查询当前手机号是否在店铺是管理员
    let adminUser:AdminUser[] = await this.adminUserModel.find({
      mobile
    }).populate('tenant').lean()
    // console.log(adminUser)
    if (adminUser.length > 1) { //当前在多家店铺担任角色
      let tenants = adminUser.map((v:any) => v.tenant);
      //让用户选择在进行登录
      return tenants;
    } else {
      if (adminUser.length === 0) {
        let res = await this.register(mobile, code)
        if(res.type === 'error'){
          return res
        }
        if (res.type === 'success') {
          token = await this.getToken({ tenant: res.data.id })
          return Result.success({
            ...res.data,
            token
          })
        }
      } else {
        token = await this.getToken({ tenant: adminUser[0].tenant })
        let codeResult = await this.verifyCode(mobile, code)
        if (codeResult) {
          return Result.success({
            tenant: adminUser[0].tenant,
            admin: adminUser[0],
            token
          })
        }else{
          throw new HttpException('验证码有误',500);
        }
      }
    }
  }

  /**
   * 设置JWT
   * @param data jwt加密数据
   */
  public async getToken(data: any) {
    return this.jwtService.sign({
      tenant: data
    }, {
      secret: process.env.SECRET
    })
  }

  /**
   * 
   * @param mobile 手机号
   * @param code 验证码
   * @returns 是否验证成功
   */
  public async verifyCode(mobile: string, code: number): Promise<boolean> {
    let codeResult = await this.codeModel.findOne({
      mobile
    }).sort({ created_at: -1 })
    if (codeResult && codeResult.code === code) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 手机号注册 
   * @param mobile 手机号
   * @param code 验证码
   */
  public async register(mobile: string, code: number): Promise<Error | Success> {
    let tenant = await this.tenantModel.find({
      mobile
    })
    if (tenant.length > 0) {
      return Result.error(`当前手机号有绑定店铺，手机号为${mobile}`)
    } else {
      let codeResult = await this.verifyCode(mobile, code)
      //如果验证通过
      if (codeResult) {
        // console.log('session')
        // const session = await mongoose.connection.startSession();
        // await session.withTransaction(async () => {
        //注册店铺和添加管理员账号
        let res = await this.tenantModel.create({
          mobile
        });
        let admin = await this.adminUserModel.findOneAndUpdate({
          tenant: res.id,
          mobile
        }, {
          tenant: res.id,
          mobile,
          isDelete:false
        }, {
          new: true,
          upsert: true
        }).lean()
        if (!admin) {
          return Result.error(`店铺管理员创建失败`)
        }
        return Result.success({ admin, tenant: res });
      } else {
        return Result.error(`验证码有问题，手机号：${mobile}`);
      }
    }
  }
}
