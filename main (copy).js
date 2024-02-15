import WebSocket from 'ws';
const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

const payload = {
   op: 2,
   d: {
      token: process.env['discordToken'],
      intents: 3276799,
      properties: {
         $os: "linux",
         $browser: "chrome",
         $device: "chrome",
      },
   },
};

ws.on('open', function open(data) {
  console.log('Opened');
  ws.send(JSON.stringify(payload));
})

ws.addEventListener('message', function(event) {
    const P = JSON.parse(event.data);
  console.log(P)

  switch (P.op) {
      // OPCODE 10 GIVES the HEARTBEAT INTERVAL, SO YOU CAN KEEP THE CONNECTION ALIVE
      case 10:
         setInterval(() => {
            ws.send(JSON.stringify({ op: 2, d: null }));
         }, P.d.heartbeat_interval);

         break;
   }

  switch (P.t) {
    case "MESSAGE_CREATE":
    if(P.d.guild_id !== process.env['guildId']) return;
      const dat = {
        guildId: P.d.guild_id,
        channelId: P.d.channel_id,
        author: P.d.author,
        msg: P.d.content
      };
      console.log('[Discord WSS] Message Detected!', dat);
   }
}) 
