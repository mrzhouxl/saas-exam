import * as httpContext from 'express-http-context';
import {
  Injectable,
  NestMiddleware,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import * as typegoose from '@typegoose/typegoose';
import { TENANTS, TENANT } from './tenant.module';
import { Request, Response } from 'express';
import { getConnectionToken } from 'nestjs-typegoose';
import { Connection, Model } from 'mongoose';
import { Tenant } from 'libs/db/models/tenant.model';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { InjectBaseModel } from './inject-base-model';

declare global {
  namespace Express {
    // These open interfaces may be extended in an application-specific manner via declaration merging.
    // See for example method-override.d.ts (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/method-override/index.d.ts)
    interface Request {
      db: Connection;
      model: <T extends AnyParamConstructor<any>>(
        name: string,
        ignoreTenant?: boolean,
      ) => typegoose.ReturnModelType<T>;
      tenantId?: string;
    }
    interface Response {}
    interface Application {}
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    @Inject(TENANTS) private tenants: typegoose.DocumentType<Tenant>[],
    @InjectBaseModel(Tenant)
    private baseTenantModel: typegoose.ReturnModelType<typeof Tenant>,
    @Inject(getConnectionToken()) private db: Connection,
  ) {}

  //使用此id可以访问系统全部数据
  whiteList=[]

  async use(req: Request, res, next) {
    httpContext.set('db', this.db);
    req.db = this.db;
    // 获取租户 key
    const tenantKey =
      (req.query.tenantKey as string) ?? req.get('x-tenant-key');
    let tenantId = (req.query.tenantId as string) ?? req.get('x-tenant-id');
    const where: any = {};
    tenantId && (where._id = tenantId);
    tenantKey && (where.key = tenantKey);
    if (Object.keys(where).length > 0) {
      const tenantModel = await this.baseTenantModel.findOne(where);
      if (!tenantModel) {
        throw new NotFoundException('无效的企业');
      }
      tenantId = tenantModel._id;
      httpContext.set('tenantId', tenantId);
      req.tenantId = tenantId;
    }else{
      if(req.query.notanant === 'no'){
        throw new NotFoundException('未查询到当前业务id，请检查系统');
      }
    }

    // @ts-ignore
    req.model = (name: string, ignoreTenant = false) => {
      if (tenantId && !ignoreTenant) {
        //@ts-ignore
        return req.db.model(name).byTenant(tenantId);
      }
      return req.db.model(name);
    };
    next();
  }
}
