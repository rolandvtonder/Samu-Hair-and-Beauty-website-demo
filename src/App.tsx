import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { SCROLL_VH, P, SEQ, SEQ_BAND, INTRO, INTRO_MS, span, ramp, lerp } from './scroll'
import { pick, MOBILE, type Frame } from './layout'
import { wa, url, img } from './site'
import { ArrowUpRight, Chat } from './icons'
import Shell from './Shell'
import Reviews from './Reviews'

/*
  Samu's Hair & Beauty — a scroll-driven stage over the salon's own work.

  Built on the Marlin choreography (see scroll.ts), with one substitution:
  Marlin scrubbed two video clips, and the salon has photographs, so the
  "footage" is a sequence of four photos that crossfade at fixed points on
  the scrollbar and ease out of a slow zoom while they hold.

  The photos are phone shots, 1000px tall at most. Stretched full-bleed they
  go soft, so each one appears twice: sharp, inside an arched frame that
  travels between the three groups, and heavily blurred across the whole
  viewport behind it, where softness is the point.
*/

const SEQUENCE = [
  { src: 'feed-in-braids-portrait', pos: '42% 50%' },
  { src: 'blue-spring-twists', pos: '50% 45%' },
  { src: 'goddess-locs-smile', pos: '38% 40%' },
  { src: 'cornrow-updo-salon', pos: '50% 45%' },
]

const TILES = [
  { art: 'blonde-knotless', pos: '50% 55%', label: ['Knotless', 'Braids'] },
  { art: 'cornrow-design', pos: '50% 40%', label: ['Cornrows', '& Updos'] },
  { art: 'bob-box-braids', pos: '50% 35%', label: ['Box', 'Braids'] },
  { art: 'kids-beaded-cornrows', pos: '40% 35%', label: ["Kids'", 'Styles'] },
]

const SPECIALTIES = ['Knotless & box braids', 'Cornrows & updos', 'Faux locs & twists', 'Wigs, silk press & colour']

const INK = '14,10,13'

const px = (n: number) => `${n}px`
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  position: 'absolute',
  left: px(x),
  top: px(y),
  ...(w != null ? { width: px(w) } : null),
  ...(h != null ? { height: px(h) } : null),
})

/** Smoothstep, so the groups and frame settle instead of stopping dead. */
const ease = (t: number) => t * t * (3 - 2 * t)

/** Reveals behind a clip mask, rising. Spans, so it can sit inside an <h1> or <p>. */
function Mask({ t, children, style }: { t: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{ ...style, display: 'block', overflow: 'hidden' }}>
      <span style={{ display: 'block', height: '100%', transform: `translateY(${(1 - t) * 115}%)`, willChange: 'transform' }}>
        {children}
      </span>
    </span>
  )
}

