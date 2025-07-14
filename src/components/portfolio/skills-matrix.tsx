"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform } from 'motion/react'
import { Code, Eye, Globe, Database, Cpu, Bot, Zap, Layers, Terminal, GitBranch, Braces, Shield, Rocket } from 'lucide-react'

interface Skill {
  name: string
  icon: React.ReactNode
  level: number // 1-5 proficiency level
  glowColor?: string
}

interface SkillCategory {
  title: string
  skills: Skill[]
  gradient: string
  terminalColor: string
}

const skillsData: SkillCategory[] = [
  {
    title: ">>> PROGRAMMING LANGUAGES",
    gradient: "from-primary via-accent to-primary",
    terminalColor: "text-primary",
    skills: [
      { name: "Python", icon: <Code className="w-6 h-6" />, level: 5, glowColor: "#00FFFF" },
      { name: "Java", icon: <Braces className="w-6 h-6" />, level: 4, glowColor: "#FF1493" },
      { name: "C", icon: <Terminal className="w-6 h-6" />, level: 4, glowColor: "#32FF32" },
      { name: "JavaScript", icon: <Zap className="w-6 h-6" />, level: 4, glowColor: "#FFD700" },
      { name: "R", icon: <Database className="w-6 h-6" />, level: 3, glowColor: "#FF6B35" },
    ]
  },
  {
    title: ">>> AI/ML & VISION",
    gradient: "from-secondary via-primary to-secondary",
    terminalColor: "text-secondary",
    skills: [
      { name: "Scikit-learn", icon: <Bot className="w-6 h-6" />, level: 5, glowColor: "#00FFFF" },
      { name: "OpenCV", icon: <Eye className="w-6 h-6" />, level: 4, glowColor: "#FF1493" },
      { name: "MediaPipe", icon: <Layers className="w-6 h-6" />, level: 4, glowColor: "#32FF32" },
      { name: "LLM APIs", icon: <Cpu className="w-6 h-6" />, level: 3, glowColor: "#FFD700" },
      { name: "TensorFlow", icon: <Shield className="w-6 h-6" />, level: 3, glowColor: "#FF6B35" },
    ]
  },
  {
    title: ">>> WEB & DEPLOYMENT",
    gradient: "from-accent via-secondary to-accent",
    terminalColor: "text-accent",
    skills: [
      { name: "Flask", icon: <Globe className="w-6 h-6" />, level: 4, glowColor: "#00FFFF" },
      { name: "Streamlit", icon: <Layers className="w-6 h-6" />, level: 4, glowColor: "#FF1493" },
      { name: "HTML/CSS", icon: <Code className="w-6 h-6" />, level: 4, glowColor: "#32FF32" },
      { name: "Git", icon: <GitBranch className="w-6 h-6" />, level: 5, glowColor: "#FFD700" },
      { name: "MySQL", icon: <Database className="w-6 h-6" />, level: 3, glowColor: "#FF6B35" },
    ]
  }
]

