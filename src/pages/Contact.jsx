import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCommentAlt, FaExternalLinkAlt, FaGlobe, FaCheckCircle } from 'react-icons/fa'

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact Us - Cooking Boss'
  }, [])
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('https://formspree.io/f/meedzvwv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email Us',
      value: 'ahmed.ali.office70@gmail.com',
      link: 'mailto:ahmed.ali.office70@gmail.com',
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      value: '+92 3702629117',
      link: 'tel:+923702629117',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'Karachi, Korangi, Pakistan',
      link: null,
    },
  ]

  const socialLinks = [
    { icon: FaExternalLinkAlt, name: 'Website', link: 'https://cookingboss.com' },
    { icon: FaGlobe, name: 'Blog', link: 'https://blog.cookingboss.com' },
    { icon: FaCommentAlt, name: 'Community', link: 'https://discord.com' },
  ]

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-6">
            <FaCommentAlt className="text-[#ff6b6b] text-lg" />
            <span className="text-[#ff6b6b] font-medium">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--text-primary) mb-6">
            Contact <span className="text-[#ff6b6b]">Us</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#ff6b6b]/30 transition-all"
              >
                <div className="w-12 h-12 bg-[#ff6b6b]/10 rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="text-[#ff6b6b] text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-(--text-primary) mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-slate-400 hover:text-[#ff6b6b] transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-slate-400">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-6">Send us a Message</h2>
            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                <FaCheckCircle className="text-green-400 text-4xl mx-auto mb-3" />
                <p className="text-green-400 text-lg font-medium">Thank you!</p>
                <p className="text-green-400/80 text-sm mt-1">Your message has been sent successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-(--text-primary) placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-(--text-primary) placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-(--text-primary) placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-(--text-primary) placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#ff6b6b] text-white rounded-xl hover:bg-[#ff5252] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#ff6b6b]"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-xl" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-(--text-primary) mb-6">Follow Us</h2>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#ff6b6b] hover:bg-white/20 transition-all"
              >
                <social.icon className="text-2xl" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
