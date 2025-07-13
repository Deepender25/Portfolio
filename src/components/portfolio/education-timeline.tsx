"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useTransform, MotionValue } from "motion/react"
import { GraduationCap, Award, Trophy, Calendar, MapPin } from "lucide-react"

interface TimelineItem {
  id: string
  type: 'education' | 'certification' | 'hackathon'
  title: string
  subtitle: string
  date: string
  location?: string
  details: string
  progress?: number
}

const timelineData: TimelineItem[] = [
  {
    id: "1",
    type: "education",
    title: "B.Tech in CSE (AI Specialization)",
    subtitle: "Gurugram University",
    date: "2023 - 2027",
    details: "CGPA: 8.5/10.0",
    progress: 50
  },
  {
    id: "2",
    type: "certification",
    title: "AWS Solutions Architecture",
    subtitle: "Forage",
    date: "Jul 2025",
    details: "Professional certification in cloud architecture and AWS services"
  },
  {
    id: "3",
    type: "certification",
    title: "Deloitte Australia Technology",
    subtitle: "Forage",
    date: "Jul 2025",
    details: "Technology consulting and enterprise solutions certification"
  },
  {
    id: "4",
    type: "hackathon",
    title: "HackUtsav 1.0",
    subtitle: "48-hour hackathon",
    date: "Nov 2024",
    location: "The NorthCap University",
    details: "Developed innovative AI-powered solutions"
  },
  {
    id: "5",
    type: "hackathon",
    title: "Hacked 3.0",
    subtitle: "36-hour hackathon",
    date: "Feb 2025",
    location: " BML Munjal University",
    details: "Built cutting-edge tech solutions with team collaboration"
  },
  {
    id: "6",
    type: "hackathon",
    title: "Hackverse",
    subtitle: "National hackathon",
    date: "Apr 2025",
    location: "IILM University",
    details: "Competed in India's premier hackathon event"
  }
]

