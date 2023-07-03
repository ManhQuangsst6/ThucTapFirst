export default [
  {
    title: 'Quản trị hệ thống',
    url: '/quan-tri-he-thong',
    name: '/quan-tri-he-thong',
    icon: 'cog-svgrepo-com.svg',
    subMenus: [{
      title: 'Quản lý nhóm người dùng',
      url: '/quan-tri-he-thong/quan-ly-nhom-nguoi-dung',
      name: '/quan-tri-he-thong/quan-ly-nhom-nguoi-dung',
    },
    {
      title: 'Quản lý mat hang',
      url: '/quan-tri-he-thong/test',
      name: '/quan-tri-he-thong/test',
    },
    {
      title: 'Quản lý người dùng',
      url: '/quan-tri-he-thong/quan-ly-nguoi-dung',
      name: '/quan-tri-he-thong/quan-ly-nguoi-dung',
    },

    ]
    //  permissions: ['TIM_KIEM_BAN_DO'],
  },
  {
    title: 'about',
    url: '/about',
    name: 'about',
    icon: 'cog-svgrepo-com.svg',
    subMenus: [{
      title: 'More',
      url: '/test/testv1',
      name: '/test/testv1'
    }]
    //  permissions: ['TIM_KIEM_BAN_DO'],
  },
];
