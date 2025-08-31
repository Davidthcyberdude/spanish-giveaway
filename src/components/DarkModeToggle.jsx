import React from 'react'
import { motion } from 'framer-motion'
import { useDarkMode } from '../hooks/useDarkMode'

const DarkModeToggle = () => {
  const { isDark, toggleDarkMode } = useDarkMode()

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 rounded-full bg-card dark:bg-cardDark border border-border dark:border-borderDark shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-lg md:text-2xl"
      >
        {isDark ? '🌙' : '☀️'}
      </motion.div>
    </motion.button>
  )
}

export default DarkModeToggle
