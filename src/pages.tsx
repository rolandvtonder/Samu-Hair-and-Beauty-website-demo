/*
  The Services, Gallery and About pages.

  Each one opens on the same page hero: the home stage's look carried over
  without the scroll choreography, so moving between pages feels like the
  same place. A blurred copy of the page's photo fills the background, the
  sharp one sits in the arch, and the heading rises in on load.

  Below the hero everything is ordinary flow, a real responsive layout.
*/

import type { ReactNode } from 'react'
import Shell from './Shell'
import Reviews from './Reviews'
import { SERVICES, GALLERY, AREA, PHONE, EMAIL, INSTAGRAM, FACEBOOK, MAPS, wa, img } from './site'
import { ArrowUpRight, Chat, Mail, Pin, Instagram, Facebook } from './icons'

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="label inline-flex items-center gap-2 text-white/75">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-magenta" />
      {children}
    </p>
  )
}

function PageHero({
  eyebrow,
  title,
  intro,
  photo,
  pos = '50% 30%',
  children,
}: {
  eyebrow: string
  title: ReactNode
  intro: ReactNode
  photo: string
  pos?: string
  children?: ReactNode
}) {
  return (
    <div className="page-hero">
      <div aria-hidden="true" className="page-hero-bg">
        <img src={img(photo)} alt="" />
      </div>
      <div className="relative mx-auto grid max-w-[1248px] items-end gap-12 px-6 pt-36 pb-16 md:grid-cols-[minmax(0,1fr)_320px] md:px-12 md:pt-44 md:pb-24">
        <div>
          <div className="rise" style={{ animationDelay: '0ms' }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 className="display rise mt-5 text-[52px] leading-[1] md:text-[96px]" style={{ animationDelay: '90ms' }}>
            {title}
          </h1>
          <div className="rise mt-6 max-w-[540px] text-[17px] leading-7 text-white/80" style={{ animationDelay: '200ms' }}>
            {intro}
          </div>
          {children && (
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '300ms' }}>
              {children}
            </div>
          )}
        </div>
        <div className="arch rise hidden md:block" style={{ animationDelay: '160ms' }}>
          <img src={img(photo)} alt="" fetchPriority="high" style={{ objectPosition: pos }} />
        </div>
      </div>
    </div>
  )
}

