"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, useAnimationFrame } from "motion/react"
import { Mail, Phone, Linkedin, Github, Send, User, MessageSquare, Terminal, Zap, Globe, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Enhanced particle system with different particle types
const ParticleSystem = () => {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    opacity: number
    size: number
    color: string
    type: 'dot' | 'line' | 'spark'
  }>>([])

  useEffect(() => {
    const colors = ['#00FFFF', '#FF1493', '#32FF32', '#FFD700']
    const types: ('dot' | 'line' | 'spark')[] = ['dot', 'line', 'spark']
    
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * 400,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      opacity: Math.random() * 0.8 + 0.2,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: types[Math.floor(Math.random() * types.length)]
    }))
    setParticles(initialParticles)
  }, [])

  useAnimationFrame(() => {
    setParticles(prevParticles => 
      prevParticles.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.vy + 400) % 400,
        opacity: 0.2 + Math.sin(Date.now() * 0.003 + particle.id) * 0.3
      }))
    )
  })

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`absolute ${
            particle.type === 'line' ? 'w-8 h-0.5' : 
            particle.type === 'spark' ? 'w-1 h-4' : 'w-1 h-1 rounded-full'
          }`}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.type === 'line' ? 16 : particle.size,
            height: particle.type === 'spark' ? 8 : particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            transform: particle.type === 'line' ? 'rotate(45deg)' : 'none'
          }}
        />
      ))}
    </div>
  )
}

// Enhanced typing effect with cursor blinking
const TypedPlaceholder = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
      let index = 0
      const typeInterval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index))
          index++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
        }
      }, 80)
    }, delay)

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => {
      clearTimeout(timer)
      clearInterval(cursorInterval)
    }
  }, [text, delay])

  return (
    <span className="text-text-secondary font-mono text-sm">
      {displayText}
      {(isTyping || showCursor) && 
        <span 
          className="text-primary font-bold ml-0.5"
          style={{ opacity: showCursor ? 1 : 0 }}
        >
          ▊
        </span>
      }
    </span>
  )
}

