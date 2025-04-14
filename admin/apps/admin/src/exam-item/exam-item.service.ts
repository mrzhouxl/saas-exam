import { Result } from '@app/common/result';
import { Injectable, Res } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Exam } from 'libs/db/models/exam.model';
import { ExamItem } from 'libs/db/models/exam_item.model';
import { InjectModel } from 'nestjs-typegoose';
import { v4 as uuidv4 } from 'uuid';
var mammoth = require("mammoth");

@Injectable()
export class ExamItemService {
  constructor(
    @InjectModel(ExamItem) private readonly model: ReturnModelType<typeof ExamItem>,
    @InjectModel(Exam) private readonly examModel: ReturnModelType<typeof Exam>
  ) { }

  
  /**
   * 导入word文件
   * @param file 文件buffer
   * @param sortId 排序id
   * @param objectid 
   * @returns 
   */
  public async importWord(file: Buffer, sortId: number, objectid: string) {
    let unofficial_item = []
    let result = await mammoth.convertToHtml({ buffer: file.buffer })
    let text = result.value; // The raw text
    text = text.replace(/<(?!img).*?>/g, '')
    // let new_text = text.replace(/(\d+(\.\[|\.\s+\[))/g, "abcd$&");\[(单|填|判|多|排)
    // let new_text = text.replace(/(\d\.)\[/g,"abcd$&")
    let new_text = text.replace(/\[(单|填|判|多|排)/g, "abcd$&")
    let arr = new_text.split("abcd");
    arr.splice(0, 1)
    for (let item of arr) {
      // const item = arr[i]
      //获取当前题型
      const [ori, type] = item.match(/\[(.*?)]/) || []
      //标题  
      let [a, title] = item.match(/\](.*?)[ABCDEFG]\./) || []
      //查看是否有题干
      // const index = title.indexOf('*')
      // let stem = "";
      // if (index != -1) {
      //   stem = title.match(/(?<=\*\*)(.*)(?=\*\*)/)[0] || ""
      //   let item = title.split("**")
      //   title = item[item.length - 1]
      // }
      const [c, option] = item.match(/A\.(.*?)答案/) || []
      console.log(option,'option');
      
      //题目选项
      let arrOption = option.split(/[ABCDEFGHIJK]\./).map((v, index) => {
        return {
          label: this.nextOptions(65 + index),
          value: v
        }
      })

      let [d, answer] = item.match(/答案：(.*?)解/) || []
      answer = answer.replace(/[^A-Z]/, "").trim()
      const analysis = item.split('解析：')[1] || ""
      const examitem = {
        id: ++sortId,
        _id: uuidv4(),
        type: this.typeConvert(type),
        title,
        options: arrOption,
        answer,
        analysis,
        difficulty: "",
        score: 5,
        required: true,
        score_method: "only"
      }
      unofficial_item.push(examitem)
    }
    let exam = await this.examModel.findById(objectid);
    //添加并保存从word添加的题目
    exam.unofficial_item.push(...unofficial_item);
    let ex = await exam.save()
    if (ex) {
      return Result.success('')
    } else {
      return Result.error('')
    }
  }

  public nextOptions(value: number | string, isNext?: boolean) {
    const addValue = isNext ? 1 : 0;
    if (typeof value === 'number') {
      return String.fromCharCode(value + addValue)
    }
    if (typeof value === 'string') {
      const v = value.charCodeAt(0)
      return String.fromCharCode(v + addValue);
    }
  }

  public typeConvert(type: string) {
    switch (type) {
      case '单选题': return 'single';;
      case '多选题': return 'multiple';;
      case '判断题': return 'judge';;
      case '排序题': return 'sort';;
      case '不定项': return 'indefinite';;
      case '填空题': return 'enter';;
      default: return '';
    }
  }
}
