let amisJSON = {
  type: 'page',
  title: 'Hikaru Share Project',
  body: [
    {
      type: 'container',
      body: [
        {
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
        },
        {
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
        },
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