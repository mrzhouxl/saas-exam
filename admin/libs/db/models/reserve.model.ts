import { prop } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";

export enum ReserveEnum {
    COMMON = 'COMMON',
    SEAT = "SEAT"
}


export class Reserve extends BaseModel {

    @prop()
    name: string;

    @prop()
    location: string;

    @prop({
        enum: ReserveEnum
    })
    type: ReserveEnum;

    // 可以预约的时间段
    @prop()
    start_time:Date;

    @prop()
    end_time:Date;

    @prop()
    banner:string[]

    @prop()
    split_time:number;

    @prop()
    is_subporject:boolean;

    @prop()
    project:any;

    

}