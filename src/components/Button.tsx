'use client'

import { motion } from 'motion/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button = ({ className, whileHover, content }: any) => {
  return (
    <motion.button
      className={className}
      whileHover={whileHover}
    >
      {content}
    </motion.button>
  )
}

export default Button
