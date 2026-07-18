import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import diagnosisImage from '@/assets/images/landing/diagnosis.png'
import trackingImage from '@/assets/images/landing/tracking.png'
import revlineLogo from '@/assets/images/revline-logo-transparent.png'
import './ScrollJourney.css'

const sectionIds = ['revline', 'diagnosis', 'tracking', 'faq', 'contact'] as const

const checkpoints = [
  { id: 'revline', label: 'Revline', x: '50%', top: '9%' },
  { id: 'diagnosis', label: 'Diagnosis', x: '27%', top: '29%' },
  { id: 'tracking', label: 'Tracking', x: '73%', top: '50%' },
  { id: 'faq', label: 'FAQ', x: '30%', top: '70%' },
  { id: 'contact', label: 'Contact', x: '50%', top: '91%' },
] as const

const faqItems = [
  {
    question: 'What does Revline help me manage?',
    answer: 'Revline brings vehicle diagnosis, completed maintenance, service history, schedules, and reminders into one clear place.',
  },
  {
    question: 'Can I track more than one vehicle?',
    answer: 'Yes. Revline is designed to keep every vehicle profile and its maintenance timeline organized independently.',
  },
  {
    question: 'How do maintenance reminders work?',
    answer: 'Upcoming work can be scheduled by date or mileage so you can plan service before it becomes an urgent repair.',
  },
  {
    question: 'Does Revline replace a professional inspection?',
    answer: 'No. Revline helps you understand and organize vehicle care, while qualified technicians remain essential for hands-on inspection and repair.',
  },
]

type ScrollJourneyProps = {
  onActiveSectionChange: (section: string) => void
}

type JourneySectionProps = {
  id: typeof sectionIds[number]
  index: number
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
  image?: string
  imageAlt?: string
  align?: 'left' | 'right'
}

function JourneyPath() {
  const desktopPath = 'M 500 420 C 510 700, 250 900, 270 1450 S 720 1900, 730 2500 S 280 3100, 300 3500 S 500 4150, 500 4580'
  const mobilePath = 'M 95 420 C 125 900, 68 1200, 100 1600 S 72 2300, 102 2700 S 70 3500, 100 4580'

  return (
    <div className="journey-path" aria-hidden="true">
      <svg className="journey-path__svg journey-path__svg--desktop" viewBox="0 0 1000 5000" preserveAspectRatio="none">
        <path className="journey-path__rail" d={desktopPath} pathLength="1" />
        <path className="journey-path__glow" d={desktopPath} pathLength="1" />
        <path className="journey-path__progress" d={desktopPath} pathLength="1" />
      </svg>
      <svg className="journey-path__svg journey-path__svg--mobile" viewBox="0 0 1000 5000" preserveAspectRatio="none">
        <path className="journey-path__rail" d={mobilePath} pathLength="1" />
        <path className="journey-path__glow" d={mobilePath} pathLength="1" />
        <path className="journey-path__progress" d={mobilePath} pathLength="1" />
      </svg>
    </div>
  )
}

function StarCheckpoint({ label, active, completed, x, top }: typeof checkpoints[number] & { active: boolean; completed: boolean }) {
  const style = { '--checkpoint-x': x, '--checkpoint-top': top } as CSSProperties

  return (
    <div className={`star-checkpoint${active ? ' is-active' : ''}${completed ? ' is-complete' : ''}`} style={style} aria-hidden="true">
      <span className="star-checkpoint__halo" />
      <svg viewBox="0 0 40 40">
        <path d="m20 3.5 4.3 10.4 11.2.9-8.5 7.3 2.6 10.9-9.6-5.8-9.6 5.8L13 22.1l-8.5-7.3 11.2-.9L20 3.5Z" />
      </svg>
      <span className="star-checkpoint__label">{label}</span>
    </div>
  )
}

