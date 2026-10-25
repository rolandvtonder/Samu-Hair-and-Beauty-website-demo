/*
  Client reviews.

  Two uses: a teaser (the three featured reviews, with its own heading and a
  link on) on the home and About pages, and the full list on the Reviews
  page, where the page hero already carries the heading.

  The first review is set larger, as a pull quote. No overall rating or
  review count is claimed: we only have the reviews in hand, not the
  salon's full Google score.
*/

import { REVIEWS, url } from './site'
import { ArrowUpRight } from './icons'

function Stars() {
  return (
    <span role="img" aria-label="5 out of 5 stars" className="inline-flex gap-1 text-magenta">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
      ))}
    </span>
  )
}

export default function Reviews({ variant = 'teaser' }: { variant?: 'teaser' | 'page' }) {
  const teaser = variant === 'teaser'
  const list = teaser ? REVIEWS.filter((r) => r.featured) : REVIEWS
  const [lead, ...rest] = list
  return (
    <section aria-labelledby="reviews-title" className={teaser ? 'bg-plum' : 'bg-ink'}>
      <div className={`mx-auto max-w-[1248px] px-6 md:px-12 ${teaser ? 'py-20 md:py-28' : 'pt-4 pb-20 md:pb-28'}`}>
        {teaser ? (
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label inline-flex items-center gap-2 text-white/75">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-magenta" />
                Google reviews
              </p>
              <h2 id="reviews-title" className="display mt-5 text-[40px] leading-[1.05] md:text-[60px]">
                In our clients' <em className="font-normal text-blush">words.</em>
              </h2>
            </div>
            <a href={url('reviews/')} className="label text-link">
              Read all reviews <ArrowUpRight size={15} />
            </a>
          </div>
        ) : (
          <h2 id="reviews-title" className="sr-only">
            All reviews
          </h2>
        )}

        <figure className="review-lead">
          <span aria-hidden="true" className="review-mark">
            “
          </span>
          <blockquote className="display m-0 text-[24px] leading-[1.35] font-normal md:text-[34px]">{lead.text}</blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Stars />
            <span className="label text-white/80">{lead.name}</span>
          </figcaption>
        </figure>

        <ul className="mt-4 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((r) => (
            <li key={r.name}>
              <figure className="review-card">
                <Stars />
                <blockquote className="mt-4 mb-0 text-[17px] leading-7 text-white/88">“{r.text}”</blockquote>
                <figcaption className="label mt-5 text-white/65">{r.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
