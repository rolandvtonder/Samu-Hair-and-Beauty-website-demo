import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ServicesPage, GalleryPage, ReviewsPage, AboutPage } from './pages.tsx'
import './index.css'

/* Every HTML page loads this file and names itself in <body data-page>. */
const PAGES: Record<string, ComponentType> = {
  home: App,
  services: ServicesPage,
  gallery: GalleryPage,
  reviews: ReviewsPage,
  about: AboutPage,
}
const Page = PAGES[document.body.dataset.page ?? 'home'] ?? App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