const DigitalRain = () => {
  const columns = 20
  const [drops, setDrops] = useState<{ left: string; char: string }[]>([])

  useEffect(() => {
    const initialDrops = Array.from({ length: columns }, () => ({
      left: `${Math.random() * 100}%`,
      char: Math.random() > 0.5 ? '1' : '0',
    }))
    setDrops(initialDrops)

    const interval = setInterval(() => {
      setDrops(prev => prev.map(drop => ({
        ...drop,
        char: Math.random() > 0.5 ? '1' : '0',
      })))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {drops.map((drop, i) => (
        <div
          key={i}
          className="absolute top-0 text-primary font-mono text-xs"
          style={{
            left: drop.left,
            transform: `translateY(${i * 10}px)`,
            textShadow: "0 0 5px currentColor"
          }}
        >
          {drop.char}
        </div>
      ))}
    </div>
  )
}

const SkillLevelIndicator = ({ level, glowColor }: { level: number; glowColor: string }) => {
  return (
    <div className="flex gap-1 justify-center mt-2">
      {[1, 2, 3, 4, 5].map((dot) => (
        <motion.div
          key={dot}
          className={`w-1.5 h-1.5 rounded-full ${
            dot <= level ? 'bg-current' : 'bg-current opacity-20'
          }`}
          style={{
            boxShadow: dot <= level ? `0 0 4px ${glowColor}` : 'none'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: dot * 0.1 }}
        />
      ))}
    </div>
  )
}

const SkillBlock = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showLevel, setShowLevel] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      onHoverStart={() => {
        setIsHovered(true)
        setShowLevel(true)
      }}
      onHoverEnd={() => {
        setIsHovered(false)
        setTimeout(() => setShowLevel(false), 200)
      }}
      className="relative group"
    >
      <motion.div
        className={`
          relative overflow-hidden rounded-lg border-2 border-primary/30 bg-background/80
          cursor-pointer transition-all duration-500 ease-out backdrop-blur-sm
          ${isHovered ? 'border-primary shadow-2xl' : 'border-primary/30'}
          hover:bg-background/90
        `}
        whileHover={{ 
          scale: 1.08,
          rotateZ: 2
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: isHovered 
            ? `0 0 30px ${skill.glowColor}40, inset 0 0 20px ${skill.glowColor}20`
            : 'none'
        }}
      >
        {/* Data stream effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ 
            x: isHovered ? ['-100%', '100%'] : '-100%',
            opacity: isHovered ? [0, 1, 0] : 0
          }}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
        />
        
        {/* Skill content */}
        <div className="relative z-10 flex flex-col items-center space-y-3 p-4">
          <motion.div
            className="text-primary"
            animate={{ 
              scale: isHovered ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            style={{
              color: skill.glowColor,
              filter: isHovered ? `drop-shadow(0 0 8px ${skill.glowColor})` : 'none'
            }}
          >
            {skill.icon}
          </motion.div>
          
          <span 
            className="text-xs font-bold font-[var(--font-display)] text-center transition-colors duration-300 group-hover:text-primary pixel-text"
            style={{
              textShadow: isHovered ? `0 0 10px ${skill.glowColor}` : 'none'
            }}
          >
            {skill.name}
          </span>

          {/* Skill level indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: showLevel ? 1 : 0, 
              scale: showLevel ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
            className="text-primary"
          >
            <SkillLevelIndicator level={skill.level} glowColor={skill.glowColor || '#00FFFF'} />
          </motion.div>
        </div>

        {/* HUD corners */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors duration-300" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors duration-300" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors duration-300" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors duration-300" />

        {/* Glitch effect overlay */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
            animate={{
              opacity: [0, 0.3, 0],
              x: [-10, 10, -5, 5, 0]
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

const CategoryPanel = ({ category, index }: { category: SkillCategory; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 45 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 45 }}
      transition={{ delay: index * 0.3, duration: 0.8, type: "spring" }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-xl border-2 border-primary/30 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-500">
        {/* Terminal-style header */}
        <div className="flex items-center justify-between p-4 border-b border-primary/30 bg-background/80">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <span className="font-mono text-xs text-text-secondary ml-2">SYSTEM_ONLINE</span>
          </div>
          <Rocket className="w-4 h-4 text-primary animate-pulse" />
        </div>
        
        {/* Animated border gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-10`}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative z-10 p-6">
          {/* Category title with glitch effect */}
          <motion.h3 
            className={`font-bold font-[var(--font-display)] text-sm ${category.terminalColor} mb-6 text-center pixel-text`}
            animate={{
              textShadow: [
                "0 0 5px currentColor",
                "0 0 20px currentColor",
                "0 0 5px currentColor"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {category.title}
          </motion.h3>

          {/* Skills grid */}
          <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {category.skills.map((skill, skillIndex) => (
              <SkillBlock 
                key={skill.name} 
                skill={skill} 
                index={skillIndex} 
              />
            ))}
          </div>
        </div>

        {/* Scanner sweep effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
          animate={{
            y: [-5, 300, -5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Corner HUD elements */}
        <div className="absolute top-2 left-2 text-xs font-mono text-primary/60">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="absolute top-2 right-2 text-xs font-mono text-primary/60">
          ONLINE
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillsMatrix() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <section id="skills-matrix" className="relative py-20 bg-background overflow-hidden">
      {/* Digital rain background */}
      <DigitalRain />
      
      {/* Enhanced grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-primary/10 via-transparent to-background/80" />

      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        {/* Section header with terminal styling */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Terminal prompt */}
          <div className="font-mono text-sm text-primary/60 mb-4">
            user@deepender:~$ ./display_skills.exe
          </div>
          
          <motion.h2 
            className="font-bold font-[var(--font-display)] text-2xl md:text-3xl lg:text-4xl text-primary mb-6 pixel-text"
            animate={{
              textShadow: [
                "0 0 10px rgba(0, 255, 255, 0.5)",
                "0 0 30px rgba(0, 255, 255, 0.8)",
                "0 0 10px rgba(0, 255, 255, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            [ SKILLS MATRIX ]
          </motion.h2>
          
          <p className="text-text-secondary font-[var(--font-body)] text-lg max-w-3xl mx-auto">
            Analyzing technical capabilities across multiple domains...
          </p>

          {/* Loading bar effect */}
          <motion.div 
            className="mt-8 mx-auto w-64 h-1 bg-primary/20 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isInView ? '100%' : 0 }}
              transition={{ duration: 2, delay: 0.8 }}
            />
          </motion.div>
        </motion.div>

        {/* Skills grid with enhanced spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {skillsData.map((category, index) => (
            <CategoryPanel key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 2 }}
          className="text-center mt-12 font-mono text-sm text-primary/80"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            SYSTEMS_OPERATIONAL ▊
          </motion.span>
        </motion.div>
      </div>

      {/* Animated bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
          scaleX: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  )
}