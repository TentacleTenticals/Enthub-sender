import {Tg} from '../apps/telegram/mjs.js';

export function sender(o){
  const promises = [];
  console.log(`[Sender] Запущен! Будет отправлено в ${o.apps.sendTo.length} приложений: [${o.apps.sendTo}].`);

  const apps = {
    TG: Tg
  };

  o.apps.sendTo.forEach(e => {
    // const q = {
    //   ...o.appsCfg[e],
    //   [e]: {
    //     channelId: o.appsCfg[e].channelsId[o.msg.chType]
    //   }
    // }
    o.apps.cfg[e].channelsId[o.msg.chType].forEach(ch => {
      promises.push(
        apps[e]({app:e, data:{...o.apps.cfg[e], channelId:ch, msg:o.msg}}).then(
          res => console.log(`[${res.app}] ${res.process} ${res.status}`, res.data),
          err => console.log(`[${res.app}] ${res.process} ${res.status}`, res.data)
        )
      )
    })
    
    // promises.push(
    //   apps[e]({...o, app:e, ...o.msg, channelId: o.appsCfg[e].channelsId[o.msg.chType]})
    // )
  })

  Promise.all(promises).then(
    result => console.log('[Sender] Завершено!!!')
  )
}