const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('እንኳን ወደ Trust Bingo በደህና መጣህ! 🎉\n\nለመጫወት /play ተጫን።');
});

bot.command('play', (ctx) => {
    ctx.reply('የቢንጎ ጨዋታ በቅርቡ ይጀመራል...');
});

bot.launch();
console.log('Trust Bingo Bot is running... 🚀');
