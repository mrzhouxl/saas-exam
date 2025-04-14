export const menus: Menu[] = [
  // {
  //   path: '/dashboard',
  //   name: '详情',
  //   children: [],
  //   icon: 'iconfont icon-__zongkongmianban',
  //   size: '1rem'
  // },
  {
    path: 'data',
    name: '数据',
    icon: "iconfont icon-__zongkongmianban",
    children: [
      {
        path: '/data/design',
        name: '数据源设计',
        children: [],
        icon: 'icon-yiliao_peizhijiemian',
        size: '1rem'
      },
      {
        path: '/data/tablepage',
        name: '数据列表',
        children: [],
        icon: 'icon-yiliao_peizhijiemian',
        size: '1rem'
      },
    ],
  },
  {
    path: 'design',
    name: '界面',
    children: [
      {
        path: '/design/create',
        name: '主页搭建',
        children: [],
        icon: 'icon-yiliao_peizhijiemian',
        size: '1rem'
      },
      // {
      //   path: '/exam/exam',
      //   name: '主题',
      //   children: [],
      //   icon: 'icon-shoujizhuti_23zhuti',
      //   size: '1rem'
      // }
    ],
    icon: 'icon-yiliao_peizhijiemian',
    size: '1rem'
  },
  {
    path: 'context',
    name: '内容',
    children: [
      {
        path: '/exam/questionbank',
        name: '题库',
        children: [],
        icon: 'icon-tiku',
        size: '1rem'
      },
      {
        path: '/exam/exam_list',
        name: '试卷',
        children: [],
        icon: 'icon-shijuan',
        size: '1rem'
      },
      {
        path: '/exam/question_list',
        name: '问卷',
        children: [],
        icon: 'icon-shijuan',
        size: '1rem'
      },
      // {
      //   path: '/exam/observer',
      //   name: '监测',
      //   children: [],
      //   icon: 'icon-jiance',
      //   size: '1rem'
      // },
      // {
      //   path: '/exam/analysis',
      //   name: '分析',
      //   children: [],
      //   icon: 'icon-fenxi',
      //   size: '1rem'
      // }
    ],
    icon: 'icon-layers-outline',
    size: '1rem'
  },
  // {
  //   path: 'market',
  //   name: '市场',
  //   children: [
  //     {
  //       path:'/exam/exam',
  //       name: '市场',
  //       children: [],
  //       icon: 'icon-04',
  //       size:'1rem'
  //     },
  //     {
  //       path:'/exam/exam',
  //       name: '发布',
  //       children: [],
  //       icon: 'icon-shijuan',
  //       size:'1rem'
  //     }
  //   ],
  //   icon: 'icon-04',
  //   size:'1rem'
  // }, 
  // {
  //   path: 'marketing',
  //   name: '营销',
  //   children: [
  //     {
  //       path: '/marketing/integral',
  //       name: '积分',
  //       children: [],
  //       icon: 'icon-jifen2',
  //       size: '1rem'
  //     },
  //     {
  //       path: '/marketing/lottery',
  //       name: '抽奖',
  //       children: [],
  //       icon: 'icon-choujiang',
  //       size: '1rem'
  //     }

  //   ],
  //   icon: 'icon-yingxiao',
  //   size: '1rem'
  // },
  // {
  //   path: 'plan',
  //   name: '计划',
  //   children: [
  //     {
  //       path: '/plan/plan',
  //       name: '计划',
  //       children: [],
  //       icon: 'icon-tianjiajihua',
  //       size: '1rem'
  //     }
  //   ],
  //   icon: 'icon-tianjiajihua',
  //   size: '1rem'
  // }
  // {
  //   path: 'cert',
  //   name: '证书',
  //   children: [
  //     {
  //       path:'/exam/exam',
  //       name: '证书',
  //       children: [],
  //       icon: 'icon-shijuan',
  //       size:'1rem'
  //     }
  //   ],
  //   icon: 'icon-shijuan',
  //   size:'1rem'
  // }
]

export interface Menu {
  path: string;
  name: string;
  icon: string;
  children: Array<Menu>;
  size?: string;
}