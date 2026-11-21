const { Telegraf, Markup } = require('telegraf');
const http = require('http');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// የቢንጎ ካርድ ለመፍጠር የሚረዳ ፋንክሽን (5x5 ካርድ)
function generateCard() {
    let card = [];
    let numbers = [];
    for (let i = 1; i <= 75; i++) numbers.push(i);
    
    // ቁጥሮቹን በዘፈቀደ ማሸብለል
    numbers.sort(() => Math.random() - 0.5);
    
    let index = 0;
    for (let row = 0; row < 5; row++) {
        let rowData = [];
        for (let col = 0; col < 5; col++) {
            if (row === 2 && col === 2) {
                rowData.push('FREE'); // መሃሉ ሁልጊዜ FREE ነው
            } else {
                rowData.push(numbers[index++]);
            }
        }
        card.push(rowData);
    }
    return card;
}

// የቢንጎ ካርድን በጽሁፍ መልክ ለማሳየት
function formatCard(card) {
    let text = "🎫 **የእርስዎ የቢንጎ ካርድ**\n\n";
    for (let row of card) {
        text += row.map(n => n.toString().padStart(2, ' ')).join(' | ') + "\n";
    }
    return text;
}

// ዋና ምናሌ ቁልፎች
const mainMenu = Markup.keyboard([
    ['🎮 አዲስ ጨዋታ ጀምር (New Game)'],
    ['💰 ባላንስ (Balance)', 'ℹ️ መረጃ (Info)']
]).resize();

bot.start((ctx) => {
    ctx.reply('እንኳን ወደ Trust Bingo በደህና መጣህ! 🎉\n\nከታች ካሉት ቁልፎች ውስጥ ምረጥ፦', mainMenu);
});

// ጨዋታ ሲጀመር
bot.hears('🎮 አዲስ ጨዋታ ጀምር (New Game)', (ctx) => {
    const playerCard = generateCard();
    const botCard = generateCard();
    
    // የተጫዋቹን ካርድ አሳይ
    ctx.reply(formatCard(playerCard), { parse_mode: 'Markdown' });
    
    // የዘፈቀደ ቁጥር ማውጣት (1-75)
    let drawnNumbers = [];
    let currentIndex = 0;
    const totalNumbers = 30; // ለሙከራ 30 ቁጥሮች ብቻ
    
    const interval = setInterval(() => {
        if (currentIndex >= totalNumbers) {
            clearInterval(interval);
            return ctx.reply('ጨዋታው ተጠናቅቋል። እንደገና ለመጫወት "🎮 አዲስ ጨዋታ ጀምር" ተጫን።');
        }
        
        // አዲስ ቁጥር ማውጣት (ያልወጣ ቁጥር እስኪመጣ)
        let newNumber;
        do {
            newNumber = Math.floor(Math.random() * 75) + 1;
        } while (drawnNumbers.includes(newNumber));
        
        drawnNumbers.push(newNumber);
        currentIndex++;
        
        // ቁጥሩ በተጫዋቹ ካርድ ላይ ካለ ምልክት አድርግ (ለሙከራ በጽሁፍ)
        ctx.reply(`📢 የወጣ ቁጥር፦ **${newNumber}**\n\nየወጡ ቁጥሮች፦ ${drawnNumbers.join(', ')}`, { parse_mode: 'Markdown' });
        
        // የማሸነፍ ሁኔታን መፈተሽ (ለምሳሌ 5 ቁጥሮች በአንድ ረድፍ)
        // ይህን በቀላሉ ለማድረግ በኋላ ላይ ማሻሻል እንችላለን
        
    }, 5000); // በየ 5 ሰከንዱ አንድ ቁጥር ይወጣል
});

bot.hears('💰 ባላንስ (Balance)', (ctx) => {
    ctx.reply('ያለህ ባላንስ፦ 100 ብር (የምዝገባ ቦነስ)');
});

bot.hears('ℹ️ መረጃ (Info)', (ctx) => {
    ctx.reply('Trust Bingo - የቢንጎ ጨዋታ ቦት።');
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
