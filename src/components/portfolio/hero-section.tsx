"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Code, Brain } from 'lucide-react'

const HeroSection = () => {
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [rainDrops, setRainDrops] = useState<{ left: string; height: string; duration: number; delay: number }[]>([])
  const fullText = 'FULL STACK DEVELOPER & AI ENGINEER'
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springMouseX = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const springMouseY = useSpring(mouseY, { damping: 25, stiffness: 200 })

  // Typewriter effect
  useEffect(() => {
    let timeout: NodeJS.Timeout
    let currentIndex = 0
    
    const typeCharacter = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1))
        currentIndex++
        timeout = setTimeout(typeCharacter, 80)
      }
    }
    
    timeout = setTimeout(typeCharacter, 2000)
    
    return () => clearTimeout(timeout)
  }, [])

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    
    return () => clearInterval(interval)
  }, [])

  // Mouse tracking
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Enhanced floating animations
  const floatingVariants = {
    animate: {
      y: [0, -30, 0],
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const pulsingVariants = {
    animate: {
      scale: [1, 1.4, 1],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, #FF1493 0%, #0F0B1A 30%, #000000 100%)'
      }}
    >
      {/* Enhanced Animated Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.2) 2px, transparent 2px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.2) 2px, transparent 2px)
            `,
            backgroundSize: '40px 40px',
            x: useTransform(springMouseX, [0, 1000], [0, -30]),
            y: useTransform(springMouseY, [0, 1000], [0, -30])
          }}
        />
      </div>

      {/* Digital Rain Effect */}
      <div className="absolute inset-0">
        {rainDrops.map((drop, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-primary opacity-20"
            style={{
              left: drop.left,
              height: drop.height
            }}
            animate={{
              y: [-100, typeof window !== 'undefined' ? window.innerHeight + 100 : 1000],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: drop.duration,
              repeat: Infinity,
              delay: drop.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Enhanced Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-12 h-12 border-4 border-primary pixel-text flex items-center justify-center text-xs text-primary"
        variants={floatingVariants}
        animate="animate"
        style={{
          x: useTransform(springMouseX, [0, 1000], [0, 40]),
          y: useTransform(springMouseY, [0, 1000], [0, 40])
        }}
      >
        &lt;/&gt;
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-32 w-8 h-8 bg-secondary pixel-text flex items-center justify-center text-xs text-black"
        variants={pulsingVariants}
        animate="animate"
        style={{
          x: useTransform(springMouseX, [0, 1000], [0, -35]),
          y: useTransform(springMouseY, [0, 1000], [0, 35])
        }}
      >
        <Zap className="w-4 h-4" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-32 w-16 h-16 border-4 border-secondary pixel-text flex items-center justify-center text-xs text-secondary"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      >
        <Code className="w-6 h-6" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-20 w-14 h-14 border-4 border-primary pixel-text flex items-center justify-center text-xs text-primary"
        style={{
          clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
        }}
        variants={pulsingVariants}
        animate="animate"
        transition={{ delay: 0.5 }}
      >
        <Brain className="w-6 h-6" />
      </motion.div>

      {/* Enhanced Scanline Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 255, 255, 0.05) 1px, rgba(0, 255, 255, 0.05) 3px)'
        }}
      />

      {/* Glitch Effect Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
        animate={{
          x: [-100, typeof window !== 'undefined' ? window.innerWidth + 100 : 1200]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
      />

      {/* Main Content - Full Screen Name */}
      <div className="relative z-10 text-center px-4 w-full h-full flex flex-col items-center justify-center">
        {/* Massive Name Display */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pixel-text text-primary mb-8 relative"
          style={{
            fontSize: 'clamp(2rem, 12vw, 8rem)',
            lineHeight: '0.9',
            textShadow: `
              0 0 20px rgba(0, 255, 255, 0.8), 
              0 0 40px rgba(0, 255, 255, 0.6),
              0 0 60px rgba(0, 255, 255, 0.4),
              0 0 80px rgba(0, 255, 255, 0.2)
            `,
            letterSpacing: '0.1em',
            wordSpacing: '0.2em'
          }}
        >
          DEEPENDER
          <br />
          YADAV
          
          {/* Name Glow Effect */}
          <div className="absolute inset-0 pixel-text text-primary animate-pulse opacity-50"
            style={{
              fontSize: 'clamp(2rem, 12vw, 8rem)',
              lineHeight: '0.9',
              letterSpacing: '0.1em',
              wordSpacing: '0.2em',
              filter: 'blur(2px)'
            }}
          >
            DEEPENDER
            <br />
            YADAV
          </div>
        </motion.h1>

        {/* Enhanced Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mb-16 relative"
        >
          {/* Terminal-style brackets */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="pixel-text text-secondary text-2xl">[</span>
            <h2 
              className="pixel-text text-secondary font-bold text-center"
              style={{
                fontSize: 'clamp(0.8rem, 3vw, 1.5rem)',
                textShadow: '0 0 15px rgba(255, 20, 147, 0.7)',
                letterSpacing: '0.05em'
              }}
            >
              {typedText}
              <span 
                className={`inline-block w-1 h-6 ml-1 bg-secondary ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  animation: 'pulse 1s infinite'
                }}
              />
            </h2>
            <span className="pixel-text text-secondary text-2xl">]</span>
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <a
            href="#skills-matrix"
            className="group relative bg-transparent border-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground pixel-text font-bold px-8 py-4 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            style={{
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: 'clamp(0.6rem, 2vw, 1rem)'
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Enter Portfolio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            
            {/* Enhanced terminal corners */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-secondary" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-secondary" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-secondary" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-secondary" />
          </a>

          <a
            href="/api/download-resume"
            download="Deepender_Yadav_Resume.pdf"
            className="group relative bg-transparent border-4 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground pixel-text font-bold px-8 py-4 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            style={{
              boxShadow: '0 0 30px rgba(255, 20, 147, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: 'clamp(0.6rem, 2vw, 1rem)'
            }}
          >
            <span className="relative z-10">
              Download Resume
            </span>
          </a>
        </motion.div>
      </div>

      {/* Corner HUD Elements */}
      <div className="absolute top-4 left-4 pixel-text text-primary text-xs opacity-70">
        STATUS: ONLINE
      </div>
      <div className="absolute top-4 right-4 pixel-text text-secondary text-xs opacity-70">
        ROLE: DEVELOPER
      </div>
      <div className="absolute bottom-4 left-4 pixel-text text-primary text-xs opacity-70">
        LOCATION: INDIA
      </div>
      <div className="absolute bottom-4 right-4 pixel-text text-secondary text-xs opacity-70">
        YEAR: 2024
      </div>
    </section>
  )
}

export default HeroSection