import axios from 'axios';

export function Discord(o){
  console.log('[Discord]', o);
  switch(o.data.run){
    case 'msgSend':
      o.type = `channels/${o.data.channelId}/messages`;
      o.method = 'POST';
      o.d = {
        content: o.data.msg.cfg.text && o.data.msg.text||'',
        attachments: o.data.msg.attachments,
        embeds: o.data.msg.cfg.embeds && o.data.msg.embeds||[],
        sticker_ids: o.data.msg.stickers,
        allowed_mentions: o.data.msg.mentions,
      }
    break;
  }
  return axios(`https://discord.com/api/v10/${o.type}`, {
    headers: {
      Authorization: `Bot ${process.env['discordToken']}`
    },
      method: o.method,
      data: o.d
    }).then(
      res => ({status:'success', process:'send', app:'Discord', data:res.data}),
      err => ({status:'error', process:'send', app:'Discord', data:JSON.stringify(err.response.data)})
    )
};