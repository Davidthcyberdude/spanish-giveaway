import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'

const Step2Congratulations = ({ onContinue, t }) => {
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-[600px]">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#10B981', '#6366F1', '#FACC15', '#EF4444', '#8B5CF6']}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="card p-8 max-w-3xl mx-auto text-center relative z-10"
      >
        {/* Main Congratulations Message */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-text dark:text-textDark mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent transition-colors duration-300"
          >
            {t('congratulations')}
          </motion.h1>
        </motion.div>

        {/* Prize Amount */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-accent to-yellow-400 p-6 rounded-2xl shadow-2xl">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-5xl md:text-7xl font-bold text-white"
            >
              $800,000 COP
            </motion.div>
            <p className="text-xl text-white/90 mt-2">Colombian Pesos</p>
          </div>
        </motion.div>

        {/* Celebration Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {['🎈', '🎊', '🏆'].map((emoji, index) => (
            <motion.div
              key={emoji}
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
                opacity: 1
              }}
              transition={{ 
                delay: 1.2 + index * 0.1,
                duration: 2 + index * 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-6xl"
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.button
            onClick={onContinue}
            className="btn-primary text-xl px-8 py-4"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('continue')}
          </motion.button>
        </motion.div>

        {/* Floating celebration elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100 + 400,
                opacity: 0,
              }}
              animate={{
                y: [0, -200, -400],
                opacity: [0, 1, 0],
                x: Math.random() * 100 - 50,
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {['🎉', '🎊', '🎈', '⭐', '💫'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Step2Congratulations
