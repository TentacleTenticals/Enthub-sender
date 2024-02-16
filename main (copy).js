import 'dotenv/config';
import {connectDD} from './apps/discord/mjs.js';
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
      sendTo: ['TG'],
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
        TG: {// Telegram
          run: 'msgSend',
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
          TG:`**Новинка\\!**`
        },
        updates: {
          TG:`Обновление\\!`
        },
        feeds: {
          TG:`Новый фид\\!`
        }
      },
      data: {}
    }
  }
});
// sender({
//   list: ['TG', 'Discord'],
//   cmd: {
//       url: 'https://...',
//       title: 'Title',
//       text: 'Text'
//   }
// })

// Tg.fetch({
//  run: 'msgSend',
//  chatId: '-1002104291393',
//  text: 'Test'
// })