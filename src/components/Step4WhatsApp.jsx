import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Step4WhatsApp = ({ onContinue, t }) => {
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [isValid, setIsValid] = useState(false)

  const handleNumberChange = (value) => {
    setWhatsappNumber(value)
    // Basic validation - should have at least 10 digits
    const digitsOnly = value.replace(/\D/g, '')
    setIsValid(digitsOnly.length >= 10)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      onContinue({
        whatsappNumber: whatsappNumber.trim()
      })
    }
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
          📱
        </motion.div>
        <h2 className="text-3xl font-bold text-text dark:text-textDark mb-4 transition-colors duration-300">
          {t('whatsappQuestion')}
        </h2>
        <p className="text-textSecondary dark:text-textSecondaryDark text-lg transition-colors duration-300">
          We'll contact you on WhatsApp to complete your payment process
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="whatsappNumber" className="block text-lg font-medium text-text dark:text-textDark mb-2 transition-colors duration-300">
            {t('whatsappPlaceholder')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-textSecondary dark:text-textSecondaryDark text-lg">📞</span>
            </div>
            <input
              type="tel"
              id="whatsappNumber"
              value={whatsappNumber}
              onChange={(e) => handleNumberChange(e.target.value)}
              className="input-field text-center text-lg pl-12"
              placeholder="+57 300 123 4567"
              required
            />
          </div>
          <p className="text-sm text-textSecondary dark:text-textSecondaryDark mt-2 transition-colors duration-300">
            Include country code (e.g., +57 for Colombia)
          </p>
        </div>

        {/* Validation indicator */}
        {whatsappNumber && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center p-3 rounded-xl ${
              isValid 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {isValid ? (
              <div className="flex items-center justify-center space-x-2">
                <span>✅</span>
                <span>Valid WhatsApp number</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>❌</span>
                <span>Please enter a valid phone number (at least 10 digits)</span>
              </div>
            )}
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={!isValid}
          className={`w-full ${isValid ? 'btn-primary' : 'bg-gray-400 cursor-not-allowed'}`}
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
        >
          {t('continue')}
        </motion.button>
      </form>

      {/* WhatsApp icon animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl text-green-500/30"
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
            📱
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Step4WhatsApp