/** Milliseconds since the fonts landed, capped at INTRO_MS. Drives the hero's load-in. */
function useIntroClock(skip: boolean) {
  const [ms, setMs] = useState(skip ? INTRO_MS : 0)
  useEffect(() => {
    if (skip) {
      setMs(INTRO_MS)
      return
    }
    let raf = 0
    let started = false
    const start = () => {
      if (started) return
      started = true
      const t0 = performance.now()
      const tick = (now: number) => {
        const e = now - t0
        setMs(Math.min(e, INTRO_MS))
        if (e < INTRO_MS) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    /* wait for the serif so the words don't rise in a fallback face, but never
       hold the headline back for more than 800ms on a slow font request */
    document.fonts.ready.then(start)
    const fallback = window.setTimeout(start, 800)
    return () => {
      started = true
      window.clearTimeout(fallback)
      cancelAnimationFrame(raf)
    }
  }, [skip])
  return ms
}

export default function App() {
  const wrap = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const [view, setView] = useState({ w: 1440, h: 810 })
  const [p, setP] = useState(0)
  const ms = useIntroClock(reduce)

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(v))
  useEffect(() => setP(scrollYProgress.get()), [scrollYProgress])

  useLayoutEffect(() => {
    const el = stage.current
    if (!el) return
    const fit = () => setView({ w: el.clientWidth, h: el.clientHeight })
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const L = pick(view.w, view.h)
  const mobile = L === MOBILE
  const scale = Math.min(view.w / L.W, view.h / L.H)
  const offX = (view.w - L.W * scale) / 2
  const offY = (view.h - L.H * scale) / 2

  const m1 = ramp(p, P.move1)
  const m2 = ramp(p, P.move2)
  const e1 = ease(m1)
  const e2 = ease(m2)
  const at = (i: 0 | 1 | 2) => (m2 > 0.5 ? i === 2 : m1 > 0.5 ? i === 1 : i === 0)

  /* the travelling frame, interpolated across its three keyframes */
  const f = (k: keyof Frame) => lerp(lerp(L.frame[0][k], L.frame[1][k], e1), L.frame[2][k], e2)

  /* group positions */
  const yHero = lerp(L.hero.y[0], L.hero.y[1], e1)
  const ySvc = lerp(lerp(L.services.y[0], L.services.y[1], e1), L.services.y[2], e2)
  const yAbout = lerp(lerp(L.about.y[0], L.about.y[1], e1), L.about.y[2], e2)

  /* photo i fades in over photo i-1 at SEQ[i-1]; it zooms out while it holds */
  const show = (i: number) => (i === 0 ? 1 : ramp(p, [SEQ[i - 1] - SEQ_BAND, SEQ[i - 1] + SEQ_BAND]))
  const zoom = (i: number) => {
    if (reduce) return 1
    const a = i === 0 ? 0 : SEQ[i - 1] - SEQ_BAND
    const b = i === SEQ.length ? 1 : SEQ[i] + SEQ_BAND
    return 1.14 - 0.14 * ramp(p, [a, b])
  }

  const rv = (w: readonly [number, number]) => span(ms, w)
  const cardT = rv(INTRO.card)

  const H = L.hero
  const S = L.services
  const A = L.about

  return (
    <Shell current="home">
        <div ref={wrap} style={{ height: `${SCROLL_VH}vh`, background: 'var(--color-ink)' }}>
          <div ref={stage} style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>
            {/* ---- the ambient layer: the same sequence, blurred, viewport-wide ---- */}
            <div aria-hidden="true" style={{ position: 'absolute', inset: '-8%' }}>
              {SEQUENCE.map((s, i) => (
                <img
                  key={s.src}
                  src={img(s.src)}
                  alt=""
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: show(i),
                    filter: 'blur(44px) saturate(1.25) brightness(0.55)',
                  }}
                />
              ))}
            </div>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(46% 60% at 82% 18%, rgba(232,69,159,0.20) 0%, rgba(232,69,159,0) 70%), rgba(${INK},0.45)`,
              }}
            />

            {/* section scrims, viewport-wide */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: mobile
                  ? `linear-gradient(180deg, rgba(${INK},0.1) 30%, rgba(${INK},0.88) 62%, rgba(${INK},0.92) 100%)`
                  : `linear-gradient(90deg, rgba(${INK},0.88) 0%, rgba(${INK},0.55) 38%, rgba(${INK},0) 66%)`,
                opacity: 1 - m1,
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(70% 60% at 50% 80%, rgba(${INK},0.86) 0%, rgba(${INK},0.4) 58%, rgba(${INK},0) 100%)`,
                opacity: m1 * (1 - m2),
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(180deg, rgba(${INK},0) 34%, rgba(${INK},0.82) 68%, rgba(${INK},0.9) 100%)`,
                opacity: m2,
              }}
            />

            {/* ---- the artboard ---- */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: px(L.W),
                height: px(L.H),
                transform: `translate(${offX}px, ${offY}px) scale(${scale})`,
                transformOrigin: 'top left',
              }}
            >
              {/* the travelling frame */}
              <div
                aria-hidden="true"
                style={{
                  ...box(f('x'), f('y'), f('w'), f('h')),
                  borderRadius: `${f('rt')}px ${f('rt')}px ${f('rb')}px ${f('rb')}px`,
                  overflow: 'hidden',
                  opacity: f('o'),
                  boxShadow: '0 40px 80px -30px rgba(0,0,0,0.75)',
                }}
              >
                {SEQUENCE.map((s, i) => (
                  <img
                    key={s.src}
                    src={img(s.src)}
                    alt=""
                    fetchPriority={i === 0 ? 'high' : undefined}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: s.pos,
                      opacity: show(i),
                      transform: `scale(${zoom(i)})`,
                      willChange: 'transform, opacity',
                    }}
                  />
                ))}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    border: '1px solid rgba(255,255,255,0.22)',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* ---- index rail ---- */}
              {L.rail && (
                <div aria-hidden="true" style={box(L.rail.x, L.rail.y, 40, 160)}>
                  {['01', '02', '03'].map((n, i) => (
                    <div
                      key={n}
                      className="label"
                      style={{
                        position: 'absolute',
                        top: px(i * 64),
                        right: 0,
                        fontSize: px(14),
                        color: at(i as 0 | 1 | 2) ? 'var(--color-magenta)' : 'rgba(255,255,255,0.4)',
                        transition: 'color 300ms',
                      }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              )}

              {/* ================= the hero ================= */}
              <section
                aria-label="Welcome"
                inert={!at(0)}
                style={{ ...box(H.x, 0, H.w, L.H), transform: `translateY(${yHero}px)`, willChange: 'transform' }}
              >
                <h1 aria-label="Hair as Art." style={{ margin: 0 }}>
                  {['Hair', 'as', 'Art.'].map((w, i) => (
                    <Mask
                      key={w}
                      t={rv([INTRO.word, INTRO.word2, INTRO.word3][i])}
                      style={{ position: 'absolute', left: 0, top: px(H.tops[i] - 10), width: px(H.w), height: px(H.line + 20) }}
                    >
                      <span
                        aria-hidden="true"
                        className="display"
                        style={{
                          display: 'block',
                          fontSize: px(H.size),
                          lineHeight: px(H.line + 20),
                          fontStyle: i === 1 ? 'italic' : 'normal',
                          fontWeight: i === 1 ? 400 : 500,
                          color: i === 1 ? 'var(--color-blush)' : '#fff',
                          paddingLeft: i === 1 ? px(H.size * 0.04) : 0,
                        }}
                      >
                        {w}
                      </span>
                    </Mask>
                  ))}
                </h1>

                <p style={{ margin: 0 }}>
                  {H.body.lines.map((line, i) => (
                    <Mask
                      key={line}
                      t={rv([INTRO.body1, INTRO.body2, INTRO.body3][i])}
                      style={{ position: 'absolute', left: 0, top: px(H.body.top + i * H.body.line), width: px(H.body.w), height: px(H.body.line + 4) }}
                    >
                      <span style={{ display: 'block', fontSize: px(H.body.size), lineHeight: px(H.body.line), color: 'rgba(255,255,255,0.84)' }}>
                        {line}{' '}
                      </span>
                    </Mask>
                  ))}
                </p>

                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: px(H.buttons),
                    opacity: rv(INTRO.body3),
                    display: 'flex',
                    gap: px(12),
                  }}
                >
                  <a href={wa()} target="_blank" rel="noopener noreferrer" className="label btn btn-accent" style={{ height: px(mobile ? 48 : 54), padding: `0 ${px(mobile ? 20 : 26)}`, fontSize: px(mobile ? 11 : 12) }}>
                    <Chat size={mobile ? 16 : 18} />
                    Book on WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <a href={url('gallery/')} className="label btn btn-ghost" style={{ height: px(mobile ? 48 : 54), padding: `0 ${px(mobile ? 18 : 24)}`, fontSize: px(mobile ? 11 : 12) }}>
                    See the work
                  </a>
                </div>

                {/* the specialities card, where Marlin had its telemetry */}
                {H.card && (
                  <div
                    className="glass"
                    style={{
                      ...box(H.card.x, H.card.y, H.card.w, H.card.h),
                      borderRadius: px(36),
                      opacity: cardT,
                      transform: `translateY(${(1 - cardT) * 28}px)`,
                    }}
                  >
                    <div style={{ position: 'absolute', inset: `${px(26)} ${px(28)}` }}>
                      <div className="label" style={{ fontSize: px(11), color: 'rgba(255,255,255,0.6)' }}>
                        Specialising in
                      </div>
                      <ul style={{ listStyle: 'none', margin: `${px(14)} 0 0`, padding: 0 }}>
                        {SPECIALTIES.map((s, i) => (
                          <li
                            key={s}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: px(12),
                              height: px(34),
                              fontSize: px(15),
                              color: 'rgba(255,255,255,0.92)',
                              borderTop: i ? '1px solid rgba(255,255,255,0.12)' : undefined,
                              opacity: span(ms, [INTRO.card[0] + 120 * i, INTRO.card[0] + 120 * i + 600]),
                            }}
                          >
                            <span aria-hidden="true" style={{ width: px(6), height: px(6), borderRadius: '50%', background: 'var(--color-magenta)', flex: 'none' }} />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <div className="label" style={{ position: 'absolute', left: 0, bottom: 0, fontSize: px(10), color: 'rgba(255,255,255,0.55)' }}>
                        All hair types welcome
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* ================= services ================= */}
              <section
                aria-labelledby="stage-services"
                inert={!at(1)}
                style={{ ...box(S.x, 0, S.w, L.H), transform: `translateY(${ySvc}px)`, willChange: 'transform' }}
              >
                {TILES.map((c, i) => {
                  const t = reduce ? 1 : span(p, [P.tiles[0] + i * 0.02, P.tiles[1] + i * 0.02])
                  const [x, y] = S.tiles[i]
                  const dot = Math.round(S.tile.h * 0.3)
                  return (
                    <a
                      key={c.art}
                      href={url('services/')}
                      className="tile"
                      style={{
                        ...box(x, y, S.tile.w, S.tile.h),
                        borderRadius: px(S.tile.r),
                        opacity: t,
                        transform: `translateY(${(1 - t) * 40}px)`,
                      }}
                    >
                      <span style={{ position: 'absolute', inset: 0, borderRadius: px(S.tile.r), overflow: 'hidden' }}>
                        <img
                          src={img(c.art)}
                          alt=""
                          loading="lazy"
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: c.pos }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(150deg, rgba(${INK},0.85) 0%, rgba(${INK},0.35) 52%, rgba(${INK},0.05) 100%)`,
                          }}
                        />
                      </span>
                      <span
                        style={{ position: 'absolute', inset: 0, borderRadius: px(S.tile.r), border: '1px solid rgba(255,255,255,0.28)', pointerEvents: 'none' }}
                      />
                      <span
                        className="display"
                        style={{
                          position: 'absolute',
                          left: px(S.tile.r * 0.5),
                          top: px(S.tile.r * 0.62),
                          fontSize: px(S.tile.label),
                          lineHeight: px(S.tile.label * 1.2),
                          fontWeight: 600,
                        }}
                      >
                        {c.label[0]}
                        <br />
                        {c.label[1]}
                      </span>
                      <span
                        aria-hidden="true"
                        className="tile-dot"
                        style={{
                          position: 'absolute',
                          right: px(S.tile.r * 0.36),
                          top: px(S.tile.r * 0.36),
                          width: px(dot),
                          height: px(dot),
                        }}
                      >
                        <ArrowUpRight size={Math.round(dot * 0.36)} />
                      </span>
                    </a>
                  )
                })}

                <h2
                  id="stage-services"
                  className="display"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: px(S.title.top),
                    width: px(S.w),
                    margin: 0,
                    fontSize: px(S.title.size),
                    lineHeight: px(S.title.line),
                    textAlign: 'center',
                  }}
                >
                  Every strand, <em style={{ fontWeight: 400, color: 'var(--color-blush)' }}>considered.</em>
                </h2>
                <p
                  style={{
                    position: 'absolute',
                    left: px((S.w - S.text.w) / 2),
                    top: px(S.text.top),
                    width: px(S.text.w),
                    margin: 0,
                    fontSize: px(S.text.size),
                    lineHeight: px(S.text.line),
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.86)',
                  }}
                >
                  From knotless braids to a silk press, every style is planned around your hair, your length and the look
                  you're after, then done with patience.
                </p>
              </section>

              {/* ================= about ================= */}
              <section
                aria-labelledby="stage-about"
                inert={!at(2)}
                style={{ ...box(A.x, 0, A.w, L.H), transform: `translateY(${yAbout}px)`, willChange: 'transform' }}
              >
                <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: px(A.rule), width: px(56), height: px(2), background: 'var(--color-magenta)' }} />
                <h2
                  id="stage-about"
                  className="display"
                  style={{ position: 'absolute', left: 0, top: px(A.head.top), width: px(A.head.w), margin: 0, fontSize: px(A.head.size), lineHeight: px(A.head.line) }}
                >
                  Made for
                  <br />
                  <em style={{ fontWeight: 400, color: 'var(--color-blush)' }}>African hair.</em>
                </h2>
                <p
                  style={{
                    position: 'absolute',
                    left: px(A.para.x),
                    top: px(A.para.top),
                    width: px(A.para.w),
                    margin: 0,
                    fontSize: px(A.para.size),
                    lineHeight: px(A.para.line),
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  Samu started Samu's Hair &amp; Beauty after years of searching for beauty products and services that
                  really worked for the African market. The salon in Saxonwold, Rosebank is the answer: every hair type
                  understood, every style taken seriously.
                </p>
                <a
                  href={url('about/')}
                  className="label text-link"
                  style={{ position: 'absolute', left: px(A.para.x), top: px(A.link), fontSize: px(mobile ? 11 : 12) }}
                >
                  Meet Samu <ArrowUpRight size={mobile ? 14 : 16} />
                </a>
              </section>
            </div>
          </div>
        </div>
        <Reviews />
    </Shell>
  )
}
