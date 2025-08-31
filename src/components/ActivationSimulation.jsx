import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ActivationSimulation = ({ platform, onBack, t }) => {
  const [timeLeft, setTimeLeft] = useState(1 * 60) // 1 minute in seconds
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      setIsComplete(true)
    }
  }, [timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getPlatformColor = () => {
    return platform === 'facebook' ? 'from-blue-500 to-indigo-600' : 'from-pink-500 to-red-600'
  }

  const getPlatformIcon = () => {
    return platform === 'facebook' ? '📘' : '🎵'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[600px] flex items-center justify-center p-4"
    >
      <div className="card p-8 max-w-2xl mx-auto text-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-indigo-50 dark:from-emerald-900/20 dark:via-gray-900 dark:to-indigo-900/20"></div>
        
        {/* Platform header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 mb-8"
        >
          <div className="text-6xl mb-4">{getPlatformIcon()}</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            {platform === 'facebook' ? t('facebook') : t('tiktok')} {t('activationQuestion').split(' ').slice(-1)[0]}
          </h2>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">
            {t('activationProcessing')}
          </p>
        </motion.div>

        {/* Main content */}
        <div className="relative z-10">
          {!isComplete ? (
            <>
              {/* Waiting message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <div className="text-4xl mb-4">⏳</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                  {t('pleaseWait')}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  You will be contacted by the giveaway manager shortly for your activation code.
                </p>
              </motion.div>

              {/* Countdown timer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="mb-8"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-gold-500 to-amber-500 bg-clip-text text-transparent mb-2">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  {t('estimatedWaitTime')}
                </p>
              </motion.div>

              {/* Celebratory loading animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-8"
              >
                <div className="flex justify-center space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-indigo-500 rounded-full"
                      animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mb-8"
              >
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((1 * 60 - timeLeft) / (1 * 60)) * 100}%` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {t('processing')}... {Math.round(((5 * 60 - timeLeft) / (5 * 60)) * 100)}% complete
                </p>
              </motion.div>
            </>
          ) : (
            /* Completion message */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                {t('thankYouPatience')}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('managerContactSoon')}
              </p>
            </motion.div>
          )}

          {/* Back button */}
          <motion.button
            onClick={onBack}
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← {t('backToGiveaway')}
          </motion.button>
        </div>

        {/* Floating celebration elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: [0, -100, -200],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * 200 - 100,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {['✨', '🎊', '🎉', '💫', '🌟', '💎', '🔥', '⭐'][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ActivationSimulation
