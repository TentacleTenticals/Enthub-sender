import 'dotenv/config';
import {Discord} from './apps/discord/mjs.js';
import {connectDD} from './apps/discord/wss.js';
import {Tg} from './apps/telegram/mjs.js';

function run(o){
  console.log('[Run] Запуск...');
  
  connectDD({
    ss: {},
    que: {
      d: {
        token: process.env['discordToken'],
        intents: 3276799,
        properties: {
           $os: "linux",
           $browser: "chrome",
           $device: "chrome",
        }
      }
    },
    builder: o.builder,
    msg: o.msg
  });
}

run({
  builder: {
    apps: {
      sendTo: ['TG', 'Discord'],
      cfg: {
        DiscordWSS: {// Discord WSS
          guildsId: ['1207338107809042433'],
          channelsId: {// Каналы. Можно добавлять типы
            news: ['1207710517787885588'],
            updates: ['1207710607529484318'],
            feeds: ['1207710655990472915']
          },
          authorsId: ['1166002116096163872']
        },
        Discord: {
          run: 'msgSend',
          getFrom: {
            DiscordWSS: false
          },
          channelsId: {
            news: ['1207338108543303742'],
            updates: ['1207338108543303742'],
            feeds: ['1207338108543303742']
          }
        },
        TG: {// Telegram
          run: 'msgSend',
          getFrom: {
            DiscordWSS: true
          },
          channelsId: {// Каналы. Можно добавлять типы
            news: ['30'],
            updates: ['34'],
            feeds: ['30']
          },
          chatId: '-1002104291393'
        }
      }
    },
    msg: {
      templates: {// Шаблоны сообщений
        news: {
          TG: {
            link: '',
            attachments: '',
            text: (o) => `Новая ${o.link && `[новость](${o.link})`||'новость\\!'}
              ${o.text}`,
            cfg: {
              text: true,
              embeds: false
            }
          },
          Discord: {
            link: '',
            attachments: '',
            text: (o) => `Новая ${o.link && `[новость](${o.link})`||'новость\\!'}
            ${o.text}`,
            embeds: (o) => ([{
              title: `Новая новость\\!`,
              decription: `${o.text}`
            }]),
            cfg: {
              text: true,
              embeds: false
            }
          }
        },
        updates: {
          TG: {
            link: '',
            attachments: '',
            text: (o) => `Новое ${o.link && `[обновление](${o.link})`||'обновление\\!'}
              ${o.text}`
          },
          Discord: {
            link: '',
            attachments: '',
            text: (o) => `Новое ${o.link && `[обновление](${o.link})`||'обновление\\!'}
            ${o.text}`,
            embeds: (o) => ([{
              title: `Новое обновление\\!`,
              description: `${o.link && `[Ссылка](${o.link})`||''}
              ${o.text}`
            }]),
            cfg: {
              text: true,
              embeds: false
            }
          }
        },
        feeds: {
          TG: {
            link: '',
            attachments: '',
            text: (o) => `Новый ${o.link && `[фид](${o.link})`||'фид\\!'}
              ${o.text}`
          },
          Discord: {
            link: '',
            attachments: '',
            text: (o) => `Новый ${o.link && `[фид](${o.link})`||'фид\\!'}
            ${o.text}`,
            embeds: (o) => ([{
              title: `Новый фид\\!`,
              decription: `${o.text}`
            }]),
            cfg: {
              text: true,
              embeds: false
            }
          }
        }
      },
      data: {}
    }
  }
});

// Discord({
//   data: {
//     run: 'msgSend',
//     msg: {
//       text: 'Test, <@1166002116096163872>',
//       embeds: [
//         {
//           title: 'Embeddd',
//           description: 'Description'
//         }
//       ],
//       stickers: ['1208354559882301490'],
//       // attachments: false,
//       mentions: {
//         parse: ['users', 'roles']
//       }
//     }
//   },
//   channelId: '1207338108543303742',
// }).then(
//   res => console.log(`[${res.app}] ${res.process} ${res.status}`, res.data),
//     err => console.log(`[${res.app}] ${res.process} ${res.status}`, res.data)
// )