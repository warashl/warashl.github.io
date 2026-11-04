import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check, Monitor, Smartphone } from 'lucide-react'
import { LINKS } from '../links.js'

const PICK_TEXT = 'Выберите платформу'
const DONE_TEXT = 'Загрузка началась!'

function useTypewriter(text, active) {
  const [typed, setTyped] = useState('')
  useEffect(() => {
    if (!active) {
      setTyped('')
      return
    }
    setTyped('')
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 60)
    return () => clearInterval(id)
  }, [text, active])
  return typed
}

function detectPlatform() {
  if (typeof navigator === 'undefined') return 'android'
  return /Windows/i.test(navigator.userAgent) ? 'windows' : 'android'
}

export default function Hero() {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const [platform, setPlatform] = useState(detectPlatform)
  const timer = useRef(0)
  const typed = useTypewriter(done ? DONE_TEXT : PICK_TEXT, open)

  useEffect(() => () => clearTimeout(timer.current), [])

  const start = (target) => {
    setPlatform(target)
    setDone(true)
    window.location.href = target === 'windows' ? LINKS.windows : LINKS.apk
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setDone(false)
      setOpen(false)
    }, 4000)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!done) start(platform)
  }

  const chip = (id, Icon, label) => (
    <button
      type="button"
      onClick={() => !done && start(id)}
      aria-label={label}
      title={label}
      className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-300 cursor-pointer ${
        platform === id ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  )

  return (
    <section className="relative flex-1 flex flex-col items-center justify-center px-6">
      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center w-full gap-12">
        <div className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase mb-4"
          >
            Неофициальный клиент Telegram для Android и Windows
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-4xl md:text-[64px] font-medium tracking-[-0.01em] leading-[1.1] mb-6 bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent max-w-4xl"
          >
            Тот самый Telegram, только <br className="hidden md:block" />
            с характером и кучей фишек
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="min-h-[50px] mt-2 flex items-center justify-center w-full"
          >
            <AnimatePresence mode="wait">
              {!open ? (
                <motion.button
                  key="button"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(true)}
                  className="px-10 py-3 text-[14px] font-medium border border-white/10 rounded-full hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300 text-white/90 backdrop-blur-sm cursor-pointer"
                >
                  Скачать бесплатно
                </motion.button>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={onSubmit}
                  className="flex items-center gap-2 pl-5 pr-1.5 py-1.5 text-[14px] font-medium border border-white/20 rounded-full bg-white/[0.02] backdrop-blur-sm w-full max-w-[360px] focus-within:border-white/40 transition-colors duration-300"
                >
                  <input
                    readOnly
                    autoFocus
                    aria-label="Выбор платформы"
                    placeholder={typed}
                    className="flex-1 min-w-0 bg-transparent text-white placeholder-white/45 outline-none cursor-default"
                  />
                  {chip('android', Smartphone, 'Android — APK')}
                  {chip('windows', Monitor, 'Windows — установщик')}
                  <button
                    type="submit"
                    aria-label="Скачать"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-black hover:bg-white/90 transition-colors cursor-pointer"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {done ? (
                        <motion.span key="check" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.2 }}>
                          <Check className="w-4 h-4" />
                        </motion.span>
                      ) : (
                        <motion.span key="arrow" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.2 }}>
                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <a
            href={LINKS.releases}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white/40 transition-colors duration-300 text-[13px] font-medium tracking-wide"
          >
            Что нового в релизах
          </a>
        </motion.div>
      </div>
    </section>
  )
}
