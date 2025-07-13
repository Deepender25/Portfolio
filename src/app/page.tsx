import HeroSection from '@/components/portfolio/hero-section'
import SkillsMatrix from '@/components/portfolio/skills-matrix'
import ProjectShowcase from '@/components/portfolio/project-showcase'
import EducationTimeline from '@/components/portfolio/education-timeline'
import ContactFooter from '@/components/portfolio/contact-footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <SkillsMatrix />
      <ProjectShowcase />
      <EducationTimeline />
      <ContactFooter />
    </main>
  )
}