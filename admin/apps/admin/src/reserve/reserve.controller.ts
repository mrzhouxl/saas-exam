import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { Crud } from 'nestjs-mongoose-crud';
import { Reserve } from 'libs/db/models/reserve.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Crud({
    model: Reserve
})
@Controller('reserve')
export class ReserveController {
    constructor(
        @InjectModel(Reserve) private readonly model: ReturnModelType<typeof Reserve>,
    ) { }

}
