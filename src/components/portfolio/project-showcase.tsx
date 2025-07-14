"use client"

import { motion, useTransform, useScroll } from "motion/react"
import { ExternalLink, Github, Eye, Cpu, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    title: "CursorViaCam",
    subtitle: "Vision-Based Assistive HCI System",
    description: "Revolutionary computer vision system that enables hands-free cursor control through eye and facial movements, providing accessibility solutions for users with mobility limitations.",
    longDescription: "An innovative human-computer interface that leverages advanced computer vision and machine learning to track eye movements and facial gestures, translating them into precise cursor movements and click actions.",
    techStack: ["OpenCV", "MediaPipe", "PyAutoGUI", "Python", "Computer Vision"],
    borderColor: "from-cyan-400 via-cyan-300 to-cyan-500",
    glowColor: "shadow-cyan-400/30",
    accentColor: "text-cyan-400",
    icon: Eye,
    delay: 0,
    repoLink: "https://github.com/Deepender25/CursorViaCam"
  },
  {
    id: 2,
    title: "AI Flashcard Generator",
    subtitle: "LLM-Powered Knowledge Synthesis",
    description: "Intelligent study companion that transforms any content into personalized flashcards using state-of-the-art language models, revolutionizing the learning experience.",
    longDescription: "Advanced AI system that analyzes text content and automatically generates contextually relevant flashcards with spaced repetition algorithms for optimal knowledge retention.",
    techStack: ["Streamlit", "Hugging Face", "Transformers", "NLP", "Machine Learning"],
    borderColor: "from-pink-400 via-rose-300 to-pink-500",
    glowColor: "shadow-pink-400/30",
    accentColor: "text-pink-400",
    icon: Brain,
    delay: 0.2,
    repoLink: "https://github.com/Deepender25/FlashCard-Generator"
  },
  {
    id: 3,
    title: "AutoDoc AI",
    subtitle: "AI-Driven Documentation Engine",
    description: "Next-generation documentation automation platform that analyzes codebases and generates comprehensive, intelligent documentation with zero manual intervention.",
    longDescription: "Sophisticated AI engine powered by Google's Gemini API that understands code structure, functionality, and context to produce detailed, accurate documentation automatically.",
    techStack: ["Gemini API", "Node.js", "TypeScript", "AI", "Documentation"],
    borderColor: "from-lime-400 via-green-300 to-lime-500",
    glowColor: "shadow-lime-400/30",
    accentColor: "text-lime-400",
    icon: Cpu,
    delay: 0.4,
    repoLink: "https://github.com/Deepender25/Readme-Architect-AI"
  }
]

export default function ProjectShowcase() {
  const { scrollYProgress } = useScroll()
  
  return (
    <section className="bg-background py-24 px-6 min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            }}
            animate={{
              y: -100,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-[var(--font-primary-family)] text-4xl md:text-6xl lg:text-7xl text-primary mb-6 tracking-wider">
            FEATURED<br />
            <span className="text-secondary">PROJECTS</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary via-secondary to-lime-400 mx-auto mb-6" />
          <p className="font-[var(--font-secondary-family)] text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Cutting-edge innovations at the intersection of AI, computer vision, and human-computer interaction
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project) => {
            const Icon = project.icon
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: project.delay,
                  type: "spring",
                  stiffness: 100,
                }}
                className="group relative"
              >
                {/* Animated border container */}
                <div className="relative p-[2px] rounded-2xl overflow-hidden">
                  {/* Animated gradient border */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${project.borderColor} opacity-80`}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.borderColor} blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
                  
                  {/* Card content */}
                  <motion.div
                    className={`relative bg-card rounded-2xl p-8 h-full ${project.glowColor} group-hover:shadow-2xl transition-all duration-300`}
                    whileHover={{
                      y: -2,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {/* Project Icon */}
                    <motion.div
                      className={`w-16 h-16 ${project.accentColor} mb-6 relative`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Icon size={64} className="absolute inset-0" />
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${project.borderColor} opacity-20 blur-md`}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>

                    {/* Project Title */}
                    <h3 className="font-[var(--font-primary-family)] text-xl md:text-2xl text-foreground mb-2 tracking-wide leading-tight">
                      {project.title}
                    </h3>
                    
                    <p className={`font-[var(--font-secondary-family)] text-sm ${project.accentColor} mb-4 font-medium tracking-wider uppercase`}>
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="font-[var(--font-secondary-family)] text-muted-foreground text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map((tech, idx) => (
                        <motion.div key={tech}>
                          <Badge
                            variant="outline"
                            className={`font-[var(--font-secondary-family)] text-xs ${project.accentColor} border-current bg-card/50 hover:bg-current/10 transition-colors duration-300`}
                            style={{
                              animationDelay: `${idx * 0.1}s`,
                            }}
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-[var(--font-primary-family)] bg-transparent border-2 ${project.accentColor} border-current hover:bg-current/10 text-xs px-4 py-2 tracking-wider transition-all duration-300 flex-1 flex items-center justify-center`}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        REPO
                      </a>
                    </div>

                    {/* Terminal-style bottom border */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1 ${project.accentColor} bg-current`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: project.delay + 0.5 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <a
            href="https://github.com/Deepender25"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[var(--font-primary-family)] bg-gradient-to-r from-primary via-secondary to-lime-400 hover:from-secondary hover:via-lime-400 hover:to-primary text-black px-8 h-10 rounded-md text-lg tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center"
          >
            <Github className="w-6 h-6 mr-3" />
            EXPLORE ALL PROJECTS
          </a>
        </motion.div>
      </div>
    </section>
  )
}