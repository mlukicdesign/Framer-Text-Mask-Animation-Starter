'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './page.module.css'
import { useInView } from 'react-intersection-observer'


const phrases = [
  "Design is the art of turning constraints into creative opportunities, where every pixel tells a story."
]


export default function Home() {
  return (
    <div className={styles.container}>
      <MaskText/>
      <MaskText/>
      <MaskText/>
      <MaskText/>
      <MaskText/>
    </div>

  )
}


// Wait until body is visible by 75% before animating

export function MaskText() {

  // const body = useRef(null);
  // const isInView = useInView(body, { once: true, margin: "-75%"});

  const animation = {
    initial: {y: "100%", opacity: 0},
    enter: i => ({y: "0", opacity: 60, transition: {duration: 0.75, ease: [0.33, 1, 0.68, 1],  delay: 0.075 * i}})
  }

  const imageAnimation = {
    initial: {y: "150%"},
    enter: i => ({y: "0", transition: {duration: 1.2, ease: [0.33, 1, 0.68, 1],  delay: 1 * i}})
  }

  // Adjust to true or false to animate in and out
  // Adjust Threshold to change when animation starts

  const { ref, inView, entry } = useInView({
    threshold: 0.80,
    triggerOnce: true
  });


  return(
    <div className={styles.contentContainer}>
    <div ref={ref} className={styles.body}>
      {
        phrases.map( (phrase, index) => {
          return <div key={index} className={styles.lineMask}>
            <motion.p custom={index} variants={animation} initial="initial" animate={inView ? "enter" : ''}>{phrase}</motion.p>
          </div>
    
        })
      }
    </div>
      <motion.div className={styles.imageContainer} variants={imageAnimation} initial="initial" animate={inView ? "enter": ''}>
        <Image src="/resource-database-lZKI2P-J2jE-unsplash.jpg" alt="Picture of the author" width={500} height={550}/>
      </motion.div>
    </div>
  )
}

// Process

// add overflow: hidden to div so that all children will be invisible outside of it's bounds.

// Create a animation variant that initially set the y property of the text at 100%

// isInView becomes true triggering y value to 0%

// The custom attribute is used to transfer the index and create a delay in the animation between the different phrases.
