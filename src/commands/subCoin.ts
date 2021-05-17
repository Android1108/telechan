const replyToMessage = (ctx: any, messageId: string, string: string) =>
  ctx.reply(string, {
    reply_to_message_id: messageId,
  });

const subCoin = () => (ctx: any) => {
  const messageText=ctx.message.text.substr(5);
  const messageText1=ctx.message.text.substr(4);
  const messageText3=ctx.message.text.substr(6);
  const messageId = ctx.message.message_id;
  // const userName = ctx.from.last_name ? `${ctx.from.first_name} ${ctx.from.last_name}` : ctx.from.first_name;
  
  replyToMessage(ctx, messageId, `${messageText},${messageText1},${messageText3}`);
  // replyToMessage(ctx, messageId, `Hello, ${userName} (user_id: ${ctx.from.id})! \n Your Message id is: ${messageId}`);
};

export {subCoin};
