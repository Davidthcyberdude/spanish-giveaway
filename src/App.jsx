import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Step1Puzzle from './components/Step1Puzzle'
import Step2Congratulations from './components/Step2Congratulations'
import Step3PaymentMethod from './components/Step3PaymentMethod'
import Step4WhatsApp from './components/Step4WhatsApp'
import Step5SocialActivation from './components/Step5SocialActivation'
import DarkModeToggle from './components/DarkModeToggle'
import { useLanguage } from './hooks/useLanguage'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userAnswers, setUserAnswers] = useState({})
  const { language, t } = useLanguage()

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const updateAnswers = (newAnswers) => {
    setUserAnswers(prev => ({ ...prev, ...newAnswers }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Puzzle
            onCorrectAnswer={() => nextStep()}
            t={t}
          />
        )
      case 2:
        return (
          <Step2Congratulations
            onContinue={() => nextStep()}
            t={t}
          />
        )
      case 3:
        return (
          <Step3PaymentMethod
            onContinue={(paymentData) => {
              updateAnswers(paymentData)
              nextStep()
            }}
            t={t}
          />
        )
      case 4:
        return (
          <Step4WhatsApp
            onContinue={(whatsappData) => {
              updateAnswers(whatsappData)
              nextStep()
            }}
            t={t}
          />
        )
      case 5:
        return (
          <Step5SocialActivation
            userAnswers={userAnswers}
            t={t}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-backgroundDark py-8 px-4 transition-colors duration-300">
      <DarkModeToggle />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-text dark:text-textDark mb-4 transition-colors duration-300">
            🎉 {t('giveawayTitle')} 🎉
          </h1>
          <p className="text-xl text-textSecondary dark:text-textSecondaryDark transition-colors duration-300">
            {t('giveawaySubtitle')}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="bg-card dark:bg-cardDark rounded-full p-2 shadow-md border border-border dark:border-borderDark transition-colors duration-300">
            <div className="flex justify-between text-sm text-textSecondary dark:text-textSecondaryDark px-4 mb-2 transition-colors duration-300">
              <span>{t('step')} 1</span>
              <span>{t('step')} 2</span>
              <span>{t('step')} 3</span>
              <span>{t('step')} 4</span>
              <span>{t('step')} 5</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 transition-colors duration-300">
              <motion.div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                initial={{ width: '20%' }}
                animate={{ width: `${(currentStep / 5) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
