// import {sender} from './sender.js';

export function msgBuilder(o){
  console.log('[MSG Builder]', o);
  const filters = {
    linkGet: /(http[s]*:\/\/[^ ]+)/gm,
    main: false
  }

  const r = {
    fs: {
      TG: /([_\*\[\]()~\`>#+-=\|{}.!])/gmi,
      linkCheck: /(http[s]*:\/\/[^ ]+)/gm,
      main: false
    },
    getLink: function(text){
      if(text.match(this.fs.linkCheck)) text.replace(this.fs.linkCheck, (def, link) => {
        o.msg.link = link;
      })
    },
    clearText: function(text){
      return text.replace(this.fs[o.app], '\\$1');
    }
  }

  r.getLink(o.msg.text);

  // function replace(o){
  //   return o.text.replace(o.filter, '\\$1')
  // }
  switch(o.app){
    case 'TG':
      o.msg.text = o.templates[o.msg.chType][o.app]({
        link:o.msg.link,
        text:r.clearText(o.msg.text)
      });

      return o.msg;
    break;
  }
}