function BookButton({ label = 'Book on WhatsApp', service }: { label?: string; service?: string }) {
  return (
    <a href={wa(service)} target="_blank" rel="noopener noreferrer" className="label btn btn-accent">
      <Chat size={18} />
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

/* ================= Services ================= */

const STEPS = [
  { head: 'Send a photo', body: 'Message us on WhatsApp with a picture of the style you want and a photo of your hair as it is now.' },
  { head: 'Get a quote', body: "We'll reply with a price for your hair and length, how long it will take, and the next open time." },
  { head: 'Take the chair', body: 'Come to the salon in Saxonwold, Rosebank, relax, and leave with the style you came for.' },
]

export function ServicesPage() {
  return (
    <Shell current="services">
      <PageHero
        eyebrow="Services"
        title={
          <>
            What we <em className="font-normal text-blush">do.</em>
          </>
        }
        intro={
          <p>
            Every style is quoted to your hair, its length and the look you want, so there's no price list here. Send
            us a photo on WhatsApp and we'll come back with a price and a time.
          </p>
        }
        photo="cornrows-afro-ponytail"
        pos="45% 40%"
      >
        <BookButton label="Ask for a quote" />
      </PageHero>

      <section aria-labelledby="menu-title" className="bg-ink">
        <div className="mx-auto max-w-[1248px] px-6 py-20 md:px-12 md:py-28">
          <h2 id="menu-title" className="sr-only">
            Our services
          </h2>
          <ol className="grid list-none gap-x-14 p-0 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <li key={s.name} className="flex gap-5 border-t border-white/12 py-7">
                <span aria-hidden="true" className="label pt-2.5 text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="display text-[26px] leading-tight md:text-[28px]">{s.name}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-white/68">{s.note}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="label text-white/55">Enquire for pricing</span>
                    <a href={wa(s.name.toLowerCase())} target="_blank" rel="noopener noreferrer" className="label text-link">
                      Book <span className="sr-only">{s.name} on WhatsApp (opens in a new tab)</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="how-title" className="bg-plum">
        <div className="mx-auto max-w-[1248px] px-6 py-20 md:px-12 md:py-28">
          <Eyebrow>How booking works</Eyebrow>
          <h2 id="how-title" className="display mt-5 text-[40px] leading-[1.05] md:text-[60px]">
            Three steps, <em className="font-normal text-blush">one message.</em>
          </h2>
          <ol className="mt-12 grid list-none gap-4 p-0 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.head} className="step-card">
                <span aria-hidden="true" className="display text-[56px] leading-none text-magenta">
                  {i + 1}
                </span>
                <h3 className="display mt-6 text-[26px] leading-tight">{s.head}</h3>
                <p className="mt-2 text-[15px] leading-6 text-white/70">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Shell>
  )
}

/* ================= Gallery ================= */

export function GalleryPage() {
  return (
    <Shell current="gallery">
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            The <em className="font-normal text-blush">work.</em>
          </>
        }
        intro={<p>Recent braids, cornrows, updos and protective styles, straight from the salon chair.</p>}
        photo="goddess-locs-yellow"
        pos="50% 30%"
      >
        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="label btn btn-ghost">
          <Instagram size={16} />
          More on @samu_hair_art
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </PageHero>

      <section aria-labelledby="grid-title" className="bg-ink">
        <div className="mx-auto max-w-[1248px] px-6 py-16 md:px-12 md:py-24">
          <h2 id="grid-title" className="sr-only">
            Photos of our work
          </h2>
          <ul className="list-none columns-2 gap-3 p-0 md:columns-3 md:gap-4 lg:columns-4">
            {GALLERY.map((g) => (
              <li key={g.src} className="gallery-item mb-3 break-inside-avoid md:mb-4">
                <img src={img(g.src)} alt={g.alt} width={g.w} height={g.h} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Shell>
  )
}

/* ================= Reviews ================= */

export function ReviewsPage() {
  return (
    <Shell current="reviews">
      <PageHero
        eyebrow="Google reviews"
        title={
          <>
            In our clients' <em className="font-normal text-blush">words.</em>
          </>
        }
        intro={<p>What clients have said about Samu and the salon, in their own words, from Google.</p>}
        photo="side-cornrow-bob"
        pos="50% 30%"
      >
        <BookButton />
      </PageHero>
      <Reviews variant="page" />
    </Shell>
  )
}

/* ================= About ================= */

export function AboutPage() {
  const visit = [
    { icon: <Pin />, head: 'Visit', body: AREA, href: MAPS, cta: 'Get directions' },
    { icon: <Chat />, head: 'Book', body: `WhatsApp ${PHONE}`, href: wa(), cta: 'Start a chat' },
    { icon: <Mail />, head: 'Email', body: EMAIL, href: `mailto:${EMAIL}`, cta: 'Send an email' },
  ]
  return (
    <Shell current="about">
      <PageHero
        eyebrow="About Samu"
        title={
          <>
            Beauty that <em className="font-normal text-blush">actually works</em> for you.
          </>
        }
        intro={<p>A salon in Saxonwold, Rosebank, made for African hair and every hair type.</p>}
        photo="cornrows-gold-cuffs"
        pos="50% 40%"
      />

      <section aria-labelledby="story-title" className="bg-ink">
        <div className="mx-auto grid max-w-[1248px] gap-12 px-6 py-20 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:px-12 md:py-28">
          <div className="about-photo">
            <img src={img('cornrow-puffs-salon')} alt="Cornrow parting with afro puffs, being finished in the salon chair" width={960} height={1200} loading="lazy" />
          </div>

          <div className="self-center">
            <Eyebrow>The story</Eyebrow>
            <h2 id="story-title" className="display mt-5 text-[40px] leading-[1.05] md:text-[56px]">
              Made for <em className="font-normal text-blush">African hair.</em>
            </h2>
            <div className="mt-6 max-w-[560px] space-y-4 text-[16px] leading-7 text-white/75">
              <p>
                Samu started Samu's Hair &amp; Beauty after years of looking for beauty products and services that really
                worked for the African market, and not finding them.
              </p>
              <p>
                So Samu built the salon that was missing. In Saxonwold, Rosebank, every hair type is welcome and every
                style, from a quick cornrow refresh to waist-length knotless braids, gets the same care and attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Reviews />

      <section aria-labelledby="visit-title" className="bg-ink">
        <div className="mx-auto max-w-[1248px] px-6 py-20 md:px-12 md:py-28">
          <Eyebrow>Visit &amp; contact</Eyebrow>
          <h2 id="visit-title" className="display mt-5 text-[40px] leading-[1.05] md:text-[56px]">
            Come and <em className="font-normal text-blush">see us.</em>
          </h2>
          <ul className="mt-12 grid list-none gap-4 p-0 sm:grid-cols-3">
            {visit.map((v) => (
              <li key={v.head}>
                <a
                  href={v.href}
                  target={v.href.startsWith('http') ? '_blank' : undefined}
                  rel={v.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="visit-card"
                >
                  <span className="text-magenta">{v.icon}</span>
                  <span className="label mt-4 block text-white/55">{v.head}</span>
                  <span className="mt-1 block text-[15px] leading-6 text-white/90 [overflow-wrap:anywhere]">{v.body}</span>
                  <span className="label mt-4 inline-flex items-center gap-1.5 text-white">
                    {v.cta} <ArrowUpRight size={14} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="Instagram (opens in a new tab)">
              <Instagram />
            </a>
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="Facebook (opens in a new tab)">
              <Facebook />
            </a>
          </div>
        </div>
      </section>
    </Shell>
  )
}
