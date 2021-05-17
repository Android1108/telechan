
import axios from 'axios';

const replyToMessage = (ctx: any, messageId: string, string: string) =>
  ctx.reply(string, {
    reply_to_message_id: messageId,
  });

const subCoin = () => (ctx: any) => {
  const messageId = ctx.message.message_id;
  const coinName=ctx.message.text.substr(5);
  if(coinName==""){
    replyToMessage(ctx, messageId, `请输入订阅的数字货币名称`);
  }else{
  let url='https://data.block.cc/api/v3/kline?type=15m&interval=1m&api_key=YPCNWDHCQYHJTPCTVLEQWUED1IJKWYM7F097TYTU&start=1621228860000$'

 axios.get(url,{
   desc: 'binancee_${subCoin}_USDT'
 })
 .then(function (response) {
   replyToMessage(ctx, messageId, `${coinName}，${response.data[response.data.length-1].T}`);
   console.log(response);
 })
 .catch(function (error) {
   console.log(error);
   replyToMessage(ctx, messageId, `失败,${error.data}`);
 });

  }


 


  
  // replyToMessage(ctx, messageId, `Hello, ${userName} (user_id: ${ctx.from.id})! \n Your Message id is: ${messageId}`);
};

export {subCoin};
