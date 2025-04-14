import {
  Module,
  Provider,
  Scope,
  Global,
  NotFoundException,
} from '@nestjs/common';

import { REQUEST } from '@nestjs/core';
import * as typegoose from '@typegoose/typegoose';
import * as httpContext from 'express-http-context';
import * as mongoTenant from './mongo-tenant.plugin';
import { getModelToken } from 'nestjs-typegoose';
import { schemas } from '@app/db/schemas';
import { IModelOptions } from '@typegoose/typegoose/lib/types';
import { Tenant } from 'libs/db/models/tenant.model';
import { isDelete } from './isDelete.plugin';

declare module 'mongoose' {
  //@ts-ignore
  interface Model<T extends Document, QueryHelpers = {}> {
    byTenant(tenant: string): Model<T>
  }
  interface Document {
    tenant?: typegoose.Ref<Tenant>
  }
}

typegoose.mongoose.plugin(mongoTenant, {
  tenantIdType: typegoose.mongoose.Schema.Types.ObjectId,
  tenantIdKey: 'tenant',
});

typegoose.mongoose.plugin(isDelete)

Object.defineProperty(typegoose, 'getModelForClass', {
  get: () => (cl, options: IModelOptions = {}, ignoreTenant = false) => {
    const tenantId = httpContext.get('tenantId');
    const db = httpContext.get('db');
    const model = db.model(cl.name);
    if (tenantId && !ignoreTenant) {
      return model.byTenant(tenantId);
    }
    return model;
  },
});

export const TENANT = 'TENANT';
export const TENANTS = 'TENANTS';
export const tenantsProvider: Provider = {
  provide: TENANTS,
  inject: [getModelToken('BaseTenant')],
  async useFactory(tenantModel: typegoose.ReturnModelType<typeof Tenant>) {
    return await tenantModel.find();
  },
};

const tenancyModels: Provider[] = schemas
  // .filter(v => !['Tenant'].includes(v.name))
  .map((v) => {
    return {
      provide: getModelToken(v.name),
      inject: [REQUEST],
      scope: Scope.REQUEST,
      useFactory(req) {
        return req.model(v.name);
      },
    };
  });

@Global()
@Module({
  providers: [
    tenantsProvider,
    ...tenancyModels,
  ],
  exports: [
    tenantsProvider,
    ...tenancyModels,
  ],
})
export class TenantModule { }
