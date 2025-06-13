import { CommonModule } from '@app/common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as httpContext from 'express-http-context';
import { TenantMiddleware} from '@app/tenant/tenant.middleware';
import { AuthModule } from './auth/auth.module';
import { CodeModule } from './code/code.module';
import { ConfigModule } from '@nestjs/config';
import { TenantsModule } from './tenants/tenants.module';
import { AdminModule } from './admin/admin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserfileModule } from './userfile/userfile.module';
import { QuestionbankModule } from './questionbank/questionbank.module';
import { ExamModule } from './exam/exam.module';
import { ExamItemModule } from './exam-item/exam-item.module';
import { UploadModule } from './upload/upload.module';
import { ClockInModule } from './clock-in/clock-in.module';
import { CityModule } from './city/city.module';
import { DynamicTableModule } from './dynamic-table/dynamic-table.module';
import { DynamicDbModule } from './dynamic-db/dynamic-db.module';
import { ReserveModule } from './reserve/reserve.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'upload'),
    }),
    CommonModule,
    AuthModule,
    CodeModule,
    TenantsModule,
    AdminModule,
    UserfileModule,
    QuestionbankModule,
    ExamModule,
    ExamItemModule,
    UploadModule,
    ClockInModule,
    CityModule,
    DynamicTableModule,
    DynamicDbModule,
    ReserveModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(httpContext.middleware, TenantMiddleware).forRoutes('*');
  }
}
