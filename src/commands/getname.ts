

const getname= () => (ctx: any) => {
    const messageData = ctx.message.text;
    const name=  ctx.from.last_name ? `${ctx.from.first_name} ${ctx.from.last_name}` : ctx.from.first_name;

    const message = `*${name},${messageData}`;

    ctx.reply(message);
};

export {getname};