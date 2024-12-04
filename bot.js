// استيراد مكتبة node-telegram-bot-api
const TelegramBot = require('node-telegram-bot-api');

// التوكن الخاص بك من BotFather
const token = '7119877516:AAGsP2mG9-T8cFZV_z6aTzzc5prweFklAt4'; // هذا هو التوكن الذي قدمته

// إنشاء البوت باستخدام التوكن
const bot = new TelegramBot(token, { polling: true });

// حدث عند استقبال رسالة
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.username || msg.from.first_name;

  // الرد على الرسالة
  bot.sendMessage(chatId, `مرحبًا ${userName}! كيف يمكنني مساعدتك؟`);
});

// يمكنك إضافة أوامر أخرى للبوت هنا حسب حاجتك
