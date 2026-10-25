/*
  The navbar, shared by every page.

  Fixed, outside the artboard, at natural size, as in Marlin. Under 640px the
  centre links no longer fit, and now that each section is its own page they
  cannot simply be dropped, so they move into a full-screen menu behind a
  Menu button.
*/

import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { PAGES, wa, url, type PageId } from './site'
import { Chat } from './icons'

export default function Nav({ current }: { current: PageId }) {
  const [open, setOpen] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    panel.current?.querySelector('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    /* the menu is phone-only; if the window widens past it, close it */
    const mq = window.matchMedia('(min-width: 641px)')
    const onWide = () => mq.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onWide)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onWide)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="site-nav">
        <a href={url()} aria-label="Samu's Hair & Beauty, home" style={{ textDecoration: 'none' }}>
          <Logo />
        </a>
        <nav aria-label="Main" className="nav-links">
          {PAGES.map((n) => (
            <a key={n.id} href={n.href} className="label nav-link" aria-current={n.id === current ? 'page' : undefined}>
              {n.t}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={wa()} target="_blank" rel="noopener noreferrer" className="label btn btn-accent btn-sm">
            Book
            <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
          <button
            ref={btn}
            type="button"
            className="label menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true" className={`menu-icon${open ? ' is-open' : ''}`}>
              <span />
              <span />
            </span>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" ref={panel} className="mobile-menu">
          <nav aria-label="Main">
            <ul className="m-0 list-none p-0">
              {[{ id: 'home' as const, t: 'Home', href: url() }, ...PAGES].map((n, i) => (
                <li key={n.id} className="mobile-menu-item" style={{ animationDelay: `${60 * i}ms` }}>
                  <a href={n.href} className="display" aria-current={n.id === current ? 'page' : undefined}>
                    {n.t}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href={wa()} target="_blank" rel="noopener noreferrer" className="label btn btn-accent mt-10 self-start">
            <Chat size={18} />
            Book on WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
    </>
  )
}
