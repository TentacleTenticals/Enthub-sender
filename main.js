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
          TG:(o) => `Новая ${o.link && `[новость](${o.link})`||'новость\\!'}
          ${o.text}`
        },
        updates: {
          TG:(o) => `Новое ${o.link && `[обновление](${o.link})`||'обновление\\!'}
          ${o.text}`
        },
        feeds: {
          TG:(o) => `Новый ${o.link && `[фид](${o.link})`||'фид\\!'}
          ${o.text}`
        }
      },
      data: {}
    }
  }
});