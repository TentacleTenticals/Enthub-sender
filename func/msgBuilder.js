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
      Discord: /([_\*\[\]()~\`>#+-=\|{}.!])/gmi,
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
      o.msg.text = o.templates[o.msg.chType][o.app].text({
        link:o.msg.link,
        text:r.clearText(o.msg.text)
      });
      o.msg.cfg = o.templates[o.msg.chType][o.app].cfg;

      return o.msg;
    break;
    case 'Discord':
      o.msg.text = o.templates[o.msg.chType][o.app].text({
        link:o.msg.link,
        text:r.clearText(o.msg.text)
      });
      o.msg.embeds = o.templates[o.msg.chType][o.app].embeds({
        link:o.msg.link,
        text:o.msg.text
      });
      o.msg.cfg = o.templates[o.msg.chType][o.app].cfg;

      return o.msg;
    break;
  }
}
