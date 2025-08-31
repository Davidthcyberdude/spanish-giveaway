import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Step3PaymentMethod = ({ onContinue, t }) => {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [isValid, setIsValid] = useState(false)

  const paymentMethods = [
    { id: 'nequi', name: t('nequi'), icon: '💳', placeholder: t('nequiNumber') },
    { id: 'bancolombia', name: t('bancolombia'), icon: '🏦', placeholder: t('bancolombiaAccount') },
    { id: 'bankAccount', name: t('bankAccount'), icon: '🏛️', placeholder: t('bankAccountNumber') }
  ]

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId)
    setAccountNumber('')
    setIsValid(false)
  }

  const handleAccountNumberChange = (value) => {
    setAccountNumber(value)
    setIsValid(value.trim().length > 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid && selectedMethod) {
      onContinue({
        paymentMethod: selectedMethod,
        accountNumber: accountNumber.trim()
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
          💰
        </motion.div>
        <h2 className="text-3xl font-bold text-text dark:text-textDark mb-4 transition-colors duration-300">
          {t('paymentQuestion')}
        </h2>
      </div>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => handleMethodSelect(method.id)}
                             className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 ${
                 selectedMethod === method.id
                   ? 'border-primary bg-primary/10 shadow-lg'
                   : 'border-border dark:border-borderDark hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-700'
               }`}
            >
              <div className="text-4xl mb-3">{method.icon}</div>
              <div className="font-semibold text-lg text-text">
                {method.name}
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Form */}
      <AnimatePresence mode="wait">
        {selectedMethod && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="accountNumber" className="block text-lg font-medium text-gray-700 mb-2">
                  {paymentMethods.find(m => m.id === selectedMethod)?.placeholder}
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  value={accountNumber}
                  onChange={(e) => handleAccountNumberChange(e.target.value)}
                  className="input-field text-center text-lg"
                  placeholder={paymentMethods.find(m => m.id === selectedMethod)?.placeholder}
                  required
                />
              </div>

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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating money animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl text-accent/30"
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
            💵
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Step3PaymentMethod