// Enhanced glowing contact button
const ContactButton = ({ href, icon: Icon, children, description, className = "" }: {
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  description: string
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05,
        rotateZ: 1
      }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative group bg-background/80 border-2 border-primary/30 
        hover:border-primary transition-all duration-500 backdrop-blur-sm
        p-4 rounded-lg cursor-pointer overflow-hidden
        hover:bg-background/90 hover:shadow-2xl
        ${className}
      `}
      style={{
        boxShadow: isHovered 
          ? `0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)`
          : 'none'
      }}
    >
      {/* Animated background sweep */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        animate={{ 
          x: isHovered ? ['-100%', '100%'] : '-100%',
          opacity: isHovered ? [0, 0.5, 0] : 0
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      
      {/* HUD corners */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors duration-300" />
      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors duration-300" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors duration-300" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors duration-300" />

      <div className="relative flex items-start gap-4">
        <motion.div
          animate={{
            color: isHovered ? ['#00FFFF', '#FF1493', '#00FFFF'] : '#00FFFF',
            scale: isHovered ? [1, 1.2, 1] : 1
          }}
          transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
          className="mt-1 flex-shrink-0"
          style={{
            filter: isHovered ? 'drop-shadow(0 0 8px currentColor)' : 'none'
          }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className="font-bold font-[var(--font-display)] text-xs sm:text-sm text-primary group-hover:text-primary transition-colors pixel-text break-words"
               style={{ textShadow: isHovered ? '0 0 10px currentColor' : 'none' }}>
            {children}
          </div>
          <div className="text-xs text-text-secondary mt-1 font-[var(--font-body)] break-words">
            {description}
          </div>
        </div>

        {/* Status indicator */}
        <motion.div
          className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1.5"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ boxShadow: '0 0 6px #32FF32' }}
        />
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

// Terminal-style status display
const StatusDisplay = () => {
  const [status, setStatus] = useState("INITIALIZING")
  
  useEffect(() => {
    const statuses = ["INITIALIZING", "CONNECTING", "ONLINE", "READY"]
    let index = 0
    
    const interval = setInterval(() => {
      setStatus(statuses[index])
      index = (index + 1) % statuses.length
      if (index === 3) clearInterval(interval) // Stop at READY
    }, 800)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <motion.div
        className="w-2 h-2 rounded-full bg-green-500"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <span className="text-green-500">STATUS: {status}</span>
    </div>
  )
}

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Add terminal-style feedback
    setTerminalLines([
      ">> Initiating secure transmission...",
      ">> Encrypting message data...",
      ">> Establishing connection...",
    ])
    
    try {
      // Simulate progress feedback
      for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 600))
        setTerminalLines(prev => [...prev, `>> Step ${i + 1} complete...`])
      }
      
      // Send data to backend
      setTerminalLines(prev => [...prev, ">> Transmitting to server..."])
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      await new Promise(resolve => setTimeout(resolve, 500))
      setTerminalLines(prev => [...prev, ">> MESSAGE TRANSMITTED SUCCESSFULLY!"])
      
      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({ name: "", email: "", message: "" })
      
      setTimeout(() => {
        setShowSuccess(false)
        setTerminalLines([])
      }, 4000)
      
    } catch (error) {
      console.error('Error sending message:', error)
      setTerminalLines(prev => [...prev, ">> ERROR: TRANSMISSION FAILED!"])
      setIsSubmitting(false)
      
      setTimeout(() => {
        setTerminalLines([])
      }, 3000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <footer className="relative bg-background py-10 sm:py-20 overflow-hidden">
      {/* Enhanced grid background */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(255, 20, 147, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 20, 147, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 80px 80px, 80px 80px",
          backgroundPosition: "0 0, 0 0, 20px 20px, 20px 20px"
        }}
      />

      {/* Radial glow effect */}
      <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-background opacity-80" />

      {/* Enhanced particle system */}
      <ParticleSystem />

      {/* Scanlines overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 255, 255, 0.02) 50%)',
          backgroundSize: '100% 4px'
        }}
        animate={{ backgroundPositionY: ['0px', '4px'] }}
        transition={{ duration: 0.1, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8 lg:mb-12 p-4 bg-background/60 border border-primary/30 rounded-lg backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="font-mono text-xs sm:text-sm text-primary break-all">deepender@portfolio:~/contact$</span>
          </div>
          <StatusDisplay />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="font-bold font-[var(--font-display)] text-2xl md:text-3xl text-primary mb-2 pixel-text">
                  [ ESTABLISH CONNECTION ]
                </h2>
                
                <div className="flex items-center gap-2 text-xs font-mono text-primary/60">
                  <MapPin className="w-3 h-3" />
                  <span>Location: Gurugram, Haryana, India</span>
                </div>

                {/* Status bars */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-primary/80">
                    <span>CONNECTION STATUS</span>
                    <span>ACTIVE</span>
                  </div>
                  <motion.div 
                    className="h-1 bg-primary/20 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </motion.div>
                </div>
              </div>

              <div className="space-y-4">
                <ContactButton 
                  href="mailto:yadavdeepender65@gmail.com" 
                  icon={Mail}
                  description="PRIMARY_COMM_CHANNEL"
                >
                  yadavdeepender65@gmail.com
                </ContactButton>

                <ContactButton 
                  href="tel:+917015878120" 
                  icon={Phone}
                  description="VOICE_TRANSMISSION"
                >
                  +91 7015878120
                </ContactButton>

                <ContactButton 
                  href="https://www.linkedin.com/in/deepender25/" 
                  icon={Linkedin}
                  description="PROFESSIONAL_NETWORK"
                >
                  LinkedIn Profile
                </ContactButton>

                <ContactButton 
                  href="https://github.com/Deepender25" 
                  icon={Github}
                  description="CODE_REPOSITORY"
                >
                  GitHub Profile
                </ContactButton>
              </div>
            </motion.div>

            {/* Enhanced copyright section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="pt-8 border-t border-primary/30 space-y-4"
            >
              <div className="text-xs font-mono text-primary/60">
                <div>SYSTEM_VERSION: Portfolio_v2.0.24</div>
                <div>LAST_UPDATE: {new Date().toISOString().split('T')[0]}</div>
                <div>FRAMEWORK: Next.js + React + TypeScript</div>
              </div>
              
              <p className="text-sm font-[var(--font-display)] text-center lg:text-left pixel-text">
                <motion.span
                  animate={{ 
                    textShadow: ["0 0 5px rgba(0, 255, 255, 0.5)", "0 0 15px rgba(0, 255, 255, 0.8)", "0 0 5px rgba(0, 255, 255, 0.5)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-primary"
                >
                  ©
                </motion.span>
                {" "}2025 
                <motion.span
                  animate={{ color: ["#B8B8B8", "#00FFFF", "#FF1493", "#32FF32", "#B8B8B8"] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  {" "}DEEPENDER YADAV
                </motion.span>
                . ALL RIGHTS RESERVED.
              </p>
            </motion.div>
          </div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-background/70 border-2 border-primary/30 rounded-lg overflow-hidden backdrop-blur-sm"
          >
            {/* Enhanced terminal header */}
            <div className="flex items-center justify-between p-4 border-b border-primary/30 bg-background/90">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-red-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-yellow-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
                <span className="font-mono text-xs text-text-secondary">
                  secure_message_terminal.exe
                </span>
              </div>
              <Zap className="w-4 h-4 text-primary animate-pulse" />
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Terminal output for feedback */}
                {terminalLines.length > 0 && (
                  <div className="bg-background/80 border border-primary/30 rounded p-3 font-mono text-xs space-y-1">
                    {terminalLines.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-green-400"
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-background/60 border-2 border-primary/30 focus:border-primary font-[var(--font-body)] text-text-primary placeholder:text-transparent hover:border-primary/60 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:shadow-lg pixel-text"
                    />
                    {!formData.name && (
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <TypedPlaceholder text="Name..." delay={500} />
                      </div>
                    )}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40">
                      <User className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="relative">
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-background/60 border-2 border-primary/30 focus:border-primary font-[var(--font-body)] text-text-primary placeholder:text-transparent hover:border-primary/60 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:shadow-lg pixel-text"
                    />
                    {!formData.email && (
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <TypedPlaceholder text="Email..." delay={1000} />
                      </div>
                    )}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40">
                      <Mail className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="relative">
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="bg-background/60 border-2 border-primary/30 focus:border-primary font-[var(--font-body)] text-text-primary placeholder:text-transparent hover:border-primary/60 transition-all duration-300 resize-none focus:ring-2 focus:ring-primary/20 focus:shadow-lg pixel-text"
                    />
                    {!formData.message && (
                      <div className="absolute left-3 top-3 pointer-events-none">
                        <TypedPlaceholder text="Message..." delay={1500} />
                      </div>
                    )}
                    <div className="absolute right-3 top-3 text-primary/40">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting || showSuccess}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary font-bold font-[var(--font-display)] text-sm text-background border-2 border-primary hover:border-secondary transition-all duration-500 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed pixel-text min-h-[44px]"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                      animate={{ 
                        opacity: [0, 0.5, 0],
                        x: ['-100%', '100%']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    <div className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                          />
                          TRANSMITTING...
                        </>
                      ) : showSuccess ? (
                        <>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-success"
                          >
                            ✓
                          </motion.div>
                          MESSAGE_SENT!
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          [ TRANSMIT_DATA ]
                        </>
                      )}
                    </div>
                  </Button>
                </motion.div>
              </form>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/40" />
          </motion.div>
        </div>
      </div>

      {/* Enhanced bottom effects */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
          scaleX: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* CSS for enhanced effects */}
      <style jsx>{`
        @keyframes scanlines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .pixel-text {
          text-rendering: optimizeSpeed;
          font-variant-ligatures: none;
        }
      `}</style>
    </footer>
  )
}
