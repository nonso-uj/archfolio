'use client'

import React, { useRef } from 'react'
import { useScroll, useTransform, motion } from "motion/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ScrollImage = ({ images, containerRef, start, stop }: any) => {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const x = useTransform(scrollYProgress, [start, stop], ["-20%", "-45%"]);


    return (
        <motion.div style={{ x }} className="my-10 h-fit w-full">
            <div className="flex flex-row items-center justify-between gap-x-5 w-full overflow-x-visible">
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {images.map((item: any, i: string) => (
                    <div key={i} className="flex flex-row items-center justify-center p-5 bg-gray-300 shrink-0">
                        <img src={item?.image.url || item} className="w-72 h-40 object-cover" />
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ScrollImages = ({ footerImages }: { footerImages: any[] }) => {
      const ref = useRef(null)

      const fillerImages = footerImages?.length > 7 ? footerImages : [...footerImages, ...footerImages]

    return (
        <div ref={ref} className="h-fit max-w-full w-full overflow-x-hidden">
        <ScrollImage images={fillerImages} containerRef={ref} start={0} stop={1} />
        <ScrollImage images={fillerImages} containerRef={ref} start={1} stop={0} />
      </div>
    )
}