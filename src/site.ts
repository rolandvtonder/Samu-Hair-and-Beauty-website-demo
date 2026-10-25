/*
  Everything a client reads that is not layout: contact details, the service
  list and the gallery. Edit here, not in the components.
*/

export const NAME = "Samu's Hair & Beauty"
export const AREA = 'Saxonwold, Rosebank, Johannesburg'
export const PHONE = '081 052 3832'
export const PHONE_TEL = '+27810523832'
export const EMAIL = 'samuHairBeauty@gmail.com'
export const INSTAGRAM = 'https://www.instagram.com/samu_hair_art/'
export const FACEBOOK = 'https://www.facebook.com/SamuHairBeautySalon/'
export const MAPS = 'https://www.google.com/maps/search/?api=1&query=Saxonwold%2C+Rosebank%2C+Johannesburg'

/* Every internal link and image goes through these, never a bare "/path".
   The site is served from "/" locally but from "/<repo-name>/" on GitHub
   Pages; Vite sets BASE_URL from the --base the build is given. */
const BASE = import.meta.env.BASE_URL
export const url = (path = '') => BASE + path.replace(/^\//, '')
export const img = (name: string) => url(`assets/${name}.jpg`)

/* The site's pages. Trailing slashes match the folders Vite builds
   (services/index.html), so hosts serve them without a redirect. */
export type PageId = 'home' | 'services' | 'gallery' | 'reviews' | 'about'
export const PAGES: readonly { id: Exclude<PageId, 'home'>; t: string; href: string }[] = [
  { id: 'services', t: 'Services', href: url('services/') },
  { id: 'gallery', t: 'Gallery', href: url('gallery/') },
  { id: 'reviews', t: 'Reviews', href: url('reviews/') },
  { id: 'about', t: 'About', href: url('about/') },
]

/** WhatsApp chat with Samu, message pre-filled. */
export const wa = (service?: string) =>
  `https://wa.me/27810523832?text=${encodeURIComponent(
    service ? `Hi Samu, I'd like to book ${service}.` : "Hi Samu, I'd like to book an appointment.",
  )}`

/* No prices on purpose: every style is quoted to the client's hair, length
   and the look they want, so the list sends people to WhatsApp instead. */
export const SERVICES = [
  { name: 'Knotless braids', note: 'Lightweight, tension-free braids that start with your own hair for a flat, seamless root.' },
  { name: 'Box braids', note: 'Classic sectioned braids in any length, thickness or colour, from shoulder-grazing to waist-length.' },
  { name: 'Cornrows & stitch braids', note: 'Straight-back, curved or patterned cornrows, worn alone or swept into a bun or ponytail.' },
  { name: 'Updos & ponytails', note: 'Braided buns, sleek high ponytails and sculpted updos for events or everyday polish.' },
  { name: 'Faux locs & twists', note: 'Soft, natural-looking locs and twists that protect your hair while it rests.' },
  { name: 'Wig installs', note: 'Fitting, styling and installing units so they sit naturally and stay secure.' },
  { name: 'Silk press & blow-outs', note: 'Smooth, swinging movement on natural hair, with heat protection at every step.' },
  { name: 'Treatments', note: 'Washing, deep conditioning and scalp care to keep your hair strong between styles.' },
  { name: 'Colour', note: 'Blonde, copper, ombré or a subtle tint, in your own hair or in braiding extensions.' },
  { name: "Kids' styles", note: 'Neat, gentle styles for little ones, done with patience and kept comfortable.' },
] as const

/* Google reviews, from screenshots the owner supplied. Kept in the
   reviewers' own words: an excerpt is marked with an ellipsis and an added
   word with [brackets]. Names are shortened to first name and initial. */
export const REVIEWS = [
  {
    name: 'Lerato L.',
    text: 'My go to girl for all things hair for my 9 year old daughter and I. We both have natural hair (afros) and she does her magic whether it is braids/ other protective hairstyles. Samu can do wonders… She takes appointments so no waiting necessary.',
    featured: true,
  },
  {
    name: 'Snenhlanhla N.',
    text: 'One of the best Afro hair salons I have been to, amazing friendly staff and you will leave happy with their services all the time… guaranteed!',
    featured: true,
  },
  { name: 'Pamella I.', text: 'Great service. Samu is quick and her work is neat. Happy with my results.', featured: true },
  { name: 'Yaya N.', text: 'Samu is quick and works neatly…', featured: false },
  { name: 'Charity N.', text: 'Very professional, she always knows what [to] do with my hair.', featured: false },
  { name: 'Nokwanda', text: 'Professional hair services for African hair.', featured: false },
  { name: 'Linda M.', text: 'Friendly and professional people!', featured: false },
] as const

export const GALLERY = [
  { src: 'feed-in-braids-portrait', w: 1200, h: 1200, alt: 'Long feed-in braids swept to one side, client resting her chin on her hand' },
  { src: 'blue-spring-twists', w: 1200, h: 1200, alt: 'Blue ombré spring twists framing the face' },
  { src: 'kids-beaded-cornrows', w: 1080, h: 1080, alt: "Child's cornrows finished with colourful beads" },
  { src: 'goddess-locs-smile', w: 960, h: 960, alt: 'Smiling client with long, curly goddess locs' },
  { src: 'cornrow-design', w: 1200, h: 1200, alt: 'Patterned cornrows with gold cuffs, seen from above' },
  { src: 'copper-braid-updo', w: 720, h: 720, alt: 'Copper braids swept up into a high bun' },
  { src: 'cornrow-puffs-salon', w: 960, h: 1200, alt: 'Cornrow parting with afro puffs, in the salon chair' },
  { src: 'side-cornrow-bob', w: 864, h: 864, alt: 'Side-swept cornrows into a braided bob' },
  { src: 'goddess-locs-yellow', w: 960, h: 960, alt: 'Curly goddess locs worn loose over a yellow top' },
  { src: 'cornrow-updo-salon', w: 1200, h: 1200, alt: 'Cornrows gathered into a braided updo' },
  { src: 'bob-box-braids', w: 695, h: 695, alt: 'Chin-length box braids' },
  { src: 'braided-top-bun', w: 1200, h: 1200, alt: 'Golden braids wound into a high top bun' },
  { src: 'cornrows-afro-ponytail', w: 1200, h: 1200, alt: 'Cornrows on one side leading into a full afro ponytail' },
  { src: 'cornrows-gold-cuffs', w: 1200, h: 1200, alt: 'Cornrows with gold cuffs, in the salon' },
  { src: 'cornrow-curly-bob', w: 725, h: 725, alt: 'Cornrows leading into a curly bob' },
  { src: 'honey-box-braids', w: 1200, h: 1200, alt: 'Honey-blonde box braids pulled back' },
  { src: 'curly-crochet', w: 1200, h: 1200, alt: 'Loose, glossy curly crochet set' },
  { src: 'senegalese-twists', w: 719, h: 719, alt: 'Long auburn Senegalese twists' },
  { src: 'natural-afro', w: 703, h: 703, alt: 'Full, rounded natural afro' },
  { src: 'cornrows-long-braids', w: 1200, h: 1200, alt: 'Cornrows into long braids, side view' },
  { src: 'twist-updo', w: 1200, h: 1200, alt: 'Twisted updo with cornrowed sides' },
  { src: 'spring-twists', w: 960, h: 960, alt: 'Shoulder-length spring twists in warm brown' },
  { src: 'blonde-knotless', w: 720, h: 720, alt: 'Long blonde knotless braids' },
  { src: 'sleek-braided-ponytail', w: 768, h: 768, alt: 'Sleek low ponytail finished with a single braid' },
] as const
