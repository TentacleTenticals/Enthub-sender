import {sender} from './sender.js';

export function msgBuilder(o){
  console.log('[MSG Builder]', o);

  function replace(o){
    return `${o.template}
    ${o.text.replace(/([_\*\[\]()~\`>#+-=\|{}.!])/gmi, '\\$1')}`
  }
  switch(o.app){
    case 'Discord':
      // switch(o.data.chType){
      //   case 'news':
      //     ''
      // }
      o.text = replace({
        template: o.builder.msg.templates[o.data.chType],
        text: o.data.msg.text});

      sender({
        sendToApps: o.builder.sendToApps,
        appsCfg: o.builder.appsCfg,
        msg: {
          chType: o.data.chType,
          text: o.text
        }
      });
    break;
  }
}
