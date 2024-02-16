import {sender} from './sender.js';

export function msgBuilder(o){
  console.log('[MSG Builder]', o);

  function replace(o){
    const filter = /([_\*\[\]()~\`>#+-=\|{}.!])/gmi;
    return `${o.template}
    ${o.text.replace(filter, '\\$1')}`
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
        apps: o.builder.apps,
        msg: {
          chType: o.data.chType,
          text: o.text
        }
      });
    break;
  }
}
