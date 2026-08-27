import React, { useEffect, useMemo, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "motion/react";
import { products, categories } from "./products";
import "./styles.css";

const INSTAGRAM_URL = "https://www.instagram.com/onestop_brandstore/";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=214%2C%20Bajpai%20Complex%2C%20Char%20Rasta%2C%20Modasa%2C%20Gujarat%20383315";
const PHONE_PRIMARY = "+91 98700 20796";
const PHONE_PRIMARY_TEL = "tel:+919870020796";
const PHONE_SECONDARY = "+91 91063 20619";
const PHONE_SECONDARY_TEL = "tel:+919106320619";

function Icon({ name, size = 20, className = "" }) {
  const c = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className || undefined
  };

  const p = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    arrowUpRight: (
      <>
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    phone: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3-1.2 4.2L7 8.5l3.8 1.3L12 14l1.2-4.2L17 8.5l-3.8-1.3L12 3Z" />
        <path d="m19 14-.7 2.3L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.7L19 14Z" />
      </>
    ),
    check: (
      <>
        <polyline points="20 6 9 17 4 12" />
      </>
    )
  };

  return <svg {...c}>{p[name]}</svg>;
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for sticky navbar shadow/border
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter products by category
  const visible = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  // Lock body scroll when modal or mobile menu is active
  useEffect(() => {
    if (selected || mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected, mobileOpen]);

  // Handle ESC key for dialog & mobile menu dismissal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selected) setSelected(null);
        if (mobileOpen) setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, mobileOpen]);

  // Smooth scroll handler
  const go = useCallback((id) => {
    const target = document.getElementById(id);
    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileOpen(false);
  }, []);

  return (
    <div className="site-shell">
      {/* Top Announcement Bar */}
      <div className="announcement" role="region" aria-label="Announcement">
        <span>ONE STOP BRAND STORE</span>
        <span className="announcement-dot" aria-hidden="true" />
        <span>CHAR RASTA, MODASA</span>
        <span className="announcement-dot hide-xs" aria-hidden="true" />
        <span className="hide-xs">MULTI-BRAND FASHION ACCESSORIES</span>
      </div>

      {/* Sticky Header & Navigation */}
      <header className={`nav-wrap ${scrolled ? "scrolled" : ""}`}>
        <nav className="nav container" aria-label="Main Navigation">
          <button
            className="brand"
            onClick={() => go("home")}
            aria-label="One Stop Brand Store — Go to Home"
          >
            <img
              src="/logo.png"
              alt="One Stop Brand Store Logo"
              width="80"
              height="80"
            />
          </button>

          {/* Desktop Navigation Links */}
          <div className="nav-links desktop-only" role="menubar">
            <button role="menuitem" onClick={() => go("home")}>
              Home
            </button>
            <button role="menuitem" onClick={() => go("collections")}>
              Collections
            </button>
            <button role="menuitem" onClick={() => go("about")}>
              About
            </button>
            <button role="menuitem" onClick={() => go("instagram")}>
              Instagram
            </button>
            <button role="menuitem" onClick={() => go("visit")}>
              Visit Us
            </button>
          </div>

          {/* Nav Actions */}
          <div className="nav-actions">
            <a
              className="nav-call"
              href={PHONE_PRIMARY_TEL}
              aria-label={`Call One Stop Brand Store at ${PHONE_PRIMARY}`}
            >
              <Icon name="phone" size={16} />
              <span>Call</span>
            </a>
            <button
              className="menu-btn"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <Icon name={mobileOpen ? "close" : "menu"} size={22} />
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
              />
              <motion.div
                className="mobile-drawer"
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                role="dialog"
                aria-label="Mobile Navigation Menu"
              >
                <div className="mobile-drawer-links">
                  <button onClick={() => go("home")}>Home</button>
                  <button onClick={() => go("collections")}>Collections</button>
                  <button onClick={() => go("about")}>About</button>
                  <button onClick={() => go("instagram")}>Instagram</button>
                  <button onClick={() => go("visit")}>Visit Us</button>
                </div>
                <div className="mobile-drawer-footer">
                  <a
                    className="primary-btn mobile-call-btn"
                    href={PHONE_PRIMARY_TEL}
                  >
                    <Icon name="phone" size={17} /> Call {PHONE_PRIMARY}
                  </a>
                  <p className="mobile-drawer-address">
                    214, Bajpai Complex, Char Rasta, Modasa, Gujarat
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">
        {/* HERO SECTION */}
        <section id="home" className="hero" aria-label="Hero Introduction">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="container hero-inner">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <div className="eyebrow hero-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                MODASA · GUJARAT
              </div>
              <h1>
                Style that <em>speaks</em> without saying a word.
              </h1>
              <p>
                Discover watches, jewelry, eyewear, fragrances and everyday
                accessories curated to complete your look.
              </p>
              <div className="hero-buttons">
                <button
                  className="primary-btn"
                  onClick={() => go("collections")}
                >
                  Explore Collection <Icon name="arrow" size={18} />
                </button>
                <button className="text-btn" onClick={() => go("visit")}>
                  Visit our store <Icon name="arrowUpRight" size={16} />
                </button>
              </div>
              <div className="hero-note">
                <Icon name="sparkle" size={16} />
                <span>Multi-brand fashion accessories destination</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              aria-hidden="true"
            >
              <div className="hero-card hero-card-main">
                <img
                  src="/products/watch-rose.png"
                  alt="Rose gold statement watch"
                  fetchPriority="high"
                />
                <div className="hero-card-label">
                  TIMELESS
                  <br />
                  <span>DETAILS</span>
                </div>
              </div>
              <div className="hero-card hero-card-small">
                <img
                  src="/products/bracelet-couple.png"
                  alt="Couple bracelet set"
                />
              </div>
              <div className="hero-badge">
                ONE STOP
                <br />
                <span>BRAND STORE</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MARQUEE CATEGORY TICKER */}
        <section className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[
              "WATCHES",
              "JEWELRY",
              "BRACELETS",
              "EYEWEAR",
              "WALLETS & BELTS",
              "FRAGRANCES",
              "HEADWEAR",
              "WATCHES",
              "JEWELRY",
              "BRACELETS",
              "EYEWEAR",
              "WALLETS & BELTS",
              "FRAGRANCES",
              "HEADWEAR"
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <span>{item}</span>
                <span className="marquee-dot">✦</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* COLLECTIONS SECTION */}
        <section
          id="collections"
          className="section collections"
          aria-labelledby="collections-heading"
        >
          <div className="container">
            <motion.div
              className="section-head"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="eyebrow">THE COLLECTION</div>
                <h2 id="collections-heading">
                  Find your <em>signature.</em>
                </h2>
              </div>
              <p>
                A rotating selection of fashion accessories for everyday
                moments, gifting and making an entrance.
              </p>
            </motion.div>

            {/* Category Filter Pills */}
            <div
              className="category-strip"
              role="tablist"
              aria-label="Filter by product category"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const count =
                  cat === "All"
                    ? products.length
                    : products.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    className={`category-pill ${isActive ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <span>{cat}</span>
                    {count > 0 && <span className="cat-count">{count}</span>}
                  </button>
                );
              })}
            </div>

            {/* Products Grid or Empty State */}
            {visible.length > 0 ? (
              <motion.div className="product-grid" layout>
                <AnimatePresence mode="popLayout">
                  {visible.map((product, index) => (
                    <motion.article
                      className="product-card"
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.3,
                        delay: Math.min(index * 0.03, 0.2)
                      }}
                      onClick={() => setSelected(product)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelected(product);
                        }
                      }}
                      aria-label={`View details for ${product.name}`}
                    >
                      <div className="product-image">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="view-pill">
                          View details <Icon name="arrow" size={14} />
                        </span>
                      </div>
                      <div className="product-meta">
                        <span className="product-cat-tag">
                          {product.category}
                        </span>
                        <h3>{product.name}</h3>
                        <div className="product-action-row">
                          <span className="product-link">
                            Explore <Icon name="arrow" size={13} />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                className="empty-category"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="empty-number">08</span>
                <div>
                  <div className="eyebrow">COMING SOON</div>
                  <h3>
                    New {activeCategory.toLowerCase()} styles are on the way.
                  </h3>
                  <p>
                    We’re adding fresh pieces to this collection. Visit our store
                    at Char Rasta, Modasa or follow us on Instagram for new
                    arrival drops.
                  </p>
                  <div className="empty-actions">
                    <a
                      className="primary-btn empty-btn"
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Follow @onestop_brandstore{" "}
                      <Icon name="arrowUpRight" size={15} />
                    </a>
                    <a className="empty-call-btn" href={PHONE_PRIMARY_TEL}>
                      <Icon name="phone" size={15} /> Call Store to Enquire
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section about" aria-labelledby="about-heading">
          <div className="container about-grid">
            <motion.div
              className="about-photo"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/products/bracelets-gold.png"
                alt="Curated gold tone bracelet collection"
                loading="lazy"
              />
              <div className="photo-caption">
                <span>01</span> CURATED DETAILS
              </div>
            </motion.div>

            <motion.div
              className="about-copy"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="eyebrow about-eyebrow">ABOUT ONE STOP</div>
              <h2 id="about-heading">
                More than accessories.
                <br />
                <em>It's your finishing touch.</em>
              </h2>
              <p>
                One Stop Brand Store is a multi-brand fashion accessories
                destination in Modasa, bringing together statement watches,
                jewelry, eyewear, fragrances and everyday essentials in one
                place.
              </p>
              <div className="about-points">
                <div>
                  <strong>01</strong>
                  <div className="point-text">
                    <span className="point-title">Curated styles</span>
                    <span className="point-sub">
                      Handpicked designs to elevate any look effortlessly.
                    </span>
                  </div>
                </div>
                <div>
                  <strong>02</strong>
                  <div className="point-text">
                    <span className="point-title">Multi-brand selection</span>
                    <span className="point-sub">
                      A diverse catalog of trending watches, eyewear and jewelry.
                    </span>
                  </div>
                </div>
                <div>
                  <strong>03</strong>
                  <div className="point-text">
                    <span className="point-title">Everyday + occasion wear</span>
                    <span className="point-sub">
                      Subtle accents for daily wear and bold statement pieces for events.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* INSTAGRAM SECTION */}
        <section
          id="instagram"
          className="section instagram-section"
          aria-labelledby="instagram-heading"
        >
          <div className="container">
            <div className="social-panel">
              <div className="social-copy">
                <div className="eyebrow social-eyebrow">FOLLOW THE STORE</div>
                <h2 id="instagram-heading">
                  See what's <em>new.</em>
                </h2>
                <p>
                  New arrivals, product drops and styling inspiration live on our
                  Instagram.
                </p>
                <div className="social-actions">
                  <a
                    className="primary-btn"
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Instagram <Icon name="instagram" size={18} />
                  </a>
                  <span className="social-handle">@onestop_brandstore</span>
                </div>
              </div>

              <div className="social-mark">
                <div className="social-orbit">
                  <img
                    src="/logo.png"
                    alt="One Stop Brand Store profile mark"
                    loading="lazy"
                  />
                  <span>FOLLOW @ONESTOP_BRANDSTORE</span>
                </div>
                <div className="social-mini-grid" aria-hidden="true">
                  <img
                    src="/products/watch-blue.png"
                    alt="Blue chronograph watch"
                    loading="lazy"
                  />
                  <img
                    src="/products/bracelets-floral.jpg"
                    alt="Floral charm bracelets"
                    loading="lazy"
                  />
                  <img
                    src="/products/sunglasses-blue.png"
                    alt="Blue lens sunglasses"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VISIT US SECTION */}
        <section id="visit" className="section visit" aria-labelledby="visit-heading">
          <div className="container visit-grid">
            <div className="visit-copy">
              <div className="eyebrow">COME SAY HELLO</div>
              <h2 id="visit-heading">
                Your next favourite
                <br />
                <em>piece is nearby.</em>
              </h2>
              <p>
                Visit us at Char Rasta, Modasa and explore the collection in
                person. Our team is ready to help you find your signature piece.
              </p>

              <div className="address-card">
                <div className="address-icon" aria-hidden="true">
                  <Icon name="pin" size={22} />
                </div>
                <div className="address-details">
                  <strong>One Stop Brand Store</strong>
                  <span>
                    214, Bajpai Complex, Char Rasta,
                    <br />
                    Modasa, Gujarat – 383315
                  </span>
                  <div className="store-hours">
                    <Icon name="clock" size={14} />
                    <span>Open Daily · 10:00 AM – 9:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="visit-actions">
                <a
                  className="primary-btn"
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions <Icon name="arrowUpRight" size={18} />
                </a>
                <a className="secondary-btn" href={PHONE_PRIMARY_TEL}>
                  <Icon name="phone" size={16} /> Call Store
                </a>
              </div>
            </div>

            {/* Stylized Interactive Map Card */}
            <a
              className="map-card"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open One Stop Brand Store on Google Maps"
            >
              <div className="map-pattern" />
              <div className="map-pin">
                <Icon name="pin" size={28} />
              </div>
              <div className="map-label">
                <strong>One Stop Brand Store</strong>
                <span>Char Rasta · Modasa, Gujarat</span>
                <span className="map-cta">
                  Open in Google Maps <Icon name="arrowUpRight" size={12} />
                </span>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand-col">
            <img
              className="footer-logo"
              src="/logo.png"
              alt="One Stop Brand Store Logo"
              loading="lazy"
              width="100"
              height="100"
            />
            <p>
              One Stop Brand Store — Modasa's curated destination for fashion
              accessories, watches, jewelry, eyewear and fragrances.
            </p>
            <div className="footer-social-link">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow One Stop Brand Store on Instagram"
              >
                <Icon name="instagram" size={16} /> @onestop_brandstore
              </a>
            </div>
          </div>

          <div className="footer-col">
            <span className="footer-title">NAVIGATION</span>
            <button onClick={() => go("home")}>Home</button>
            <button onClick={() => go("collections")}>Collections</button>
            <button onClick={() => go("about")}>About Store</button>
            <button onClick={() => go("instagram")}>Instagram</button>
            <button onClick={() => go("visit")}>Visit Us</button>
          </div>

          <div className="footer-col">
            <span className="footer-title">CONTACT & LOCATION</span>
            <a href={PHONE_PRIMARY_TEL}>{PHONE_PRIMARY}</a>
            <a href={PHONE_SECONDARY_TEL}>{PHONE_SECONDARY}</a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              214, Bajpai Complex, Char Rasta, Modasa
            </a>
            <a
              className="footer-directions-btn"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions <Icon name="arrowUpRight" size={13} />
            </a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} One Stop Brand Store. All rights
            reserved.
          </span>
          <span>Char Rasta · Modasa, Gujarat – 383315</span>
        </div>
      </footer>

      {/* PRODUCT DETAIL MODAL DIALOG */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="presentation"
          >
            <motion.div
              className="product-modal"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-product-title"
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close product details"
              >
                <Icon name="close" size={20} />
              </button>

              <div className="modal-image">
                <img src={selected.image} alt={selected.name} />
              </div>

              <div className="modal-copy">
                <div className="eyebrow modal-cat-tag">
                  {selected.category}
                </div>
                <h2 id="modal-product-title">{selected.name}</h2>
                <p>{selected.description}</p>

                <div className="modal-line">
                  <span>Store Availability</span>
                  <strong>In-Stock · Modasa Store</strong>
                </div>

                <div className="modal-actions">
                  <a className="primary-btn modal-call-btn" href={PHONE_PRIMARY_TEL}>
                    <Icon name="phone" size={17} /> Call to Enquire
                  </a>
                  <a
                    className="modal-map-link"
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Store Location <Icon name="arrowUpRight" size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

