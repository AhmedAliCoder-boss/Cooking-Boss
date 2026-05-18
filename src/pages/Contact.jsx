import React, { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, ExternalLink, Globe } from 'lucide-react'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'support@cookingboss.com',
      link: 'mailto:support@cookingboss.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'San Francisco, CA',
      link: null,
    },
  ]

  const socialLinks = [
    { icon: ExternalLink, name: 'Website', link: 'https://cookingboss.com' },
    { icon: Globe, name: 'Blog', link: 'https://blog.cookingboss.com' },
    { icon: MessageSquare, name: 'Community', link: 'https://discord.com' },
  ]

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-6">
            <MessageSquare className="text-[#ff6b6b]" size={20} />
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
                  <info.icon className="text-[#ff6b6b]" size={24} />
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
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <p className="text-green-400">Thank you! Your message has been sent successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-(--text-primary) placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-(--text-primary) placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-(--text-primary) placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-(--text-primary) placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#ff6b6b] text-white rounded-xl hover:bg-[#ff5252] transition-colors font-medium"
                >
                  <Send size={20} />
                  Send Message
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
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
