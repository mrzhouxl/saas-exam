import { CodeService } from 'apps/admin/src/code/code.service';
import { AdminUser } from '../models/admin.model';
import { Code } from '../models/code.model';
import { Exam } from '../models/exam.model';
import { ExamGroup } from '../models/exam_group.model';
import { ExamItem } from '../models/exam_item.model';
import { UserFile } from '../models/file.model';
import { Oauth } from '../models/oauth.model';
import { Tenant } from '../models/tenant.model'
import { DynamicDb } from '../models/dynamic_db.model';
import { DynamicTable } from '../models/dynamic_table.model';


export const schemas = [
  AdminUser,
  Tenant,
  Oauth,
  Code,
  UserFile,
  Exam,
  ExamGroup,
  ExamItem,
  DynamicDb,
  DynamicTable,
];