import {Tg} from '../apps/telegram/mjs.js';

export function sender(o){
  const promises = [];
  console.log('[Sender] Launched! Will send to...', o.sendToApps.length);

  const apps = {
    TG: Tg
  };

  o.sendToApps.forEach(e => {
    // const q = {
    //   ...o.appsCfg[e],
    //   [e]: {
    //     channelId: o.appsCfg[e].channelsId[o.msg.chType]
    //   }
    // }
    o.appsCfg[e].channelsId[o.msg.chType].forEach(ch => {
      promises.push(apps[e]({...o, app:e, ...o.msg, ...o.appsCfg[e], channelId: ch}))
    })
    
    // promises.push(
    //   apps[e]({...o, app:e, ...o.msg, channelId: o.appsCfg[e].channelsId[o.msg.chType]})
    // )
  })

  Promise.all(promises).then(
    result => console.log('[Sender] Completed!!!')
  )
}