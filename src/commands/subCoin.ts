
import axios from 'axios';

const replyToMessage = (ctx: any, messageId: string, string: string) =>
  ctx.reply(string, {
    reply_to_message_id: messageId,
  });

const subCoin = () => (ctx: any) => {
  const messageId = ctx.message.message_id;
  const coinName=ctx.message.text.substr(5);
  const fiveSecond=300000;

  const startTime=new Date().getTime()-fiveSecond
  console.log(startTime)

  if(coinName==""){
    replyToMessage(ctx, messageId, `请输入订阅的数字货币名称`);
  }else{
  let url='https://data.block.cc/api/v3/kline?desc=binance_'+coinName+'_USDT&type=15m&interval=1m&api_key=YPCNWDHCQYHJTPCTVLEQWUED1IJKWYM7F097TYTU&start='+startTime
 
  axios.get(url)
  .then(function (response) {
   if(response.status==200){
     var lastMin=response.data[response.data.length-1];
     var podong=(lastMin.o-lastMin.c)/lastMin.o;
     podong=podong*100;
     podong= Math.round(podong * 100) / 100//四舍五入
     replyToMessage(ctx, messageId, `${coinName}最新一分钟的涨跌幅是:${podong}%`);
 
     console.log(response);
   }else{
     replyToMessage(ctx, messageId, `没有找到该币种`);
   }
   
  })
  .catch(function (error) {
    console.log(error);
    replyToMessage(ctx, messageId, `失败,${error.data}`);
  });
setInterval(function(){
 
 
},60000)




  }


 


  
  // replyToMessage(ctx, messageId, `Hello, ${userName} (user_id: ${ctx.from.id})! \n Your Message id is: ${messageId}`);
};

export {subCoin};
