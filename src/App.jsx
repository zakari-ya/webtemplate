import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Camera,
  ChevronRight,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react'
import { brand } from './config/brand'
import { navigation, galleryMoments, sectionCopy } from './config/layoutPresets'
import { menuPreview } from './config/menu'

const reveal = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

function useBrandVars() {
  return useMemo(
    () => ({
      '--color-deep': brand.colors.deepGreen,
      '--color-ink': brand.colors.inkGreen,
      '--color-cream': brand.colors.warmCream,
      '--color-muted-cream': brand.colors.mutedCream,
      '--color-gold': brand.colors.classicGold,
      '--color-paper': brand.colors.paperBeige,
      '--font-display': brand.fonts.display,
      '--font-body': brand.fonts.body,
      '--font-utility': brand.fonts.utility,
    }),
    [],
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      variants={reveal}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function BrandMark({ tone = 'light' }) {
  return (
    <a className={`brand-mark brand-mark-${tone}`} href="#accueil">
      <span className="brand-seal" aria-hidden="true">
        B
      </span>
      <span>
        <span className="brand-name">{brand.name}</span>
        <span className="brand-type">{brand.businessTypes.join(' • ')}</span>
      </span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Navigation principale">
        <BrandMark />

        <div className="nav-links" aria-label="Liens principaux">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a className="nav-action" href={brand.contact.whatsapp}>
          {brand.ctas.whatsapp}
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div className={`mobile-menu ${open ? 'mobile-menu-open' : ''}`}>
        {navigation.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href={brand.contact.whatsapp} onClick={() => setOpen(false)}>
          {brand.ctas.whatsapp}
        </a>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="hero-section" id="accueil">
      <Header />
      <picture className="hero-media">
        <img src={brand.media.heroImage} alt="" />
      </picture>
      <div className="hero-overlay" />

      <div className="hero-inner">
        <Reveal className="hero-copy">
          <h1>{brand.slogan}</h1>
          <p>
            {brand.categoryText} {brand.instagram.handle} •{' '}
            {brand.stats.followers}
          </p>
          <div className="hero-actions" aria-label="Actions principales">
            <a className="button-primary" href="#menu">
              {brand.ctas.menu}
              <ChevronRight size={17} aria-hidden="true" />
            </a>
            <a
              className="button-secondary"
              href={brand.contact.mapLink}
              target="_blank"
              rel="noreferrer"
            >
              {brand.ctas.map}
            </a>
            <a className="button-link" href={brand.contact.whatsapp}>
              {brand.ctas.whatsapp}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function HighlightsSection() {
  return (
    <section className="highlights-section" aria-label="Moments Biscotte">
      <div className="section-shell highlight-shell">
        {brand.highlights.map((highlight, index) => (
          <Reveal
            key={highlight}
            className={`highlight-stamp highlight-stamp-${index + 1}`}
            delay={index * 0.06}
          >
            <span>{highlight}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="story-section">
      <div className="section-shell story-grid">
        <Reveal className="story-image story-image-main">
          <img src={brand.media.pastry} alt="Pâtisserie raffinée Biscotte" />
        </Reveal>

        <Reveal className="story-copy" delay={0.08}>
          <p className="story-kicker">{brand.name}</p>
          <h2>
            Le goût d’un <em>instant</em> soigné.
          </h2>
          <p className="story-lead">{sectionCopy.storyLead}</p>
          <p>{sectionCopy.storyBody}</p>
        </Reveal>

        <Reveal className="story-image story-image-small" delay={0.16}>
          <img src={brand.media.drink} alt="Café et boissons signature" />
        </Reveal>
      </div>
    </section>
  )
}

function DecorativeDivider() {
  return (
    <span className="ornament" aria-hidden="true">
      <span />
    </span>
  )
}

function EditorialMenuItem({ item, index }) {
  return (
    <Reveal className="menu-line" delay={index * 0.06}>
      <div>
        <p className="menu-category">{item.category}</p>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
      <span className="menu-price">{item.price}</span>
    </Reveal>
  )
}

function MenuPreviewSection() {
  return (
    <section className="menu-section" id="menu">
      <div className="section-shell">
        <Reveal className="section-heading">
          <h2>Un menu qui respire comme une page imprimée.</h2>
          <p>
            Une première structure éditable pour présenter les familles de goût
            sans figer les produits réels.
          </p>
        </Reveal>

        <div className="menu-editorial">
          <div className="menu-column">
            {menuPreview.slice(0, 2).map((item, index) => (
              <EditorialMenuItem key={item.category} item={item} index={index} />
            ))}
          </div>

          <Reveal className="menu-image" delay={0.1}>
            <img src={brand.media.pastry} alt="Sélection de pâtisserie" />
            <DecorativeDivider />
          </Reveal>

          <div className="menu-column menu-column-offset">
            {menuPreview.slice(2).map((item, index) => (
              <EditorialMenuItem
                key={item.category}
                item={item}
                index={index + 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function GallerySection() {
  return (
    <section className="gallery-section" id="moments">
      <div className="section-shell">
        <Reveal className="gallery-heading">
          <h2>Des moments à garder en mémoire.</h2>
        </Reveal>

        <div className="gallery-layout">
          {galleryMoments.map((moment, index) => (
            <Reveal
              key={moment.caption}
              className={`gallery-figure gallery-figure-${index + 1}`}
              delay={index * 0.07}
            >
              <img src={brand.media[moment.imageKey]} alt={moment.alt} />
              <p>{moment.caption}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function VisitSection() {
  return (
    <section className="visit-section" id="adresse">
      <div className="section-shell visit-layout">
        <Reveal className="visit-main">
          <p className="story-kicker">Adresse</p>
          <h2>{brand.city}</h2>
          <p>
            Pour un café du matin, une pâtisserie soignée ou une table à
            partager, Biscotte vous accueille au cœur de Marrakech.
          </p>
        </Reveal>

        <Reveal className="visit-details" delay={0.08}>
          <a href={brand.contact.phoneHref}>
            <Phone size={18} aria-hidden="true" />
            {brand.contact.phoneDisplay}
          </a>
          <a
            href={brand.contact.mapLink}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={18} aria-hidden="true" />
            {brand.ctas.map}
          </a>
          <a href={brand.contact.whatsapp}>
            <MessageCircle size={18} aria-hidden="true" />
            {brand.ctas.whatsapp}
          </a>
          <a
            href={brand.instagram.url}
            target="_blank"
            rel="noreferrer"
          >
            <Camera size={18} aria-hidden="true" />
            {brand.instagram.handle}
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-layout">
        <Reveal className="footer-cta">
          <h2>{sectionCopy.finalLine}</h2>
          <div className="footer-actions">
            <a
              className="button-primary"
              href={brand.contact.mapLink}
              target="_blank"
              rel="noreferrer"
            >
              {brand.ctas.map}
            </a>
            <a className="button-secondary" href={brand.contact.whatsapp}>
              {brand.ctas.whatsapp}
            </a>
            <a
              className="button-link"
              href={brand.instagram.url}
              target="_blank"
              rel="noreferrer"
            >
              {brand.ctas.instagram}
            </a>
          </div>
        </Reveal>

        <div className="footer-bottom">
          <BrandMark />
          <p>{brand.city}</p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const brandVars = useBrandVars()

  return (
    <main className="template-page" style={brandVars}>
      <HeroSection />
      <HighlightsSection />
      <StorySection />
      <MenuPreviewSection />
      <GallerySection />
      <VisitSection />
      <FooterSection />
    </main>
  )
}

export default App
