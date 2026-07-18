import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { LinkedInIcon, GitHubIcon } from '../icons'
import { spring, viewportOnce } from '../motion'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CV_PATH = '/CV_Narek_Manukyan.pdf'
const CONTACT_EMAIL = 'narek.manukyan.2031@gmail.com'
const COPY_FEEDBACK_MS = 2000

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}
const DEFAULT_TRANSITION = { ...spring.entrance }

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContactInfo {
  label: string
  value: string
  icon: ReactNode
  copyable: boolean
  url?: string
}

interface Language {
  name: string
  proficiency: number // 0–100
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const HOW_I_OPERATE = [
  { step: '01', title: 'Scope & plan', body: 'Clear scope, milestones, and honest estimates — no vague guesses.' },
  { step: '02', title: 'Build in increments', body: 'Reviewable increments across iOS and Android, dropping to native where it counts.' },
  { step: '03', title: 'Review & mentor', body: 'Structured code review and 1:1s that raise both quality and the team.' },
  { step: '04', title: 'Launch & iterate', body: 'Store submission, release, then iteration on real usage.' },
]

const CONTACT_INFO: ContactInfo[] = [
  {
    label: 'Email',
    value: CONTACT_EMAIL,
    icon: <EmailIcon />,
    copyable: true,
    url: `mailto:${CONTACT_EMAIL}`,
  },
  {
    label: 'Phone',
    value: '+374 98 446-599',
    icon: <PhoneIcon />,
    copyable: true,
    url: 'tel:+37498446599',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/narek--manukyan',
    icon: <LinkedInIcon />,
    copyable: false,
    url: 'https://linkedin.com/in/narek--manukyan',
  },
  {
    label: 'GitHub',
    value: 'github.com/narekmanukyan',
    icon: <GitHubIcon />,
    copyable: false,
    url: 'https://github.com/narekmanukyan',
  },
]

const LANGUAGES: Language[] = [
  { name: 'Armenian (native)', proficiency: 100 },
  { name: 'Russian (full professional)', proficiency: 90 },
  { name: 'English (professional working)', proficiency: 75 },
]

// ---------------------------------------------------------------------------
// Icon sub-components
// ---------------------------------------------------------------------------

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
      <title>Email icon</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
      <title>Phone icon</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-400" aria-hidden="true">
      <title>Copied</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-ink-faint" aria-hidden="true">
      <title>Copy to clipboard</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <title>Download CV</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', lane: 'Full-time role', brief: '' })
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(label)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(null), COPY_FEEDBACK_MS)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }, [])

  // No backend required: compose a prefilled email the visitor can send.
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      const subject = `${form.lane} inquiry${form.name ? ` — ${form.name}` : ''}`
      const body = `Name: ${form.name}\nEmail: ${form.email}\nType: ${form.lane}\n\nDetails:\n${form.brief}`
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    },
    [form],
  )

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-line-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...FADE_UP} transition={DEFAULT_TRANSITION} viewport={viewportOnce} whileInView="animate" initial="initial" className="max-w-prose mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-3">Let's work together</h2>
          <p className="text-ink-muted">
            Hiring for a senior / lead mobile role, or have a project in mind? Send a note and I'll
            get back within a day.
          </p>
        </motion.div>

        {/* How I operate */}
        <h3 className="text-sm font-mono uppercase tracking-wider text-accent mb-5">How I operate</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {HOW_I_OPERATE.map(({ step, title, body }) => (
            <motion.div
              key={step}
              {...FADE_UP}
              whileInView="animate"
              initial="initial"
              viewport={viewportOnce}
              transition={{ ...spring.entrance }}
              className="card p-5"
            >
              <span className="font-mono text-sm text-accent tnum">{step}</span>
              <h3 className="mt-2 font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-sm text-ink-muted leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          {/* Project inquiry form — primary path */}
          <motion.form
            onSubmit={handleSubmit}
            {...FADE_UP}
            whileInView="animate"
            initial="initial"
            viewport={viewportOnce}
            transition={DEFAULT_TRANSITION}
            className="card p-6 sm:p-8"
          >
            <h3 className="text-xl font-semibold text-ink mb-1">Get in touch</h3>
            <p className="text-sm text-ink-muted mb-6">For hiring managers, recruiters, and freelance clients.</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="c-name" className="block text-sm text-ink-muted mb-1.5">Name</label>
                <input
                  id="c-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg bg-bg border border-line px-4 py-2.5 text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none transition-colors"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="block text-sm text-ink-muted mb-1.5">Email</label>
                <input
                  id="c-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg bg-bg border border-line px-4 py-2.5 text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none transition-colors"
                  placeholder="you@company.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
              <div>
                <label htmlFor="c-lane" className="block text-sm text-ink-muted mb-1.5">I'm reaching out about</label>
                <select
                  id="c-lane"
                  value={form.lane}
                  onChange={(e) => setForm((f) => ({ ...f, lane: e.target.value }))}
                  className="w-full rounded-lg bg-bg border border-line px-4 py-2.5 text-ink focus:border-accent focus:outline-none transition-colors"
                >
                  <option>Full-time role</option>
                  <option>Freelance project</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="c-brief" className="block text-sm text-ink-muted mb-1.5">What's the role or project?</label>
                <textarea
                  id="c-brief"
                  required
                  rows={4}
                  value={form.brief}
                  onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))}
                  className="w-full rounded-lg bg-bg border border-line px-4 py-2.5 text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none transition-colors resize-y"
                  placeholder="A senior Flutter role on a real-time product — or a freelance app build…"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full sm:w-auto px-7 py-3 rounded-lg font-semibold bg-accent text-accent-ink hover:bg-accent-strong transition-colors inline-flex items-center justify-center gap-2"
            >
              Send inquiry
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <p className="mt-3 text-xs text-ink-faint">Opens your email client, prefilled. Prefer direct? {CONTACT_EMAIL}</p>
          </motion.form>

          {/* Direct contact + availability + recruiter path */}
          <motion.div {...FADE_UP} whileInView="animate" initial="initial" viewport={viewportOnce} transition={DEFAULT_TRANSITION} className="space-y-6">
            <div className="card p-6">
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-sm text-ink">Open to full-time roles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span className="text-sm text-ink">Available for freelance projects</span>
                </div>
              </div>
              <p className="text-xs text-ink-faint mb-4 font-mono">On-site · hybrid · remote &nbsp;·&nbsp; Yerevan, GMT+4</p>
              <ul className="space-y-3 pt-4 border-t border-line-soft">
                {CONTACT_INFO.map((info) => (
                  <li key={info.label} className="flex items-center gap-3">
                    <span className="text-accent" aria-hidden="true">{info.icon}</span>
                    <div className="flex-1 min-w-0">
                      {info.url ? (
                        <a href={info.url} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent transition-colors break-words text-sm" aria-label={`${info.label}: ${info.value}`}>
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-ink text-sm break-words">{info.value}</p>
                      )}
                    </div>
                    {info.copyable && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(info.value, info.label)}
                        className="p-1.5 hover:bg-surface-2 rounded-lg transition-colors shrink-0"
                        aria-label={copied === info.label ? `${info.label} copied` : `Copy ${info.label}`}
                      >
                        {copied === info.label ? <CheckIcon /> : <CopyIcon />}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-sm font-semibold text-ink mb-3">Languages</h3>
              <div className="space-y-3">
                {LANGUAGES.map(({ name, proficiency }, index) => (
                  <div key={name}>
                    <div className="flex justify-between mb-1.5">
                      <p className="text-ink-muted text-sm">{name}</p>
                      <p className="text-xs text-ink-faint font-mono tnum">{proficiency}%</p>
                    </div>
                    <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden" role="progressbar" aria-label={`${name} proficiency`} aria-valuenow={proficiency} aria-valuemin={0} aria-valuemax={100}>
                      <motion.div
                        className="bg-accent h-1.5 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={viewportOnce}
                        transition={{ type: 'spring', stiffness: 50, damping: 15, delay: index * 0.12 }}
                        style={{ width: `${proficiency}%`, transformOrigin: 'left' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Résumé */}
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-ink mb-1">Résumé</h3>
              <p className="text-sm text-ink-muted mb-4">Full history and stack, one page.</p>
              <a
                href={CV_PATH}
                download
                className="inline-flex items-center px-5 py-2.5 rounded-lg font-medium border border-line text-ink hover:border-accent-line hover:text-accent-strong transition-colors text-sm"
                aria-label="Download CV as PDF"
              >
                <DownloadIcon />
                Download CV (PDF)
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
