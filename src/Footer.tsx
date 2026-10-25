/*
  Footer.

  Marlin's structure: a CTA band across the top, a rule, the brand column
  beside three link columns, a legal bar, and the oversized wordmark fading
  out at the bottom. Marlin's newsletter slot becomes the booking action,
  since that is the one thing a salon visitor came to do.
*/

import Logo from './Logo'
import { AREA, PHONE, PHONE_TEL, EMAIL, INSTAGRAM, FACEBOOK, NAME, PAGES, wa, url } from './site'
import { Chat, Phone } from './icons'

const COLUMNS = [
  {
    head: 'Explore',
    links: [{ t: 'Home', href: url() }, ...PAGES.map((p) => ({ t: p.t, href: p.href }))],
  },
  {
    head: 'Contact',
    links: [
      { t: 'WhatsApp', href: wa() },
      { t: `Call ${PHONE}`, href: `tel:${PHONE_TEL}` },
      { t: 'Email', href: `mailto:${EMAIL}` },
    ],
  },
  {
    head: 'Follow',
    links: [
      { t: 'Instagram', href: INSTAGRAM },
      { t: 'Facebook', href: FACEBOOK },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0709] px-4 pt-6 md:px-6">
      <div className="mx-auto max-w-[1312px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#1d141a] to-[#120d10] px-6 pt-12 pb-2 md:px-14 md:pt-14">
        {/* ---- CTA band ---- */}
        <div className="flex flex-wrap items-end gap-10">
          <div className="min-w-0 flex-[1_1_420px]">
            <span className="label inline-flex items-center gap-2 rounded-full border border-white/16 px-3.5 py-[7px] text-white/80">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-magenta" />
              {AREA}
            </span>
            <h2 className="display mt-5 mb-0 text-[36px] leading-[1.05] md:text-[48px]">
              Your next style, <em className="font-normal text-blush">one message away.</em>
            </h2>
            <p className="mt-3.5 mb-0 max-w-[440px] text-[15px] leading-6 text-white/65">
              Send a photo of the look you want and we'll reply with a price and the next open time.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="label btn btn-accent">
              <Chat size={18} />
              Book on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={`tel:${PHONE_TEL}`} className="label btn btn-ghost">
              <Phone size={16} />
              {PHONE}
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="mt-11 mb-10 h-px bg-white/10" />

        {/* ---- brand + link columns ---- */}
        <div className="flex flex-wrap gap-12">
          <div className="flex-[1_1_300px]">
            <Logo />
            <p className="mt-4 mb-0 max-w-[280px] text-[14px] leading-[22px] text-white/60">
              Braids, cornrows and protective styles for every hair type, made for the African market.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.head} aria-label={col.head} className="flex-[0_1_170px]">
              <div className="label mb-4 text-white/50">{col.head}</div>
              <ul className="m-0 list-none p-0">
                {col.links.map((l) => {
                  const ext = l.href.startsWith('http')
                  return (
                    <li key={l.t}>
                      <a
                        href={l.href}
                        target={ext ? '_blank' : undefined}
                        rel={ext ? 'noopener noreferrer' : undefined}
                        className="footer-link"
                      >
                        {l.t}
                        {ext && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---- legal bar ---- */}
        <div className="mt-10 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-5 pb-7 text-[13px] text-white/50">
          <span>&#169; 2026 {NAME}. All rights reserved.</span>
          <span>{AREA}</span>
        </div>

        {/* ---- the wordmark, fading into the panel ---- */}
        <div aria-hidden="true" className="footer-mark display">
          Samu’s
        </div>
      </div>
      <div className="h-6" />
    </footer>
  )
}
