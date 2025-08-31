import { useState, useEffect } from 'react'

const translations = {
  en: {
    giveawayTitle: 'GoldenChance',
    giveawaySubtitle: 'Solve the puzzle and win 800,000 Colombian pesos!',
    step: 'Step',
    puzzleQuestion: 'What are the missing numbers?',
    puzzleNumbers: '1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 20',
    puzzleHint: 'Enter 1, 2, or 3 missing numbers separated by commas (e.g., 6, 17, 18)',
    submitAnswer: 'Submit Answer',
    congratulations: '🎉 Congratulations! You have won 800,000 Colombian pesos 🎉',
    continue: 'Continue',
    paymentQuestion: 'How do you want to receive your payment?',
    nequi: 'Nequi',
    bancolombia: 'Bancolombia',
    bankAccount: 'Bank account',
    nequiNumber: 'Nequi number',
    bancolombiaAccount: 'Bancolombia account number',
    bankAccountNumber: 'Bank account number',
    whatsappQuestion: 'Enter your WhatsApp number so the company can contact you.',
    whatsappPlaceholder: 'WhatsApp number',
    activationQuestion: 'Activate your payment by choosing:',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    loginTo: 'Login to',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    forgotPassword: 'Forgot password?',
    createAccount: 'Create new account',
    backToGiveaway: 'Back to Giveaway',
    // New activation translations
    activationProcessing: 'Processing your activation request...',
    pleaseWait: 'Please wait...',
    activationMessage: 'You will be contacted by the giveaway manager shortly with your activation code.',
    estimatedWaitTime: 'Estimated wait time',
    processing: 'Processing...',
    thankYouPatience: 'Thank you for your patience!',
    managerContactSoon: 'Our giveaway manager will contact you very soon with your activation details.',
    backToGiveaway: 'Back to Giveaway'
  },
  es: {
    giveawayTitle: 'Oportunidad Dorada',
    giveawaySubtitle: '¡Resuelve el acertijo y gana 800,000 pesos colombianos!',
    step: 'Paso',
    puzzleQuestion: '¿Cuáles son los números faltantes?',
    puzzleNumbers: '1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 20',
    puzzleHint: 'Ingresa 1, 2 o 3 números faltantes separados por comas (ej., 6, 17, 18)',
    submitAnswer: 'Enviar Respuesta',
    congratulations: '🎉 ¡Felicitaciones! Has ganado 800,000 pesos colombianos 🎉',
    continue: 'Continuar',
    paymentQuestion: '¿Cómo quieres recibir tu pago?',
    nequi: 'Nequi',
    bancolombia: 'Bancolombia',
    bankAccount: 'Cuenta bancaria',
    nequiNumber: 'Número de Nequi',
    bancolombiaAccount: 'Número de cuenta Bancolombia',
    bankAccountNumber: 'Número de cuenta bancaria',
    whatsappQuestion: 'Ingresa tu número de WhatsApp para que la empresa pueda contactarte.',
    whatsappPlaceholder: 'Número de WhatsApp',
    activationQuestion: 'Activa tu pago eligiendo:',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    loginTo: 'Iniciar sesión en',
    email: 'Correo electrónico',
    password: 'Contraseña',
    login: 'Iniciar sesión',
    forgotPassword: '¿Olvidaste tu contraseña?',
    createAccount: 'Crear cuenta nueva',
    backToGiveaway: 'Volver al Sorteo',
    // New activation translations
    activationProcessing: 'Procesando tu solicitud de activación...',
    pleaseWait: 'Por favor espera...',
    activationMessage: 'Serás contactado por el administrador del sorteo pronto para tu código de activación.',
    estimatedWaitTime: 'Tiempo de espera estimado',
    processing: 'Procesando...',
    thankYouPatience: '¡Gracias por tu paciencia!',
    managerContactSoon: 'Nuestro administrador del sorteo te contactará muy pronto con los detalles de tu activación.',
    backToGiveaway: 'Volver al Sorteo'
  }
}

export const useLanguage = () => {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    // Detect user's language
    const userLang = navigator.language || navigator.userLanguage
    if (userLang.startsWith('es')) {
      setLanguage('es')
    } else {
      setLanguage('en')
    }
  }, [])

  const t = (key) => {
    return translations[language][key] || key
  }

  return { language, t }
}
