import _ from 'lodash';
import { validate } from 'uuid'

/**
 * 翻译试卷题目类型
 * @param type 试卷类型 
 */
export function examType2Local(type: string) {
  switch (type) {
    case 'single': return '单选题';;
    case 'multiple': return '多选题';;
    case 'judge': return '判断题';;
    case 'enter': return '填空题';;
    case 'sort': return '排序题';;
    case 'indefinite': return '不定项';;
    case 'shortanswer': return '简答题';;
    case 'calculate': return '计算题';;
  }
}

/**
 * 给每一个数组里面的对象添加一个有序id
 * @param exam 要添加id的数组
 * @returns 返回添加完id的数组
 */
export function computedExamId<T>(exam: Array<T>) {
  return exam.map((v: T, index: number) => {
    return _.assign(v, { id: index + 1 })
  })
}

/**
 * 计算英文的下一个选项
 * @param value 值assice 和或者英文字母
 */
export function nextOptions(value: number | string) {
  if (typeof value === 'number') {
    return String.fromCharCode(value + 1)
  }
  if (typeof value === 'string') {
    const v = value.charCodeAt(0)
    return String.fromCharCode(v + 1);
  }
}

/**
 * 判断是否是ObjectID
 * @param id 需要判断的id
 */
export function isUUid(id: string) {
  // return objectid.isValid(id);
  return validate(id);
}