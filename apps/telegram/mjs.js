import axios from 'axios';

export function Tg(o){
  console.log('[TG]', o);
  switch(o.run){
    case 'msgSend':
      o.type = 'sendMessage';
      o.method = 'POST';
      o.data = {
        chat_id: o.chatId,
        message_thread_id: o.channelId,
        parse_mode: 'MarkdownV2',
        text: o.text
      }
    break;
  }
  return axios(`https://api.telegram.org/bot${process.env['telegramToken']}/${o.type}`, {
      method: o.method,
      data: o.data
    }).then(
      res => console.log('[Axios] Res', res.data),
      err => console.log('[Axios] Err', err.response.data)
    )
};