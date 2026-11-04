import { motion } from 'motion/react'
import { Globe } from 'lucide-react'
import { LINKS } from '../links.js'

const NAV = [
  { label: 'Возможности', href: `${LINKS.source}#readme` },
  { label: 'Релизы', href: LINKS.releases },
  { label: 'О проекте', href: LINKS.source },
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-20 px-6 py-6 w-full"
    >
      <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-lg">TsundereGram</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-white/80 text-sm font-medium">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={LINKS.channel}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline text-white hover:text-white/80 transition-colors text-sm font-medium cursor-pointer"
          >
            Канал
          </a>
          <a
            href={LINKS.apk}
            className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer"
          >
            Скачать
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
