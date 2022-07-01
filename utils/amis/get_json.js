let amisJSONHeadBtn = {
  type: 'container',
  body: [
    {
      type: 'button-toolbar',
      buttons: [
        {
          type: 'button',
          label: 'Home',
          actionType: 'url',
          blank: false,
          url: '/',
        },
        {
          type: 'button',
          label: 'Torrents',
          actionType: 'url',
          blank: false,
          url: '/torrents',
        },
        {
          type: 'button',
          label: 'User Settings',
          actionType: 'url',
          blank: false,
          url: '/usersettings',
        },
        {
          type: 'button',
          label: 'Help',
          actionType: 'url',
          blank: false,
          url: '/help',
        },
        {
          type: 'button',
          label: 'About',
          actionType: 'url',
          blank: false,
          url: '/about',
        },
      ],
    },
  ],
};

let amisJSONUsrInfoBoard = {
  type: 'container',
  body: [
    {
      type: 'tpl',
      tpl: 'User Information',
      inline: false,
      style: {
        fontWeight: 'bold'
      }
    },
    {
      type: 'container',
      body: [],
      style: {},
      className: ''
    }
  ],
  style: {
    marginTop: '',
    paddingTop: '',
    borderStyle: 'none',
    borderColor: '#000000',
    borderWidth: ''
  },
  className: 'm-t'
};

let amisJSONTpl = {
  type: 'page',
  title: 'Hikaru Share Project',
  body: [
    {
      type: 'container',
      body: [
        amisJSONHeadBtn,
        amisJSONUsrInfoBoard,
        {
          type: 'container',
          body: [
            {
              type: 'tpl',
              tpl: 'Template First-level Heading',
              inline: false,
              wrapperComponent: 'h1',
              style: {
                fontWeight: 'bold'
              }
            },
            {
              type: 'container',
              body: []
            }
          ],
          style: {
            textAlign: 'left'
          },
          className: 'm-t-lg'
        }
      ],
      style: {
        textAlign: 'center'
      },
      className: 'm-l-lg m-r-lg'
    }
  ],
  messages: {},
  style: {
    textAlign: 'left'
  }
};

let amisJSONAbout = JSON.parse(JSON.stringify(amisJSONTpl));
amisJSONAbout.body[0].body[2].body[0].tpl = 'About Page';

let amisJSONHome = JSON.parse(JSON.stringify(amisJSONTpl));
amisJSONHome.body[0].body[2].body[0].tpl = 'Announcements';
amisJSONHome.body[0].body[2].body[0].wrapperComponent = 'h1';

let amisJSONTorrents = JSON.parse(JSON.stringify(amisJSONTpl));
amisJSONTorrents.body[0].body[2].body[0].tpl = 'Torrents';
amisJSONTorrents.body[0].body[2].body[1] = {
  type: 'service',
  data: {
    torrents: []
  },
  body: [
    {
      type: 'table',
      columns: [
        {
          label: 'Category',
          name: 'category',
          type: 'text',
          width: '5%',
          align: 'center'
        },
        {
          type: 'text',
          label: 'Title',
          name: 'title',
          labelClassName: 'text-center'
        },
        {
          type: 'text',
          label: 'Duration',
          name: 'duration',
          width: '5%',
          align: 'center'
        },
        {
          type: 'text',
          label: 'Size',
          name: 'size',
          width: '5%',
          align: 'center'
        },
        {
          type: 'text',
          label: 'Seeders',
          name: 'seeders',
          width: '5%',
          align: 'center'
        },
        {
          type: 'text',
          label: 'Leechers',
          name: 'leechers',
          width: '5%',
          align: 'center'
        },
        {
          type: 'text',
          label: 'Completes',
          name: 'completes',
          width: '5%',
          align: 'center'
        },
        {
          type: 'text',
          label: 'Uploader',
          name: 'uploader',
          width: '8%',
          align: 'center'
        }
      ],
      source: '${torrents}'
    }
  ]
};

module.exports = {
  about: amisJSONAbout,
  home: amisJSONHome,
  torrents: amisJSONTorrents
};