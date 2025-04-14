import { SetMetadata, Inject } from '@nestjs/common';

export const InjectBaseModel = cl => Inject(`Base${cl.name}Model`)