function JourneySection({ id, index, eyebrow, title, description, children, image, imageAlt, align = 'left' }: JourneySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true)
        observer.disconnect()
      }
    }, { threshold: 0.22 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`journey-section journey-section--${align}${revealed ? ' is-revealed' : ''}`}
      data-journey-section
      aria-labelledby={`${id}-title`}
      style={{ '--section-index': index } as CSSProperties}
    >
      <div className="journey-section__inner">
        <div className="journey-section__content">
          <p className="journey-section__eyebrow reveal-item">{eyebrow}</p>
          <h2 className="journey-section__title reveal-item" id={`${id}-title`}>{title}</h2>
          <p className="journey-section__description reveal-item">{description}</p>
          {children && <div className="journey-section__actions reveal-item">{children}</div>}
        </div>
        {image && (
          <div className="journey-section__visual reveal-visual">
            <div className="journey-section__image-frame">
              <img src={image} alt={imageAlt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function FaqAccordion() {
  const [openItem, setOpenItem] = useState(0)

  return (
    <div className="faq-list">
      {faqItems.map((item, index) => {
        const isOpen = openItem === index
        return (
          <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenItem(isOpen ? -1 : index)}
              >
                <span>{item.question}</span>
                <span className="faq-item__icon" aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-item__answer" id={`faq-answer-${index}`} hidden={!isOpen}>
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ScrollJourney({ onActiveSectionChange }: ScrollJourneyProps) {
  const journeyRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [completedIndex, setCompletedIndex] = useState(0)

  const updateJourney = useCallback(() => {
    const journey = journeyRef.current
    if (!journey) return

    const rect = journey.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const nextProgress = Math.min(1, Math.max(0, (viewportHeight * 0.5 - rect.top) / (rect.height - viewportHeight * 0.5)))
    journey.style.setProperty('--journey-progress', String(nextProgress))

    const sections = Array.from(journey.querySelectorAll<HTMLElement>('[data-journey-section]'))
    const focusLine = viewportHeight * 0.46
    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    sections.forEach((section, index) => {
      const sectionRect = section.getBoundingClientRect()
      const distance = Math.abs(sectionRect.top + sectionRect.height * 0.45 - focusLine)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })

    setActiveIndex((current) => current === nearestIndex ? current : nearestIndex)
    setCompletedIndex((current) => Math.max(current, nearestIndex))
  }, [])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        updateJourney()
        frame = 0
      })
    }

    updateJourney()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [updateJourney])

  useEffect(() => {
    onActiveSectionChange(sectionIds[activeIndex])
  }, [activeIndex, onActiveSectionChange])

  return (
    <div className="scroll-journey" ref={journeyRef}>
      <JourneyPath />
      <div className="journey-checkpoints">
        {checkpoints.map((checkpoint, index) => (
          <StarCheckpoint {...checkpoint} key={checkpoint.id} active={activeIndex === index} completed={completedIndex >= index} />
        ))}
      </div>

      <JourneySection id="revline" index={0} eyebrow="Your vehicle, understood" title="Confidence for every mile ahead." description="Revline turns vehicle maintenance from guesswork into a clear, connected journey, helping you understand what your car needs, what has been done, and what comes next." image={revlineLogo} imageAlt="Revline automotive platform emblem" align="left">
        <a className="journey-button journey-button--primary" href="#diagnosis">Explore Revline</a>
        <a className="journey-button journey-button--text" href="#contact">Get in touch <span aria-hidden="true">→</span></a>
      </JourneySection>

      <JourneySection id="diagnosis" index={1} eyebrow="Clear diagnosis" title="Know what your vehicle is telling you." description="Turn complex symptoms and service findings into practical maintenance insight. Revline keeps every diagnosis clear, contextual, and easier to act on." image={diagnosisImage} imageAlt="Technician performing a vehicle diagnosis" align="right">
        <a className="journey-button journey-button--primary" href="#tracking">Follow the journey</a>
      </JourneySection>

      <JourneySection id="tracking" index={2} eyebrow="Maintenance tracking" title="A complete history that moves with you." description="Record completed work, follow mileage and service schedules, and stay ahead with timely reminders. Your vehicle story remains organized from one service to the next." image={trackingImage} imageAlt="Vehicle maintenance history and tracking interface" align="left">
        <a className="journey-button journey-button--primary" href="#faq">See common questions</a>
      </JourneySection>

      <JourneySection id="faq" index={3} eyebrow="Frequently asked questions" title="The road ahead, made clearer." description="Quick answers about how Revline helps you understand, plan, and record vehicle care." align="right">
        <FaqAccordion />
      </JourneySection>

      <JourneySection id="contact" index={4} eyebrow="Start the conversation" title="Ready for a clearer maintenance journey?" description="Whether you are organizing your own vehicle care or exploring better automotive software and services, we would be glad to hear from you." align="left">
        <a className="journey-button journey-button--whatsapp" href="https://wa.me/96179137797" target="_blank" rel="noreferrer" aria-label="Contact Revline on WhatsApp">
          <svg className="journey-button__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.04 2a9.84 9.84 0 0 0-8.53 14.75L2 22l5.38-1.41A9.96 9.96 0 0 0 12.04 22 9.95 9.95 0 0 0 12.04 2Zm0 18.32a8.27 8.27 0 0 1-4.21-1.15l-.3-.18-3.2.84.86-3.11-.2-.32a8.17 8.17 0 0 1-1.27-4.39 8.31 8.31 0 1 1 8.32 8.31Zm4.56-6.23c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.12-.16.25-.64.81-.78.98-.15.17-.29.19-.54.06-.25-.12-1.05-.38-2-1.23a7.47 7.47 0 0 1-1.38-1.72c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.32-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.57-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.16 1.77 2.71 4.29 3.8.6.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.19.21-.58.21-1.08.15-1.18-.07-.1-.23-.16-.48-.29Z" />
          </svg>
          WhatsApp Revline
        </a>
        <span className="journey-contact-email">
          or email us at <a className="journey-contact-link" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=nehranakhoul%40gmail.com" target="_blank" rel="noreferrer">nehranakhoul@gmail.com</a>
        </span>
      </JourneySection>
    </div>
  )
}
