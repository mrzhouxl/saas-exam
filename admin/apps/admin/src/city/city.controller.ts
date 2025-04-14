import { Controller, Param, Post } from '@nestjs/common';
import axios from 'axios'
import { log } from 'console';

@Controller('city')
export class CityController {
  constructor() { }

  @Post(':id')
  async createCity(@Param('id') id: string) {
    const res = await axios.post('http://area.ylapi.cn/ad_area/division_de.u?uid=12600&appkey=c020844579f18634c4572a1eb323016e&parentId=' + id, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  }
}
