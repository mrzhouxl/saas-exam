export interface ExamItem {
  id: number;
  _id: string;
  answer: string;
  options: Array<{ label: string; value: string }>;
  title: string;
  type: string;
  analysis: string;
  difficulty: string;
  score: string;
  required: string;
  scoreMethod: string;
  [key: string]: any;
};

export interface Exam {
  title: string;
  type: string;
  image: string;
  describe: string;
  is_public: number;
  white_list: Array<string>;
  time: string;
  end_time: string;
  exam_item: Array<Exam>;
  [key: string]: any;
}

export const examType = [
  {
    icon: 'icon-danxuanti',
    type: 'single',
    typeName: '单选题'
  },
  {
    icon: 'icon-duoxuanti',
    type: 'multiple',
    typeName: '多选题'
  },
  {
    icon: 'icon-panduanti',
    type: 'judge',
    typeName: '判断题'
  }, {
    icon: 'icon-dongtai',
    type: 'indefinite',
    typeName: '不定项'
  }
  , {
    icon: 'icon-wendati',
    type: 'shortanswer',
    typeName: '简答题'
  },
  {
    icon: 'icon-paixuti',
    type: 'sort',
    typeName: '排序题'
  },
  {
    icon: 'icon-danxuanti',
    type: 'calculate',
    typeName: '计算题'
  }
]


export const questionType = [
  {
    icon: 'icon-danxuanti',
    type: 'single',
    typeName: '单选'
  },
  {
    icon: 'icon-duoxuanti',
    type: 'multiple',
    typeName: '多选'
  },
  {
    icon: 'icon-duoxuanti',
    type: 'dropDown',
    typeName: '下拉'
  },
  {
    icon: 'icon-duoxuanti',
    type: 'picture',
    typeName: '图片选择'
  }
]

export const spaceType = [
  {
    icon: 'icon-danxuanti',
    type: 'space',
    typeName: '填空'
  },
  {
    icon: 'icon-danxuanti',
    type: 'multiLineSpace',
    typeName: '多行填空'
  }
]

export const scoreType = [
  {
    icon: 'icon-danxuanti',
    type: 'scale',
    typeName: '量表'
  },
  // {
  //   icon: 'icon-danxuanti',
  //   type: 'NPS',
  //   typeName: 'NPS'
  // },
  {
    icon: 'icon-danxuanti',
    type: 'scoring',
    typeName: '打分'
  },
  // {
  //   icon: 'icon-danxuanti',
  //   type: 'proportion',
  //   typeName: '比重'
  // }
]

export const fileType = [
  {
    icon: 'icon-danxuanti',
    type: 'uploadImage',
    typeName: '图片收集'
  }
]

export const information = [
  {
    icon: 'icon-danxuanti',
    type: 'name',
    typeName: '姓名'
  },
  {
    icon: 'icon-danxuanti',
    type: 'mobile',
    typeName: '手机'
  },
  {
    icon: 'icon-danxuanti',
    type: 'email',
    typeName: '邮箱'
  },
  {
    icon: 'icon-danxuanti',
    type: 'sex',
    typeName: '性别'
  },
  {
    icon: 'icon-danxuanti',
    type: 'age',
    typeName: '年龄'
  }, {
    icon: 'icon-danxuanti',
    type: 'education',
    typeName: '学历'
  },
  // {
  //   icon: 'icon-danxuanti',
  //   type: 'speciality',
  //   typeName: '专业'
  // },{
  //   icon: 'icon-danxuanti',
  //   type: 'school',
  //   typeName: '院校'
  // },{
  //   icon: 'icon-danxuanti',
  //   type: 'industry',
  //   typeName: '行业'
  // },{
  //   icon: 'icon-danxuanti',
  //   type: 'career',
  //   typeName: '职业'
  // }, 
  {
    icon: 'icon-danxuanti',
    type: 'date',
    typeName: '日期'
  }, {
    icon: 'icon-danxuanti',
    type: 'city',
    typeName: '城市'
  }
]

export const ageOption = [
  {
    label: 'A',
    value: '18岁以下'
  }, {
    label: 'B',
    value: '18-24岁'
  }, {
    label: 'B',
    value: '25-30岁'
  },
  {
    label: 'B',
    value: '31-40岁'
  }, {
    label: 'B',
    value: '41-50岁'
  },
  {
    label: 'B',
    value: '51-60岁'
  }, {
    label: 'B',
    value: '60岁以上'
  }
]

export const educationOption = [
  {
    label: 'A',
    value: '小学及以下'
  }, {
    label: 'B',
    value: '初中'
  }, {
    label: 'B',
    value: '高中/中专/技校'
  },
  {
    label: 'B',
    value: '大学专科'
  }, {
    label: 'B',
    value: '大学本科'
  },
  {
    label: 'B',
    value: '硕士研究生及以上'
  }
]