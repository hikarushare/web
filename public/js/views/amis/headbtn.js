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
          url: '/'
        },
        {
          type: 'button',
          label: 'Torrents',
          actionType: 'url',
          blank: false,
          url: '/torrents'
        },
        {
          type: 'button',
          label: 'User Settings',
          actionType: 'url',
          blank: false,
          url: '/usersettings'
        },
        {
          type: 'button',
          label: 'Help',
          actionType: 'url',
          blank: false,
          url: '/help'
        },
        {
          type: 'button',
          label: 'About',
          actionType: 'url',
          blank: false,
          url: '/about'
        }
      ]
    }
  ]
};