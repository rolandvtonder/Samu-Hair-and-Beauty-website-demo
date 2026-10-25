/* What every page shares: the skip link, the navbar, <main> and the footer. */

import { useEffect, type ReactNode } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import type { PageId } from './site'

export default function Shell({ current, children }: { current: PageId; children: ReactNode }) {
  /* The page is drawn by React after the browser has already looked for the
     #anchor in the URL (e.g. /about/#reviews), so jump to it ourselves. */
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav current={current} />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
