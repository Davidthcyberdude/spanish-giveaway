# 🎉 Spanish Giveaway Website

A modern, animated giveaway website built with React + Vite + TailwindCSS that automatically detects user language and provides a multi-step flow for users to participate in a Colombian peso giveaway.

## ✨ Features

- **🌍 Automatic Language Detection**: Automatically displays UI in Spanish or English based on device locale
- **🧩 Interactive Puzzle**: Step 1 asks users to solve a number sequence puzzle
- **🎊 Celebration Animation**: Step 2 features confetti, bouncing text, and celebration effects using Framer Motion
- **💰 Payment Method Selection**: Step 3 allows users to choose between Nequi, Bancolombia, or bank account
- **📱 WhatsApp Integration**: Step 4 collects WhatsApp number for company contact
- **🔐 Social Media Activation**: Step 5 requires users to "activate" payment via Facebook or TikTok login
- **🎨 Modern UI/UX**: Beautiful design with Tailwind CSS, smooth animations, and responsive layout

## 🚀 Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Confetti**: react-confetti
- **Language**: Automatic locale detection with custom i18n

## 🎨 Design Theme

- **Primary**: Emerald Green (#10B981)
- **Secondary**: Indigo (#6366F1)
- **Background**: Light Gray (#F9FAFB)
- **Text**: Dark Slate (#111827)
- **Accents**: Gold (#FACC15) for celebratory elements

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spanish-giveaway
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🌐 Language Support

The website automatically detects the user's device language:
- **Spanish devices**: UI displays in Spanish
- **Other languages**: UI defaults to English

### Supported Languages
- 🇺🇸 English
- 🇪🇸 Spanish

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🎭 Animation Features

- **Framer Motion**: Smooth page transitions and micro-interactions
- **Confetti Animation**: Celebratory confetti on congratulations screen
- **Floating Elements**: Animated background elements for visual appeal
- **Hover Effects**: Interactive button and card animations

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The built files in the `dist` directory can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 📁 Project Structure

```
src/
├── components/          # React components for each step
│   ├── Step1Puzzle.jsx
│   ├── Step2Congratulations.jsx
│   ├── Step3PaymentMethod.jsx
│   ├── Step4WhatsApp.jsx
│   └── Step5SocialActivation.jsx
├── hooks/              # Custom React hooks
│   └── useLanguage.js  # Language detection and translations
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎯 Giveaway Flow

1. **Puzzle Step**: Users solve the missing numbers puzzle (6, 17, 18)
2. **Congratulations**: Celebration screen with confetti and animations
3. **Payment Method**: Choose between Nequi, Bancolombia, or bank account
4. **WhatsApp**: Enter contact number for company communication
5. **Social Activation**: "Activate" payment via Facebook or TikTok login

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to modify the color scheme:
```javascript
colors: {
  primary: '#10B981',    // Emerald green
  secondary: '#6366F1',  // Indigo
  background: '#F9FAFB', // Light gray
  text: '#111827',       // Dark slate
  accent: '#FACC15',     // Gold
}
```

### Animations
Modify animation parameters in `tailwind.config.js`:
```javascript
animation: {
  'bounce-slow': 'bounce 2s infinite',
  'float': 'float 3s ease-in-out infinite',
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}
```

### Translations
Add new languages or modify existing ones in `src/hooks/useLanguage.js`.

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **Dependencies not installing**
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**
   ```bash
   # Check Node.js version
   node --version  # Should be 18.x or higher
   ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Note**: This is a demo website for educational purposes. The giveaway and payment processes are simulated and not connected to real financial systems.
