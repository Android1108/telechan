import { author, homepage, name, version } from "../../package.json";


const getname= () => (ctx: any) => {
    
    const name=  ctx.from.last_name ? `${ctx.from.first_name} ${ctx.from.last_name}` : ctx.from.first_name;

    const message = `*${name}`;

    ctx.reply(message);
};

export {getname};