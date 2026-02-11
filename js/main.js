/* ============================================
   INDOGLOBAL EXPORTS – SHARED COMPONENTS & INTERACTIONS
   ============================================ */

// ===== NAVIGATION =====
function renderNavigation(activePage) {
    const nav = document.getElementById('main-header');
    if (!nav) return;

    nav.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="logo">
        <div class="logo-icon">IG</div>
        Indo<span>Global</span>
      </a>
      <nav class="nav-menu" id="navMenu">
        <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
        <a href="about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}">About</a>
        <a href="products.html" class="nav-link ${activePage === 'products' ? 'active' : ''}">Products</a>
        <a href="export-process.html" class="nav-link ${activePage === 'process' ? 'active' : ''}">Export Process</a>
        <a href="certifications.html" class="nav-link ${activePage === 'certifications' ? 'active' : ''}">Certifications</a>
        <a href="blog.html" class="nav-link ${activePage === 'blog' ? 'active' : ''}">Blog</a>
        <a href="contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Contact</a>
        <a href="quote.html" class="nav-cta">Request Quote</a>
      </nav>
      <div class="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close on link click (mobile)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== FOOTER =====
function renderFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <div class="logo-icon">IG</div>
            Indo<span>Global</span>
          </a>
          <p>We help global importers source premium Indian products reliably. With years of expertise in international trade, we deliver quality, consistency, and trust to businesses worldwide.</p>
        </div>
        <div>
          <h4 class="footer-title">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="about.html">About Us</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="export-process.html">Export Process</a></li>
            <li><a href="certifications.html">Certifications</a></li>
            <li><a href="blog.html">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-title">Products</h4>
          <ul class="footer-links">
            <li><a href="products.html">Spices</a></li>
            <li><a href="products.html">Agricultural Products</a></li>
            <li><a href="products.html">Textiles</a></li>
            <li><a href="products.html">Handicrafts</a></li>
            <li><a href="products.html">Industrial Goods</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-title">Contact Us</h4>
          <div class="footer-contact-item">
            <span class="footer-contact-icon">📍</span>
            <span>123 Export Tower, Mumbai, Maharashtra, India – 400001</span>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon">📞</span>
            <span>+91 98765 43210</span>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon">✉️</span>
            <span>info@indoglobalexports.com</span>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon">💬</span>
            <span>WhatsApp: +91 98765 43210</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} IndoGlobal Exports. All Rights Reserved.</p>
        <div class="footer-bottom-links">
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms & Conditions</a>
        </div>
      </div>
    </div>
  `;
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all
        animatedElements.forEach(el => el.classList.add('visible'));
    }
}

// ===== COUNTER ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                const suffix = el.getAttribute('data-suffix') || '';
                const prefix = el.getAttribute('data-prefix') || '';
                const duration = 2000;
                const start = Date.now();

                const animate = () => {
                    const elapsed = Date.now() - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    el.textContent = prefix + current.toLocaleString() + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        el.textContent = prefix + target.toLocaleString() + suffix;
                    }
                };

                animate();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => observer.observe(counter));
}

// ===== FORM VALIDATION =====
function initForms() {
    const forms = document.querySelectorAll('[data-validate]');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Clear previous errors
            form.querySelectorAll('.form-error').forEach(err => {
                err.style.display = 'none';
            });

            // Validate required fields
            form.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    const error = field.parentElement.querySelector('.form-error');
                    if (error) {
                        error.textContent = 'This field is required';
                        error.style.display = 'block';
                    }
                    field.style.borderColor = 'var(--error)';
                } else {
                    field.style.borderColor = '';
                }
            });

            // Validate email
            const emailField = form.querySelector('[type="email"]');
            if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                isValid = false;
                const error = emailField.parentElement.querySelector('.form-error');
                if (error) {
                    error.textContent = 'Please enter a valid email';
                    error.style.display = 'block';
                }
                emailField.style.borderColor = 'var(--error)';
            }

            if (isValid) {
                // Show success
                const successMsg = form.querySelector('.form-success');
                if (successMsg) {
                    successMsg.style.display = 'block';
                    form.reset();
                    // Hide after 5 seconds
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }
            }
        });

        // Clear error on input
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', () => {
                field.style.borderColor = '';
                const error = field.parentElement.querySelector('.form-error');
                if (error) error.style.display = 'none';
            });
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('main-header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// ===== PRODUCT FILTER (Products page) =====
function initProductFilter() {
    const filterBtns = document.querySelectorAll('[data-filter]');
    const products = document.querySelectorAll('[data-category]');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter products
            products.forEach(product => {
                if (filter === 'all' || product.getAttribute('data-category') === filter) {
                    product.style.display = '';
                    product.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    const activePage = document.body.getAttribute('data-page') || 'home';
    renderNavigation(activePage);
    renderFooter();
    initScrollAnimations();
    initCounters();
    initForms();
    initSmoothScroll();
    initProductFilter();
});
