// Accessibility and Interaction JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true"

      mobileMenuBtn.setAttribute("aria-expanded", !isExpanded)
      mobileMenu.classList.toggle("active")

      // Announce menu state change
      announceToScreenReader(isExpanded ? "Menu closed" : "Menu opened")
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenuBtn.setAttribute("aria-expanded", "false")
        mobileMenu.classList.remove("active")
      }
    })

    // Close mobile menu on escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
        mobileMenuBtn.setAttribute("aria-expanded", "false")
        mobileMenu.classList.remove("active")
        mobileMenuBtn.focus()
        announceToScreenReader("Menu closed")
      }
    })
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenuBtn.setAttribute("aria-expanded", "false")
          mobileMenu.classList.remove("active")
        }

        // Announce navigation
        const sectionName = href.replace("#", "")
        announceToScreenReader(`Navigated to ${sectionName} section`)
      }
    })
  })

  // Active navigation highlighting
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
  const sections = document.querySelectorAll("section[id]")

  function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
            link.setAttribute("aria-current", "page")
          } else {
            link.removeAttribute("aria-current")
          }
        })
      }
    })
  }

  // Throttled scroll listener for performance
  let scrollTimeout
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    scrollTimeout = setTimeout(updateActiveNavigation, 10)
  })

  // Contact form functionality
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Clear previous errors
      clearFormErrors()

      // Validate form
      const formData = new FormData(contactForm)
      const errors = validateContactForm(formData)

      if (Object.keys(errors).length === 0) {
        // Create mailto link
        const firstName = formData.get("firstName")
        const lastName = formData.get("lastName")
        const email = formData.get("email")
        const company = formData.get("company")
        const message = formData.get("message")
        const services = formData.getAll("services")

        const subject = encodeURIComponent(`Contact Form Submission from ${firstName} ${lastName}`)
        const body = encodeURIComponent(`
Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company}
Services of Interest: ${services.join(", ")}

Message:
${message}
                `)

        const mailtoLink = `mailto:info@compsoft.com.na?subject=${subject}&body=${body}`
        window.location.href = mailtoLink

        announceToScreenReader(
          "Opening email client with your message. Please send the email to complete your submission.",
        )
      } else {
        // Display errors
        displayFormErrors(errors)
        const errorCount = Object.keys(errors).length
        announceToScreenReader(`Form has ${errorCount} error${errorCount > 1 ? "s" : ""}. Please review and correct.`)

        // Focus on first error field
        const firstErrorField = Object.keys(errors)[0]
        const element = document.querySelector(`[name="${firstErrorField}"]`)
        if (element) {
          element.focus()
        }
      }
    })
  }

  // Service tag selection
  const serviceTags = document.querySelectorAll(".service-tag")
  serviceTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      const checkbox = this.querySelector('input[type="checkbox"]')
      const serviceName = checkbox.value

      checkbox.checked = !checkbox.checked

      announceToScreenReader(`${serviceName} service ${checkbox.checked ? "selected" : "deselected"}`)
    })

    tag.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".service-card, .solution-card, .client-logo, .feature-item")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })

  // Partners scroll duplication for seamless loop
  const partnersScroll = document.getElementById("partners-scroll")
  if (partnersScroll) {
    const partnerLogos = partnersScroll.querySelectorAll(".partner-logo")

    // Duplicate partner logos for seamless scrolling
    partnerLogos.forEach((logo) => {
      const clone = logo.cloneNode(true)
      partnersScroll.appendChild(clone)
    })
  }

  // Keyboard navigation improvements
  document.addEventListener("keydown", (e) => {
    // Skip to main content shortcut
    if (e.altKey && e.key === "m") {
      e.preventDefault()
      const mainContent = document.getElementById("main-content")
      if (mainContent) {
        mainContent.focus()
        mainContent.scrollIntoView({ behavior: "smooth" })
        announceToScreenReader("Skipped to main content")
      }
    }
  })

  // Focus management for better accessibility
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

  function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements)
    const firstFocusableElement = focusableContent[0]
    const lastFocusableElement = focusableContent[focusableContent.length - 1]

    element.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus()
            e.preventDefault()
          }
        }
      }
    })
  }

  // Apply focus trap to mobile menu when open
  if (mobileMenu) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          if (mobileMenu.classList.contains("active")) {
            trapFocus(mobileMenu)
            // Focus first menu item
            const firstMenuItem = mobileMenu.querySelector(".mobile-nav-link")
            if (firstMenuItem) {
              firstMenuItem.focus()
            }
          }
        }
      })
    })

    observer.observe(mobileMenu, { attributes: true })
  }

  // Reduced motion detection
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  function handleReducedMotion(mediaQuery) {
    if (mediaQuery.matches) {
      // Disable animations for users who prefer reduced motion
      document.body.classList.add("reduced-motion")

      // Stop partner scroll animation
      if (partnersScroll) {
        partnersScroll.style.animation = "none"
        partnersScroll.style.display = "flex"
        partnersScroll.style.flexWrap = "wrap"
        partnersScroll.style.justifyContent = "center"
      }
    } else {
      document.body.classList.remove("reduced-motion")
    }
  }

  prefersReducedMotion.addListener(handleReducedMotion)
  handleReducedMotion(prefersReducedMotion)
})

