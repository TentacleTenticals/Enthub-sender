import {connectDD} from './apps/discord/mjs.js';
import {Tg} from './apps/telegram/mjs.js';

function run(o){
  console.log('[Run] Запуск...');

  function sender(o){
    console.log('[Sender] Launched!');

    const promises = [];
    o.list.forEach(e => {
      promises.push(
        apps[e](o.cmd)
      )
    })

    Promise.all(promises).then(
      result => console.log('[Sender] Completed!!!')
    )
  }
  
  connectDD({
    ss: {},
    cfg: {
      guildId: '1207338107809042433',
      channelId: ['1207338108543303742'],
      authorId: ['1166002116096163872']
    },
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
    sendToApps: ['TG'],
    appsCfg: {
      DiscordWSS: {
        guildsId: ['1207338107809042433'],
        channelsId: {
          news: ['1207710517787885588'],
          updates: ['1207710607529484318'],
          feeds: ['1207710655990472915']
        },
        authorsId: ['1166002116096163872']
      },
      TG: {
        run: 'msgSend',
        channelsId: {
          news: ['30'],
          updates: ['34'],
          feeds: ['30']
        },
        chatId: '-1002104291393'
      }
    },
    msg: {
      templates: {
        news: `Новинка\\!`,
        updates: `Обновление\\!`,
        feeds: `Новый фид\\!`
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