const { Telegraf } = require('telegraf');
const http = require('http'); // ለ Render ፖርት የሚያስፈልግ
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

// ለ Render የድረ-ገጽ ሰርቨር ፖርት መክፈቻ
const PORT = process.env.PORT || 10000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Trust Bingo Bot is running!');
}).listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});
