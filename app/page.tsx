"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  NetworkIcon,
  UsersIcon,
  CloudIcon,
  ShieldIcon,
  GlobeIcon,
  ZapIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  XIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { SkipLink } from "@/components/skip-link"
import { AccessibilityAnnouncer } from "@/components/accessibility-announcer"
import { FocusTrap } from "@/components/focus-trap"

// Custom hook to detect reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches)
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return prefersReducedMotion
}

// Simple animation component to replace framer-motion
const AnimatedDiv = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 100)

    return () => clearTimeout(timer)
  }, [delay])

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up":
          return "translateY(30px)"
        case "down":
          return "translateY(-30px)"
        case "left":
          return "translateX(30px)"
        case "right":
          return "translateX(-30px)"
        default:
          return "translateY(30px)"
      }
    }
    return "translateY(0)"
  }

  return (
    <div
      className={`transition-all duration-800 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
      }}
    >
      {children}
    </div>
  )
}

export default function CompsoftWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [announcement, setAnnouncement] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isClient, setIsClient] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle scroll for parallax effect
  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = ["home", "about", "services", "solutions", "clients", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section)
              setAnnouncement(`Navigated to ${section} section`)
            }
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection, isClient])

  const services = [
    {
      icon: <NetworkIcon />,
      title: "Connectivity Solutions",
      description:
        "Last mile connectivity, voice and data solutions, business internet access, and virtual private networks.",
      features: ["DSL/ADSL/SAIX", "Fiber & Metro Ethernet", "Wireless Solutions", "MPLS Networks"],
    },
    {
      icon: <UsersIcon />,
      title: "Collaboration",
      description: "Unified communications, video conferencing, telephony systems, and mobility solutions.",
      features: ["PABX Systems", "Video Conferencing", "Unified Communications", "Mobile Integration"],
    },
    {
      icon: <CloudIcon />,
      title: "Data Center Solutions",
      description: "Computing, storage, virtualization, and cloud services for modern businesses.",
      features: ["Cisco UCS", "Storage Solutions", "Virtualization", "Cloud Migration"],
    },
    {
      icon: <ShieldIcon />,
      title: "Converged Security",
      description: "Comprehensive logical and physical security solutions for complete protection.",
      features: ["Access Control", "Surveillance", "Network Security", "Fire Detection"],
    },
    {
      icon: <GlobeIcon />,
      title: "Network Solutions",
      description: "LAN/WAN design, optimization, and management for reliable network infrastructure.",
      features: ["Network Design", "Optimization", "Management", "Support"],
    },
    {
      icon: <ZapIcon />,
      title: "Contact Centre",
      description: "Call recording, quality assurance, and customer service optimization solutions.",
      features: ["Call Recording", "Quality Assurance", "Analytics", "Training"],
    },
  ]

  const partners = [
    { name: "HP", logo: "/images/partners.jpg" },
    { name: "Cisco", logo: "/images/partners.jpg" },
    { name: "Ruckus", logo: "/images/partners.jpg" },
    { name: "Dell", logo: "/images/partners.jpg" },
    { name: "Unify", logo: "/images/partners.jpg" },
    { name: "Panasonic", logo: "/images/partners.jpg" },
    { name: "Palo Alto Networks", logo: "/images/partners.jpg" },
    { name: "Commvault", logo: "/images/partners.jpg" },
    { name: "Microsoft", logo: "/images/partners.jpg" },
    { name: "Huawei", logo: "/images/partners.jpg" },
    { name: "Axis", logo: "/images/partners.jpg" },
    { name: "Jabra", logo: "/images/partners.jpg" },
    { name: "Polycom", logo: "/images/partners.jpg" },
    { name: "Avaya", logo: "/images/partners.jpg" },
    { name: "Veritas", logo: "/images/partners.jpg" },
    { name: "Oracle", logo: "/images/partners.jpg" },
    { name: "Citrix", logo: "/images/partners.jpg" },
  ]

  const clients = [
    { name: "Retirement Fund Solutions", logo: "/images/clients.jpg" },
    { name: "Standard Bank", logo: "/images/clients.jpg" },
    { name: "Central Oil Namibia", logo: "/images/clients.jpg" },
    { name: "Effort Investment Holdings", logo: "/images/clients.jpg" },
    { name: "Eos Capital", logo: "/images/clients.jpg" },
    { name: "TransNamib Holdings", logo: "/images/clients.jpg" },
    { name: "Namcor", logo: "/images/clients.jpg" },
    { name: "Konrad Adenauer Stiftung", logo: "/images/clients.jpg" },
  ]

  const scrollToSection = (sectionId: string) => {
    if (!isClient) return

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setAnnouncement(`Navigating to ${sectionId} section`)
    }
    setIsMenuOpen(false)
  }

  const validateForm = (formData: FormData) => {
    const errors: Record<string, string> = {}

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const message = formData.get("message") as string

    if (!firstName?.trim()) errors.firstName = "First name is required"
    if (!lastName?.trim()) errors.lastName = "Last name is required"
    if (!email?.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address"
    }
    if (!company?.trim()) errors.company = "Company name is required"
    if (!message?.trim()) errors.message = "Message is required"

    return errors
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const errors = validateForm(formData)

    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      // Static form submission - create mailto link
      const firstName = formData.get("firstName") as string
      const lastName = formData.get("lastName") as string
      const email = formData.get("email") as string
      const company = formData.get("company") as string
      const message = formData.get("message") as string

      const subject = encodeURIComponent(`Contact Form Submission from ${firstName} ${lastName}`)
      const body = encodeURIComponent(`
Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company}

Message:
${message}
      `)

      const mailtoLink = `mailto:info@compsoft.com.na?subject=${subject}&body=${body}`
      window.location.href = mailtoLink

      setAnnouncement("Opening email client with your message. Please send the email to complete your submission.")
    } else {
      const errorCount = Object.keys(errors).length
      setAnnouncement(`Form has ${errorCount} error${errorCount > 1 ? "s" : ""}. Please review and correct.`)
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0]
      const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement
      element?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      action()
    }
  }

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading Compsoft Communications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <SkipLink />
      <AccessibilityAnnouncer message={announcement} />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/images/compsoft-logo.jpg"
                alt="Compsoft Communications Logo"
                className="w-12 h-12 object-contain rounded-lg"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = "none"
                  const parent = target.parentElement
                  if (parent) {
                    const fallback = document.createElement("div")
                    fallback.className =
                      "w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center"
                    fallback.innerHTML = '<span class="text-white font-bold text-xs">CS</span>'
                    parent.appendChild(fallback)
                  }
                }}
              />
              <div>
                <h1 className="text-xl font-bold text-slate-100">compsoft</h1>
                <p className="text-xs text-slate-400 uppercase tracking-wider">COMMUNICATIONS</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8" role="menubar">
              {["Home", "About", "Services", "Solutions", "Clients", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  onKeyDown={(e) => handleKeyDown(e, () => scrollToSection(item.toLowerCase()))}
                  className={`text-sm font-medium transition-colors hover:text-cyan-400 focus:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1 ${
                    activeSection === item.toLowerCase() ? "text-cyan-400" : "text-slate-300"
                  }`}
                  role="menuitem"
                  aria-current={activeSection === item.toLowerCase() ? "page" : undefined}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 focus:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <FocusTrap isActive={isMenuOpen}>
              <div
                className="md:hidden mt-4 py-4 border-t border-slate-800 animate-fade-in"
                id="mobile-menu"
                role="menu"
              >
                {["Home", "About", "Services", "Solutions", "Clients", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    onKeyDown={(e) => handleKeyDown(e, () => scrollToSection(item.toLowerCase()))}
                    className="block w-full text-left py-2 px-4 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 focus:text-cyan-400 focus:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    role="menuitem"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </FocusTrap>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
            style={{
              transform: prefersReducedMotion ? "none" : `translateY(${scrollY * 0.5}px)`,
            }}
          />

          {/* Animated Background Elements */}
          <div className="absolute inset-0" aria-hidden="true">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 ${
                  prefersReducedMotion ? "" : "animate-pulse"
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <AnimatedDiv className="max-w-4xl mx-auto">
              <h1
                id="hero-heading"
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent"
              >
                Leading ICT Solutions
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                Compsoft Communications delivers comprehensive end-to-end ICT solutions to businesses across Southern
                Africa using best-of-breed technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => scrollToSection("services")}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:from-cyan-600 focus:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  aria-describedby="services-button-desc"
                >
                  Explore Services
                  <ArrowRightIcon />
                </Button>
                <span id="services-button-desc" className="sr-only">
                  Navigate to services section
                </span>
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="outline"
                  size="lg"
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 focus:bg-cyan-400 focus:text-slate-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  aria-describedby="contact-button-desc"
                >
                  Get In Touch
                </Button>
                <span id="contact-button-desc" className="sr-only">
                  Navigate to contact section
                </span>
              </div>
            </AnimatedDiv>
          </div>

          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
              prefersReducedMotion ? "" : "animate-bounce"
            }`}
            aria-label="Scroll down to learn more"
            role="img"
          >
            <ChevronDownIcon />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-slate-800/50" aria-labelledby="about-heading">
          <div className="container mx-auto px-4">
            <AnimatedDiv className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2
                  id="about-heading"
                  className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                >
                  Who We Are
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Compsoft Communications is a wholly owned Namibian company, specializing in converged enterprise
                  network and communications solutions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl text-red-400">Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300">
                        To become a leading end-to-end ICT solution and service provider to businesses in Southern
                        Africa using best-of-breed technologies.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl text-red-400">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300">
                        To deliver comprehensive, end-to-end ICT solutions to customers in Southern Africa, ensuring
                        service excellence with highly skilled employees.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">What We Do</h3>
                  <p className="text-slate-300 leading-relaxed">
                    We manage and operate IP-based next generation networks to deliver voice, data and hosted services
                    to our customers. We proactively partner with our customers, understanding their business objectives
                    and delivering solutions that solve their challenges.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Our comprehensive set of solutions and services in voice, data, video and converged networking
                    technologies drive bottom line benefits for our customers' business.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                      <div className="text-3xl font-bold text-cyan-400" aria-label="15 plus">
                        15+
                      </div>
                      <div className="text-sm text-slate-400">Years Experience</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                      <div className="text-3xl font-bold text-cyan-400" aria-label="500 plus">
                        500+
                      </div>
                      <div className="text-sm text-slate-400">Projects Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedDiv>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-slate-900" aria-labelledby="services-heading">
          <div className="container mx-auto px-4">
            <AnimatedDiv className="text-center mb-16">
              <h2
                id="services-heading"
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              >
                Our Services
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Comprehensive ICT solutions designed to transform your business operations and drive growth through
                cutting-edge technology.
              </p>
            </AnimatedDiv>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
              {services.map((service, index) => (
                <AnimatedDiv key={index} delay={index} role="listitem">
                  <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700 backdrop-blur-sm hover:border-cyan-500/50 focus-within:border-cyan-500/50 transition-all duration-300 group">
                    <CardHeader>
                      <div
                        className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                        aria-hidden="true"
                      >
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-slate-300">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="sr-only">Features:</h4>
                        <ul className="space-y-2" role="list">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2" role="listitem">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full" aria-hidden="true"></div>
                              <span className="text-sm text-slate-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedDiv>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-20 bg-slate-800/50" aria-labelledby="solutions-heading">
          <div className="container mx-auto px-4">
            <AnimatedDiv className="text-center mb-16">
              <h2
                id="solutions-heading"
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              >
                Solution Portfolio
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Tailored technology solutions that address your specific business challenges and drive operational
                excellence.
              </p>
            </AnimatedDiv>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Connectivity Solutions */}
              <AnimatedDiv direction="left">
                <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-cyan-400 mb-4">Connectivity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Last Mile Connectivity</h4>
                      <p className="text-sm text-slate-300">
                        Managed physical access circuits including DSL, ADSL, SAIX, fiber, Metro Ethernet and wireless
                        solutions.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Voice and Data</h4>
                      <p className="text-sm text-slate-300">
                        Comprehensive voice and data solutions for corporate and SME customers to reduce overall
                        telecommunication spend.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Business Internet Access</h4>
                      <p className="text-sm text-slate-300">
                        High performance, resilient and cost-effective Internet connectivity via our national network
                        through SAIX.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Virtual Private Network</h4>
                      <p className="text-sm text-slate-300">
                        MPLS-based VPNs with various Classes of Service enabling priority for voice and business
                        critical data.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              {/* Data Center Solutions */}
              <AnimatedDiv direction="right">
                <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-cyan-400 mb-4">Data Center Solutions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Computing</h4>
                      <p className="text-sm text-slate-300">
                        Cisco's Unified Computing System (UCS) incorporating computing infrastructure, virtualization
                        technology, networking and monitoring components.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Storage</h4>
                      <p className="text-sm text-slate-300">
                        Storage area network solutions providing enhanced data management through advanced backup,
                        recovery, and utilization capabilities.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Virtualization</h4>
                      <p className="text-sm text-slate-300">
                        Virtualization at hardware and software levels to simplify environments, improve scalability and
                        reduce overhead costs.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Cloud & Hosted Services</h4>
                      <p className="text-sm text-slate-300">
                        Public and private hosted/cloud based service offerings providing reduced capital expenditure
                        and rapid deployment.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </div>

            {/* Partners Section */}
            <AnimatedDiv className="mt-20">
              <h3 id="partners-heading" className="text-3xl font-bold text-center mb-12 text-white">
                Key Vendors and Strategic Partners
              </h3>
              <div className="bg-slate-800/30 rounded-2xl p-8 backdrop-blur-sm overflow-hidden">
                {/* Scrolling Animation Version (default) */}
                <div className={`partners-scrolling ${prefersReducedMotion ? "hidden" : ""}`}>
                  {/* First Row - Left to Right */}
                  <div className="relative mb-8" role="list" aria-labelledby="partners-heading">
                    <div className="flex animate-scroll-right space-x-8">
                      {/* Duplicate the partners array for seamless loop */}
                      {[...partners, ...partners].map((partner, index) => (
                        <div
                          key={`row1-${index}`}
                          className="flex-shrink-0 flex items-center justify-center w-32 h-20 bg-white/5 rounded-lg hover:bg-white/10 focus-within:bg-white/10 transition-colors border border-slate-700 hover:border-cyan-500/50 focus-within:border-cyan-500/50 group"
                          role="listitem"
                          tabIndex={0}
                          aria-label={`${partner.name} partner logo`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              setAnnouncement(`${partner.name} - Technology partner`)
                            }
                          }}
                        >
                          <img
                            src={partner.logo || "/placeholder.svg"}
                            alt={`${partner.name} logo`}
                            className="max-w-24 max-h-12 object-contain opacity-70 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded"
                            onError={(e) => {
                              const target = e.currentTarget
                              target.style.display = "none"
                              const parent = target.parentElement
                              if (parent) {
                                const fallback = document.createElement("span")
                                fallback.className = "text-xs font-medium text-slate-300 text-center"
                                fallback.textContent = partner.name
                                parent.appendChild(fallback)
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Second Row - Right to Left */}
                  <div className="relative" role="list" aria-labelledby="partners-heading">
                    <div className="flex animate-scroll-left space-x-8">
                      {/* Reverse and duplicate for opposite direction */}
                      {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, index) => (
                        <div
                          key={`row2-${index}`}
                          className="flex-shrink-0 flex items-center justify-center w-32 h-20 bg-white/5 rounded-lg hover:bg-white/10 focus-within:bg-white/10 transition-colors border border-slate-700 hover:border-cyan-500/50 focus-within:border-cyan-500/50 group"
                          role="listitem"
                          tabIndex={0}
                          aria-label={`${partner.name} partner logo`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              setAnnouncement(`${partner.name} - Technology partner`)
                            }
                          }}
                        >
                          <img
                            src={partner.logo || "/placeholder.svg"}
                            alt={`${partner.name} logo`}
                            className="max-w-24 max-h-12 object-contain opacity-70 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded"
                            onError={(e) => {
                              const target = e.currentTarget
                              target.style.display = "none"
                              const parent = target.parentElement
                              if (parent) {
                                const fallback = document.createElement("span")
                                fallback.className = "text-xs font-medium text-slate-300 text-center"
                                fallback.textContent = partner.name
                                parent.appendChild(fallback)
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Static Grid Version (for reduced motion users) */}
                <div className={`partners-reduced-motion ${!prefersReducedMotion ? "hidden" : ""}`}>
                  <div className="grid grid-cols-4 gap-4" role="list" aria-labelledby="partners-heading">
                    {partners.map((partner, index) => (
                      <AnimatedDiv
                        key={`static-${index}`}
                        delay={index * 0.5}
                        className="flex items-center justify-center p-4 bg-white/5 rounded-lg hover:bg-white/10 focus-within:bg-white/10 transition-colors border border-slate-700 hover:border-cyan-500/50 focus-within:border-cyan-500/50 group h-20"
                        role="listitem"
                        tabIndex={0}
                        aria-label={`${partner.name} partner logo`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            setAnnouncement(`${partner.name} - Technology partner`)
                          }
                        }}
                      >
                        <img
                          src={partner.logo || "/placeholder.svg"}
                          alt={`${partner.name} logo`}
                          className="max-w-24 max-h-12 object-contain opacity-70 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded"
                          onError={(e) => {
                            const target = e.currentTarget
                            target.style.display = "none"
                            const parent = target.parentElement
                            if (parent) {
                              const fallback = document.createElement("span")
                              fallback.className = "text-xs font-medium text-slate-300 text-center"
                              fallback.textContent = partner.name
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                      </AnimatedDiv>
                    ))}
                  </div>
                </div>

                {/* Accessibility Notice */}
                <div className="sr-only">
                  <p>Our technology partners include: {partners.map((p) => p.name).join(", ")}</p>
                </div>
              </div>
            </AnimatedDiv>
          </div>
        </section>

        {/* Clients Section */}
        <section id="clients" className="py-20 bg-slate-900" aria-labelledby="clients-heading">
          <div className="container mx-auto px-4">
            <AnimatedDiv className="text-center mb-16">
              <h2
                id="clients-heading"
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              >
                Our Clients
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Trusted by leading organizations across Southern Africa to deliver mission-critical ICT solutions and
                services.
              </p>
            </AnimatedDiv>

            <div className="bg-slate-800/30 rounded-2xl p-8 backdrop-blur-sm">
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                role="list"
                aria-labelledby="clients-heading"
              >
                {clients.map((client, index) => (
                  <AnimatedDiv
                    key={index}
                    delay={index}
                    className="flex items-center justify-center p-6 bg-white/5 rounded-lg hover:bg-white/10 focus-within:bg-white/10 transition-colors border border-slate-700 hover:border-cyan-500/50 focus-within:border-cyan-500/50 group min-h-[100px]"
                    role="listitem"
                    tabIndex={0}
                    aria-label={`${client.name} client logo`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setAnnouncement(`${client.name} - Trusted client`)
                      }
                    }}
                  >
                    <img
                      src={client.logo || "/placeholder.svg"}
                      alt={`${client.name} logo`}
                      className="max-w-full max-h-16 object-contain opacity-70 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded"
                      onError={(e) => {
                        const target = e.currentTarget
                        target.style.display = "none"
                        const parent = target.parentElement
                        if (parent) {
                          const fallback = document.createElement("span")
                          fallback.className = "text-sm font-medium text-slate-300 text-center"
                          fallback.textContent = client.name
                          parent.appendChild(fallback)
                        }
                      }}
                    />
                  </AnimatedDiv>
                ))}
              </div>
            </div>

            <AnimatedDiv delay={3} className="text-center mt-12">
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Join these industry leaders who trust Compsoft Communications to deliver innovative ICT solutions that
                drive business success.
              </p>
            </AnimatedDiv>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-slate-800/50" aria-labelledby="contact-heading">
          <div className="container mx-auto px-4">
            <AnimatedDiv className="text-center mb-16">
              <h2
                id="contact-heading"
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              >
                Get In Touch
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Ready to transform your business with cutting-edge ICT solutions? Contact our experts today for a
                consultation.
              </p>
            </AnimatedDiv>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <AnimatedDiv direction="left" className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <PhoneIcon />
                      </div>
                      <div>
                        <p className="text-white font-medium">Phone</p>
                        <a
                          href="tel:+26461123456"
                          className="text-slate-300 hover:text-cyan-400 focus:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded"
                        >
                          +264 61 123 4567
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <MailIcon />
                      </div>
                      <div>
                        <p className="text-white font-medium">Email</p>
                        <a
                          href="mailto:info@compsoft.com.na"
                          className="text-slate-300 hover:text-cyan-400 focus:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded"
                        >
                          info@compsoft.com.na
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <MapPinIcon />
                      </div>
                      <div>
                        <p className="text-white font-medium">Address</p>
                        <p className="text-slate-300">Windhoek, Namibia</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/30 rounded-lg p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-semibold text-white mb-4">Why Choose Compsoft?</h4>
                  <ul className="space-y-2 text-slate-300" role="list">
                    <li className="flex items-center space-x-2" role="listitem">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" aria-hidden="true"></div>
                      <span>15+ years of industry experience</span>
                    </li>
                    <li className="flex items-center space-x-2" role="listitem">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" aria-hidden="true"></div>
                      <span>Certified partnerships with leading vendors</span>
                    </li>
                    <li className="flex items-center space-x-2" role="listitem">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" aria-hidden="true"></div>
                      <span>24/7 support and maintenance</span>
                    </li>
                    <li className="flex items-center space-x-2" role="listitem">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" aria-hidden="true"></div>
                      <span>Local expertise, global standards</span>
                    </li>
                  </ul>
                </div>
              </AnimatedDiv>

              {/* Contact Form */}
              <AnimatedDiv direction="right">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Send us a Message</CardTitle>
                    <CardDescription className="text-slate-300">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6" onSubmit={handleFormSubmit} noValidate>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                            First Name{" "}
                            <span className="text-red-400" aria-label="required">
                              *
                            </span>
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            className={`bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                              formErrors.firstName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                            }`}
                            placeholder="John"
                            aria-invalid={formErrors.firstName ? "true" : "false"}
                            aria-describedby={formErrors.firstName ? "firstName-error" : undefined}
                          />
                          {formErrors.firstName && (
                            <p id="firstName-error" className="mt-1 text-sm text-red-400" role="alert">
                              {formErrors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                            Last Name{" "}
                            <span className="text-red-400" aria-label="required">
                              *
                            </span>
                          </label>
                          <Input
                            id="lastName"
                            name="lastName"
                            className={`bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                              formErrors.lastName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                            }`}
                            placeholder="Doe"
                            aria-invalid={formErrors.lastName ? "true" : "false"}
                            aria-describedby={formErrors.lastName ? "lastName-error" : undefined}
                          />
                          {formErrors.lastName && (
                            <p id="lastName-error" className="mt-1 text-sm text-red-400" role="alert">
                              {formErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                          Email{" "}
                          <span className="text-red-400" aria-label="required">
                            *
                          </span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          className={`bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                            formErrors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                          placeholder="john@company.com"
                          aria-invalid={formErrors.email ? "true" : "false"}
                          aria-describedby={formErrors.email ? "email-error" : undefined}
                        />
                        {formErrors.email && (
                          <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                          Company{" "}
                          <span className="text-red-400" aria-label="required">
                            *
                          </span>
                        </label>
                        <Input
                          id="company"
                          name="company"
                          className={`bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                            formErrors.company ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                          placeholder="Your Company"
                          aria-invalid={formErrors.company ? "true" : "false"}
                          aria-describedby={formErrors.company ? "company-error" : undefined}
                        />
                        {formErrors.company && (
                          <p id="company-error" className="mt-1 text-sm text-red-400" role="alert">
                            {formErrors.company}
                          </p>
                        )}
                      </div>
                      <fieldset>
                        <legend className="block text-sm font-medium text-slate-300 mb-2">Service Interest</legend>
                        <div
                          className="flex flex-wrap gap-2 mb-4"
                          role="group"
                          aria-labelledby="service-interest-legend"
                        >
                          {["Connectivity", "Security", "Data Center", "Collaboration", "Cloud"].map((service) => (
                            <Badge
                              key={service}
                              variant="outline"
                              className="cursor-pointer border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 focus:border-cyan-400 focus:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800"
                              role="checkbox"
                              aria-checked="false"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault()
                                  // Toggle selection logic would go here
                                  setAnnouncement(
                                    `${service} service ${e.currentTarget.getAttribute("aria-checked") === "true" ? "deselected" : "selected"}`,
                                  )
                                }
                              }}
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </fieldset>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                          Message{" "}
                          <span className="text-red-400" aria-label="required">
                            *
                          </span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          className={`bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 min-h-[120px] ${
                            formErrors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                          placeholder="Tell us about your project requirements..."
                          aria-invalid={formErrors.message ? "true" : "false"}
                          aria-describedby={formErrors.message ? "message-error" : undefined}
                        />
                        {formErrors.message && (
                          <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
                            {formErrors.message}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:from-cyan-600 focus:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800"
                      >
                        Send Message
                        <ArrowRightIcon />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/images/compsoft-logo.jpg"
                  alt="Compsoft Communications Logo"
                  className="w-12 h-12 object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent) {
                      const fallback = document.createElement("div")
                      fallback.className =
                        "w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center"
                      fallback.innerHTML = '<span class="text-white font-bold text-xs">CS</span>'
                      parent.appendChild(fallback)
                    }
                  }}
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-100">compsoft</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">COMMUNICATIONS</p>
                </div>
              </div>
              <p className="text-slate-300 mb-4 max-w-md">
                Leading ICT solutions provider in Southern Africa, delivering comprehensive technology solutions that
                drive business success.
              </p>
              <p className="text-sm text-slate-400">© 2024 Compsoft Communications. All rights reserved.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
              <nav aria-label="Footer services navigation">
                <ul className="space-y-2 text-slate-300" role="list">
                  <li role="listitem">
                    <a
                      href="#services"
                      className="hover:text-cyan-400 focus:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("services")
                      }}
                    >
                      Connectivity
                    </a>
                  </li>
                  <li role="listitem">
                    <a
                      href="#services"
                      className="hover:text-cyan-400 focus:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("services")
                      }}
                    >
                      Security
                    </a>
                  </li>
                  <li role="listitem">
                    <a
                      href="#services"
                      className="hover:text-cyan-400 focus:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("services")
                      }}
                    >
                      Data Center
                    </a>
                  </li>
                  <li role="listitem">
                    <a
                      href="#services"
                      className="hover:text-cyan-400 focus:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("services")
                      }}
                    >
                      Collaboration
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <address className="not-italic">
                <ul className="space-y-2 text-slate-300" role="list">
                  <li role="listitem">
                    <a
                      href="tel:+26461123456"
                      className="hover:text-cyan-400 focus:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                    >
                      +264 61 123 4567
                    </a>
                  </li>
                  <li role="listitem">
                    <a
                      href="mailto:info@compsoft.com.na"
                      className="hover:text-cyan-400 focus:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                    >
                      info@compsoft.com.na
                    </a>
                  </li>
                  <li role="listitem">Windhoek, Namibia</li>
                </ul>
              </address>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
