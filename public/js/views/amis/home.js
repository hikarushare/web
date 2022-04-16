let amisJSONHome = {
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
              tpl: 'Announcements',
              inline: false,
              wrapperComponent: 'h2',
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
