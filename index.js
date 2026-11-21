const { Telegraf, Markup } = require('telegraf');
const http = require('http');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// ዋና ምናሌ ቁልፎች
const mainMenu = Markup.keyboard([
    ['🎮 ጨዋታ ጀምር (Play)', '💰 ባላንስ (Balance)'],
    ['💸 ገንዘብ አውጣ (Withdraw)', 'ℹ️ መረጃ (Info)']
]).resize();

bot.start((ctx) => {
    ctx.reply('እንኳን ወደ Trust Bingo በደህና መጣህ! 🎉\n\nከታች ካሉት ቁልፎች ውስጥ ምረጥ፦', mainMenu);
});

// ጨዋታ ሲጀመር (Web App ቁልፍ ያሳያል)
bot.hears('🎮 ጨዋታ ጀምር (Play)', (ctx) => {
    // የRender ሊንክህን እዚህ አስገባ
    ctx.reply('የቢንጎ ጨዋታውን ለመክፈት ከታች ያለውን ቁልፍ ተጫን፦', Markup.inlineKeyboard([
        Markup.button.webApp('🎰 ቢንጎ ክፈት', 'https://trustbingo2.onrender.com/game.html')
    ]));
});

bot.hears('💰 ባላንስ (Balance)', (ctx) => {
    ctx.reply('ያለህ ባላንስ፦ 100 ብር (የምዝገባ ቦነስ)');
});

bot.hears('💸 ገንዘብ አውጣ (Withdraw)', (ctx) => {
    ctx.reply('ዝቅተኛው የማውጣት መጠን 1000 ብር ነው።');
});

bot.hears('ℹ️ መረጃ (Info)', (ctx) => {
    ctx.reply('Trust Bingo - የቢንጎ ጨዋታ ቦት።');
});

bot.launch();
console.log('Trust Bingo Bot is running... 🚀');

// ለ Render የድረ-ገጽ ሰርቨር (HTML ፋይሉን ያገለግላል)
const PORT = process.env.PORT || 10000;
http.createServer((req, res) => {
    if (req.url === '/game.html') {
        fs.readFile(path.join(__dirname, 'game.html'), (err, data) => {
            if (err) { res.writeHead(500); res.end('Error'); return; }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Trust Bingo Bot is running!');
    }
}).listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});