// Form validation functions
function validateContactForm(formData) {
  const errors = {}

  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const company = formData.get("company")
  const message = formData.get("message")

  if (!firstName || !firstName.trim()) {
    errors.firstName = "First name is required"
  }

  if (!lastName || !lastName.trim()) {
    errors.lastName = "Last name is required"
  }

  if (!email || !email.trim()) {
    errors.email = "Email is required"
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!company || !company.trim()) {
    errors.company = "Company name is required"
  }

  if (!message || !message.trim()) {
    errors.message = "Message is required"
  }

  return errors
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function displayFormErrors(errors) {
  Object.keys(errors).forEach((fieldName) => {
    const field = document.querySelector(`[name="${fieldName}"]`)
    const errorElement = document.getElementById(`${fieldName}-error`)

    if (field && errorElement) {
      field.classList.add("error")
      field.setAttribute("aria-invalid", "true")
      field.setAttribute("aria-describedby", `${fieldName}-error`)
      errorElement.textContent = errors[fieldName]
      errorElement.setAttribute("role", "alert")
    }
  })
}

function clearFormErrors() {
  const errorElements = document.querySelectorAll(".error-message")
  const inputElements = document.querySelectorAll(".form-group input, .form-group textarea")

  errorElements.forEach((element) => {
    element.textContent = ""
    element.removeAttribute("role")
  })

  inputElements.forEach((element) => {
    element.classList.remove("error")
    element.removeAttribute("aria-invalid")
    element.removeAttribute("aria-describedby")
  })
}

// Screen reader announcements
function announceToScreenReader(message, priority = "polite") {
  const announcer = document.getElementById("announcer")
  if (announcer) {
    announcer.setAttribute("aria-live", priority)
    announcer.textContent = message

    // Clear after announcement to allow re-announcements
    setTimeout(() => {
      announcer.textContent = ""
    }, 1000)
  }
}

// Performance optimization - Lazy loading for images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
lazyLoadImages()

// Error handling for images
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      const img = e.target
      const fallback = img.nextElementSibling

      if (fallback && fallback.style.display === "none") {
        img.style.display = "none"
        fallback.style.display = "block"
      }
    }
  },
  true,
)

// Utility function for debouncing
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Add any scroll-based functionality here
  window.updateActiveNavigation()
}, 10)

window.addEventListener("scroll", optimizedScrollHandler)

// Declare the updateActiveNavigation function globally
window.updateActiveNavigation = () => {
  const scrollPosition = window.scrollY + 100
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
  const sections = document.querySelectorAll("section[id]")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
          link.setAttribute("aria-current", "page")
        } else {
          link.removeAttribute("aria-current")
        }
      })
    }
  })
}
