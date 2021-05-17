
import axios from 'axios';

const replyToMessage = (ctx: any, messageId: string, string: string) =>
  ctx.reply(string, {
    reply_to_message_id: messageId,
  });

const subCoin = () => (ctx: any) => {
  const messageText=ctx.message.text.substr(5);

  const messageId = ctx.message.message_id;
  // const userName = ctx.from.last_name ? `${ctx.from.first_name} ${ctx.from.last_name}` : ctx.from.first_name;
  
  const url="https://data.block.cc/api/v3/kline?desc=gate-io_shib_USDT&type=15m&interval=1m&api_key=YPCNWDHCQYHJTPCTVLEQWUED1IJKWYM7F097TYTU&start=1621228860000"

  axios.get(url)
  .then(function (response) {
    replyToMessage(ctx, messageId, `${messageText}，${response}`);
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });



  
  // replyToMessage(ctx, messageId, `Hello, ${userName} (user_id: ${ctx.from.id})! \n Your Message id is: ${messageId}`);
};

export {subCoin};
