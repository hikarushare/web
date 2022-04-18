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
              tpl: 'Torrents',
              inline: false,
              wrapperComponent: 'h1',
              style: {
                fontWeight: 'bold'
              }
            },
            {
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
