'use client'

import { useRef, useState } from 'react'
import { motion } from 'motion/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MagneticFramer = ({children, showDots, dotsColor}: any) => {
    const ref = useRef<any>(null);
    const [position, setPosition] = useState({x:0,y:0});

    const [dots, setDots] = useState(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouse = (e: any) => {
        const { clientX, clientY } = e;
        const {height, width, left, top} = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width/2)
        const middleY = clientY - (top + height/2)
        setPosition({x: middleX, y: middleY})

        setDots(true)
    }

    const reset = () => {
        setPosition({x:0, y:0})
        setDots(false)
    }

    const { x, y } = position;
    return (
        <motion.div
            style={{position: "relative"}}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{x, y}}
            transition={{type: "spring", stiffness: 110, damping: 12, mass: 0.1}}
            className='cursor-pointer h-fit'
        >
            {children}

            {showDots && dots && (
                <motion.div className={`absolute bottom-0 top-3 w-full h-full text-center text-4xl font-bold mt-5 ${dotsColor}`}>&middot;</motion.div>
            )}
        </motion.div>
    )
}