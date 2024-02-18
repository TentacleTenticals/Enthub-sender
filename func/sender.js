import {Tg} from '../apps/telegram/mjs.js';
import {Discord} from '../apps/discord/mjs.js';
import {msgBuilder} from './msgBuilder.js';

export function sender(o){
  const promises = [];

  const apps = {
    TG: Tg,
    Discord: Discord
  };

  o.builder.apps.sendTo.forEach(e => {
    // const q = {
    //   ...o.appsCfg[e],
    //   [e]: {
    //     channelId: o.appsCfg[e].channelsId[o.msg.chType]
    //   }
    // }

    // apps[e]({app:e, data:{...o.apps.cfg[e], channelId:ch, msg:msgBulder({app:e, msg:o.msg})}})

    
    o.builder.apps.cfg[e].channelsId[o.data.msg.chType].forEach(ch => {
      if(o.builder.apps.cfg[e].getFrom[o.app]) promises.push(
        apps[e]({app:e, data:{...o.builder.apps.cfg[e], channelId:ch, msg:msgBuilder({app:e, msg:o.data.msg, templates:o.builder.msg.templates})}}).then(
          res => console.log(`[${res.app}] ${res.process} ${res.status}`, res.data),
          err => console.log(`[${res.app}] ${res.process} ${res.status}`, res.data)
        )
      )
    })
    
    // promises.push(
    //   apps[e]({...o, app:e, ...o.msg, channelId: o.appsCfg[e].channelsId[o.msg.chType]})
    // )
  })

  console.log(`[Sender] Запущен! Будет отправлено в ${promises} приложений: [${promises}].`);

  Promise.all(promises).then(
    result => console.log('[Sender] Завершено!!!')
  )
}