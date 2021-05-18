
import axios from 'axios';
// const schedule = require('node-schedule');
// const BOT_TOKEN = process.env.BOT_TOKEN;
const fiveSecond=300000;
// const replyToMessage = (ctx: any, messageId: string, string: string) =>
//   ctx.reply(string, {
//     reply_to_message_id: messageId,
//   });

const subCoin = () => (ctx: any) => {

  const chat_id=ctx.message.chat.id;
  const coinName=ctx.message.text.substr(5);


  if(coinName==""){
    ctx.telegram.sendMessage(chat_id, `请输入订阅的数字货币名称`)
  }else{
    sendCoinInfo(ctx,chat_id,coinName).then(() => {
      console.log('The answer to life, the universe, and everything!');
    
    });
      
    }




    // const job = schedule.scheduleJob('10 * * * * *', function(){
    //   console.log('The answer to life, the universe, and everything!');
    //   sendCoinInfo(ctx,chat_id,coinName)
    // });

    // if(coinName=="cancel"){
    //   job.cancel();
    // }



  //  schedule.scheduleJob("sendCoinTask",'10 * * * * *', () => {
 


  //   // axios.get(url)
  //   // .then(function (response) {
  //   //   if(response.data instanceof Array){
  //   //     var lastMin=response.data[response.data.length-1];
  //   //     var podong=(lastMin.o-lastMin.c)/lastMin.o;
  //   //     podong=podong*100;
  //   //     podong= Math.round(podong * 100) / 100//四舍五入
  //   //     replyToMessage(ctx, messageId, `${coinName}最新一分钟的涨跌幅是:${podong}%`);
    
  //   //     console.log(response);
  //   //   }else{
  //   //     replyToMessage(ctx, messageId, `没有找到该币种`);
  //   //   }
  //   // })
  //   // .catch(function (error) {
  //   //   console.log(error);
  //   //   replyToMessage(ctx, messageId, `没有找到该币种`);
  //   // });
  // });



  }


 


  
  // replyToMessage(ctx, messageId, `Hello, ${userName} (user_id: ${ctx.from.id})! \n Your Message id is: ${messageId}`);



async function  sendCoinInfo(ctx: any,chat_id:String,coinName:String){
  // var params = new URLSearchParams();
  // params.append("chat_id",chat_id);
  // const ret = await axios.post( "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage" , params );
  const startTime=new Date().getTime()-fiveSecond
  let url='https://data.block.cc/api/v3/kline?desc=okex_'+coinName+'_USDT&interval=1m&api_key=YPCNWDHCQYHJTPCTVLEQWUED1IJKWYM7F097TYTU&start='+startTime

  await axios.get(url)
  .then(function (response) {
    if(response.data instanceof Array){
      var state="上涨"
      var lastMin=response.data[response.data.length-1];
      var podong=(lastMin.c-lastMin.o)/lastMin.o;
      podong=podong*100;
      podong= Math.round(podong * 100) / 100//四舍五入
      if(podong<0){
        state="下跌"
      }else{
        state="上涨"
      }
      ctx.telegram.sendMessage(chat_id, `【${coinName}${state}】最近一分钟的涨跌幅是:${podong}%`)

      console.log(response);

      setInterval(function(){
        console.info("222");
      },1000)


      setTimeout(function(){
        console.info("循环启动111");
      },1000)


      setTimeout(function(){

        ctx.telegram.sendMessage(chat_id, `订阅成功，${coinName}将在剧烈波动时提醒您`)
      },1000)

      setInterval(function(){
        console.info("循环启动");
        sendCoinInfo(ctx,chat_id,coinName)
      },60000)





    }else{

      ctx.telegram.sendMessage(chat_id, `没有找到该币种`)
    }
  })
  .catch(function (error) {
    console.log(error);
    ctx.telegram.sendMessage(chat_id, `没有找到该币种`)
  });

}

export {subCoin};
