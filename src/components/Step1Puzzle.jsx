import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Step1Puzzle = ({ onCorrectAnswer, t }) => {
  const [answer, setAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showError, setShowError] = useState(false)

  // Function to check if answer contains valid missing numbers
  const checkAnswer = (userAnswer) => {
    const trimmedAnswer = userAnswer.trim()
    if (!trimmedAnswer) return false
    
    // Split by commas and clean up each number
    const numbers = trimmedAnswer.split(',').map(num => num.trim()).filter(num => num !== '')
    
    // Check if all numbers are valid missing numbers (6, 17, 18)
    const validNumbers = ['6', '17', '18']
    const missingNumbers = validNumbers.filter(num => !numbers.includes(num))
    
    // User must provide at least 1 missing number and all provided numbers must be valid
    return numbers.length >= 1 && numbers.length <= 3 && 
           numbers.every(num => validNumbers.includes(num)) &&
           numbers.length === new Set(numbers).size // No duplicates
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (checkAnswer(answer)) {
      setIsCorrect(true)
      setShowError(false)
      setTimeout(() => {
        onCorrectAnswer()
      }, 1500)
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
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
          🧩
        </motion.div>
        <h2 className="text-3xl font-bold text-text dark:text-textDark mb-4 transition-colors duration-300">
          {t('puzzleQuestion')}
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-mono text-secondary bg-gray-50 dark:bg-gray-700 p-4 rounded-xl transition-colors duration-300"
        >
          {t('puzzleNumbers')}
        </motion.div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="answer" className="block text-lg font-medium text-text dark:text-textDark mb-2 transition-colors duration-300">
            {t('puzzleHint')}
          </label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="input-field text-center text-lg"
            placeholder="6, 17, 18"
            disabled={isCorrect}
          />
        </div>

        {showError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center"
          >
            ❌ Incorrect answer. Try again!
          </motion.div>
        )}

        {isCorrect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-center"
          >
            ✅ Correct! Moving to the next step...
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isCorrect}
          className={`w-full ${isCorrect ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'}`}
          whileHover={!isCorrect ? { scale: 1.02 } : {}}
          whileTap={!isCorrect ? { scale: 0.98 } : {}}
        >
          {t('submitAnswer')}
        </motion.button>
      </form>

      {/* Floating numbers animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl text-primary/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Step1Puzzle