const PixelGraduationCap = ({ size = 24 }: { size?: number }) => (
  <div className={`w-${Math.floor(size/4)} h-${Math.floor(size/4)} relative`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" className="w-full h-full text-primary">
      <g fill="currentColor">
        <rect x="4" y="10" width="16" height="2"/>
        <rect x="2" y="12" width="20" height="2"/>
        <rect x="6" y="8" width="12" height="2"/>
        <rect x="8" y="6" width="8" height="2"/>
        <rect x="10" y="14" width="4" height="6"/>
        <rect x="8" y="20" width="8" height="2"/>
        <rect x="20" y="12" width="2" height="8"/>
      </g>
    </svg>
  </div>
)

const PixelAward = ({ size = 20 }: { size?: number }) => (
  <div className={`w-${Math.floor(size/4)} h-${Math.floor(size/4)} relative`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 20 20" className="w-full h-full text-secondary">
      <g fill="currentColor">
        <rect x="6" y="4" width="8" height="8"/>
        <rect x="4" y="6" width="2" height="4"/>
        <rect x="14" y="6" width="2" height="4"/>
        <rect x="8" y="12" width="4" height="6"/>
        <rect x="6" y="18" width="2" height="2"/>
        <rect x="12" y="18" width="2" height="2"/>
        <rect x="8" y="6" width="4" height="4"/>
      </g>
    </svg>
  </div>
)

const PixelTrophy = ({ size = 20 }: { size?: number }) => (
  <div className={`w-${Math.floor(size/4)} h-${Math.floor(size/4)} relative`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 20 20" className="w-full h-full text-success">
      <g fill="currentColor">
        <rect x="6" y="2" width="8" height="8"/>
        <rect x="4" y="4" width="2" height="4"/>
        <rect x="14" y="4" width="2" height="4"/>
        <rect x="8" y="10" width="4" height="6"/>
        <rect x="6" y="16" width="8" height="2"/>
        <rect x="4" y="18" width="12" height="2"/>
        <rect x="8" y="4" width="4" height="4"/>
      </g>
    </svg>
  </div>
)

const getIcon = (type: string) => {
  switch (type) {
    case 'education':
      return <PixelGraduationCap size={32} />
    case 'certification':
      return <PixelAward size={28} />
    case 'hackathon':
      return <PixelTrophy size={28} />
    default:
      return <GraduationCap className="w-8 h-8 text-primary" />
  }
}

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex items-center w-full ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col`}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Card */}
      <motion.div
        className={`w-full md:w-5/12 ${isLeft ? 'md:mr-auto' : 'md:ml-auto'} mb-8 md:mb-0`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-card border-2 border-border rounded-lg p-6 relative overflow-hidden group">
          {/* Glowing border effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-lg"
            animate={{
              opacity: isHovered ? 1 : 0,
              boxShadow: isHovered 
                ? `0 0 20px ${item.type === 'education' ? '#00FFFF' : item.type === 'certification' ? '#FF1493' : '#32FF32'}40`
                : 'none'
            }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                className="flex-shrink-0 p-2 bg-muted rounded-lg"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {getIcon(item.type)}
              </motion.div>
              
              <div className="flex-1">
                <h3 className="font-[var(--font-display)] text-sm text-primary mb-2 leading-relaxed">
                  {item.title}
                </h3>
                <p className="font-[var(--font-body)] text-muted-foreground text-sm mb-1">
                  {item.subtitle}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                  {item.location && (
                    <>
                      <MapPin className="w-3 h-3 ml-2" />
                      <span>{item.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: isHovered ? 'auto' : 0, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-text-secondary text-xs leading-relaxed mb-3">
                {item.details}
              </p>
              
              {item.progress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Progress</span>
                    <span className="text-success">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-success rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: isInView ? `${item.progress}%` : 0 }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Pixel art decoration */}
          <div className="absolute top-2 right-2 opacity-10">
            <div className="w-8 h-8 grid grid-cols-4 gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-primary"
                  animate={{
                    opacity: isHovered ? [0.2, 0.8, 0.2] : 0.2,
                    scale: isHovered ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline Node */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 z-20 md:relative md:left-auto md:transform-none md:mx-8">
        <motion.div
          className="w-6 h-6 bg-card border-4 border-primary rounded-full relative"
          animate={{
            borderColor: isInView ? ['#00FFFF', '#FF1493', '#32FF32', '#00FFFF'] : '#00FFFF',
            boxShadow: isInView 
              ? ['0 0 10px #00FFFF', '0 0 15px #FF1493', '0 0 10px #32FF32', '0 0 10px #00FFFF']
              : 'none'
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="absolute inset-1 bg-primary rounded-full"
            animate={{
              backgroundColor: isInView ? ['#00FFFF', '#FF1493', '#32FF32', '#00FFFF'] : '#00FFFF'
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function EducationTimeline() {
  const containerRef = useRef<HTMLElement>(null)
  const scrollProgress = useMotionValue(0)
  const timelineHeight = useTransform(scrollProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const updateScrollProgress = () => {
      if (!containerRef.current) return

      const { top, height } = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrollStart = -top + windowHeight * 0.2
      const scrollEnd = scrollStart + height - windowHeight * 0.4
      const current = Math.max(0, scrollStart)
      const total = Math.max(1, scrollEnd)
      const progress = Math.min(current / total, 1)

      scrollProgress.set(progress)
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress)
    window.addEventListener('resize', updateScrollProgress)

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [scrollProgress])

  return (
    <section ref={containerRef} className="w-full bg-background py-20 px-4 relative overflow-hidden">
      {/* Background pixel art pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #00FFFF 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, #FF1493 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, #32FF32 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 60px 60px, 80px 80px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="font-[var(--font-display)] text-2xl md:text-3xl text-primary mb-4"
            animate={{
              textShadow: [
                '0 0 10px #00FFFF',
                '0 0 20px #00FFFF',
                '0 0 10px #00FFFF'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Education & Achievements
          </motion.h2>
          <p className="font-[var(--font-body)] text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
            My academic journey and professional milestones in the world of technology and innovation.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-border h-full hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-secondary to-success origin-top"
              style={{ height: timelineHeight as any }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Mobile Timeline Line */}
          <div className="absolute left-6 w-1 bg-border h-full md:hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-secondary to-success origin-top"
              style={{ height: timelineHeight as any }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}