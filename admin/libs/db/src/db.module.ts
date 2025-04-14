import { Global, Module, Provider } from '@nestjs/common';
import { getConnectionToken, getModelToken, TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';
import { schemas } from './schemas';
import { Connection } from 'mongoose';
import { buildSchema, setGlobalOptions } from '@typegoose/typegoose'
import * as typegoose from '@typegoose/typegoose';
setGlobalOptions({
  options: {
    allowMixed: typegoose.Severity.ALLOW,
  },
  schemaOptions: {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
});

const models: Provider[] = schemas.map((cl) => ({
  provide: getModelToken(`Base${cl.name}`),
  inject: [getConnectionToken()],
  useFactory(conn: Connection) {
    return conn.model(`${cl.name}`, buildSchema(cl));
  },
}));


@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://127.0.0.1:27017/saas-exam')
  ],
  providers: [DbService, ...models],
  exports: [DbService, ...models],
})
export class DbModule { }