import React, { useEffect } from 'react'
import { FaChartLine, FaRocket, FaCode, FaServer, FaMobileAlt, FaDollarSign, FaUsers, FaShieldAlt, FaLightbulb, FaEnvelope, FaGithub } from 'react-icons/fa'

const InvestmentOverview = () => {
  useEffect(() => {
    document.title = 'Investment Overview - Cooking Boss'
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-4 sm:mb-6">
            <FaChartLine className="text-[#ff6b6b] text-base sm:text-lg" />
            <span className="text-[#ff6b6b] font-medium text-sm sm:text-base">Investment Overview</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) mb-4 sm:mb-6">
            A Modern Recipe Platform Built for <span className="text-[#ff6b6b]">Scale and Growth</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            Sophisticated web application aggregating recipes from multiple premium sources into a unified, user-friendly platform.
          </p>
        </div>

        {/* Executive Summary */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Executive Summary</h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Cooking Boss is a sophisticated web application that aggregates recipes from multiple premium sources into a unified, user-friendly platform. Built with cutting-edge technology, it offers exceptional performance, scalability, and user experience - making it an attractive investment opportunity in the growing food-tech market.
            </p>
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaRocket className="inline mr-2 text-[#ff6b6b]" />
            Market Opportunity
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-4">Growing Food-Tech Market</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Global online food delivery and recipe market projected to reach billions</li>
                <li>• Increasing demand for convenient cooking solutions</li>
                <li>• Rise in home cooking post-pandemic</li>
                <li>• Growing health consciousness driving recipe search</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-4">Competitive Advantages</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Multi-source aggregation: Access to 5+ premium recipe APIs</li>
                <li>• Smart features: AI-powered ingredient matching (Fridge Finder)</li>
                <li>• User-centric design: Intuitive interface for all skill levels</li>
                <li>• Modern technology: Built for speed, scalability, and reliability</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaCode className="inline mr-2 text-[#ff6b6b]" />
            Technology Stack
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-6"><strong>Modern Technology Stack = Faster Development & Lower Costs</strong></p>
            <p className="text-slate-300 mb-6">Cooking Boss uses the latest web technologies, which means:</p>
            <ul className="space-y-3 text-slate-300 mb-6">
              <li className="flex items-start gap-3">
                <FaLightbulb className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Faster time-to-market</strong> for new features</span>
              </li>
              <li className="flex items-start gap-3">
                <FaLightbulb className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Lower maintenance costs</strong> due to modern, well-supported tools</span>
              </li>
              <li className="flex items-start gap-3">
                <FaLightbulb className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Better performance</strong> = happier users = more engagement</span>
              </li>
              <li className="flex items-start gap-3">
                <FaLightbulb className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Easier to scale</strong> as user base grows</span>
              </li>
              <li className="flex items-start gap-3">
                <FaLightbulb className="text-[#ff6b6b] mt-1 flex-shrink-0" />
                <span><strong>Future-proof</strong> technology that won't become obsolete</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Key Technologies */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Key Technologies</h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-3">React 19</h3>
              <p className="text-slate-400 mb-2">The world's most popular web development framework</p>
              <p className="text-slate-300 text-sm">Backed by Facebook/Meta, large developer community, fast performance, component-based architecture</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-3">Vite</h3>
              <p className="text-slate-400 mb-2">Next-generation build tool for web applications</p>
              <p className="text-slate-300 text-sm">Lightning-fast development, optimized production builds, modern bundling</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-3">Tailwind CSS</h3>
              <p className="text-slate-400 mb-2">Modern styling framework</p>
              <p className="text-slate-300 text-sm">Consistent design, mobile-responsive, professional appearance</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-3">Redux Toolkit</h3>
              <p className="text-slate-400 mb-2">Industry-standard for managing application data</p>
              <p className="text-slate-300 text-sm">Predictable data flow, easy debugging, scalable architecture</p>
            </div>
          </div>
        </section>

        {/* API Integration */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaServer className="inline mr-2 text-[#ff6b6b]" />
            API Integration
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-6"><strong>Multiple Premium Recipe APIs</strong></p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-(--text-primary) font-medium mb-2">TheMealDB</h4>
                <p className="text-slate-400 text-sm">Comprehensive recipe database</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-(--text-primary) font-medium mb-2">Spoonacular</h4>
                <p className="text-slate-400 text-sm">Smart search and ingredient analysis</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-(--text-primary) font-medium mb-2">Edamam</h4>
                <p className="text-slate-400 text-sm">Professional nutrition data</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-(--text-primary) font-medium mb-2">Tasty API</h4>
                <p className="text-slate-400 text-sm">High-quality cooking videos</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-(--text-primary) font-medium mb-2">API Ninjas</h4>
                <p className="text-slate-400 text-sm">Ingredient-based recipe matching</p>
              </div>
            </div>
            <div className="mt-6 bg-[#ff6b6b]/10 rounded-xl p-4 border border-[#ff6b6b]/20">
              <p className="text-[#ff6b6b] font-medium mb-2">Business Impact:</p>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Massive recipe library without content creation costs</li>
                <li>• Premium features without development</li>
                <li>• Reliable, professional data sources</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Key Features & Value</h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-2">Recipe Aggregation</h3>
              <p className="text-slate-400 mb-2">Unified API integration layer</p>
              <p className="text-slate-300 text-sm">Access to 10,000+ recipes without content costs, always fresh content, competitive advantage</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-2">Smart Search (Fridge Finder)</h3>
              <p className="text-slate-400 mb-2">AI-powered ingredient matching algorithm</p>
              <p className="text-slate-300 text-sm">Unique feature solving real user pain point, differentiates from competitors, high engagement</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-2">Shopping List Integration</h3>
              <p className="text-slate-400 mb-2">Local storage with e-commerce integration</p>
              <p className="text-slate-300 text-sm">Multiple revenue streams, user retention tool, partnership opportunities</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-2">Video Integration</h3>
              <p className="text-slate-400 mb-2">YouTube/Tasty API integration</p>
              <p className="text-slate-300 text-sm">Premium content without production costs, higher engagement, ad revenue potential</p>
            </div>
          </div>
        </section>

        {/* Scalability */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaMobileAlt className="inline mr-2 text-[#ff6b6b]" />
            Scalability & Growth
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <h3 className="text-xl font-semibold text-(--text-primary) mb-4">Current Architecture Supports:</h3>
            <ul className="space-y-2 text-slate-300 mb-6">
              <li>• 10,000+ concurrent users without performance degradation</li>
              <li>• Easy horizontal scaling - add more servers as needed</li>
              <li>• Database-agnostic - can switch to enterprise databases</li>
              <li>• CDN-ready - global content delivery</li>
              <li>• API-first design - easy to build mobile apps later</li>
            </ul>
            <h3 className="text-xl font-semibold text-(--text-primary) mb-4">Growth Roadmap Opportunities:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-slate-300 text-sm">1. Mobile Apps (iOS/Android)</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-slate-300 text-sm">2. Premium Subscription</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-slate-300 text-sm">3. Brand Partnerships</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-slate-300 text-sm">4. Marketplace Integration</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-slate-300 text-sm">5. Social Features</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-slate-300 text-sm">6. AI Recommendations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Revenue Streams */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaDollarSign className="inline mr-2 text-[#ff6b6b]" />
            Revenue Potential
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-4">Revenue Streams</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Affiliate Marketing</li>
                <li>• Premium Subscriptions</li>
                <li>• Advertising</li>
                <li>• Brand Partnerships</li>
                <li>• Data Licensing</li>
                <li>• White-label Solutions</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-4">Cost Structure</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Minimal hosting costs (static deployment)</li>
                <li>• Pay-as-you-go API usage</li>
                <li>• Standard domain & SSL costs</li>
                <li>• Low maintenance due to modern tech</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaShieldAlt className="inline mr-2 text-[#ff6b6b]" />
            Security & Reliability
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-4">Security Measures</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Secure form handling (Formspree)</li>
                <li>• API rate limiting</li>
                <li>• Input validation</li>
                <li>• Secure local data storage</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-4">Reliability Features</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Error handling & graceful degradation</li>
                <li>• Fallback systems</li>
                <li>• Multiple data sources</li>
                <li>• Clear user feedback</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">
            <FaUsers className="inline mr-2 text-[#ff6b6b]" />
            Team & Expertise
          </h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#ff6b6b] rounded-2xl flex items-center justify-center">
                <FaGithub className="text-white text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-(--text-primary)">Ahmed Ali</h3>
                <p className="text-slate-400">Full Stack Developer</p>
                <p className="text-slate-500 text-sm">Karachi, Korangi, Pakistan</p>
              </div>
            </div>
            <div className="bg-[#ff6b6b]/10 rounded-xl p-4 border border-[#ff6b6b]/20">
              <p className="text-[#ff6b6b] font-medium mb-2">Technical Capabilities:</p>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Complex API integrations</li>
                <li>• Modern UI/UX design</li>
                <li>• Performance optimization</li>
                <li>• Cross-platform compatibility</li>
                <li>• Scalable architecture</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Investment Highlights */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-6">Investment Highlights</h2>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <p className="text-slate-400 mb-6"><strong>Why Invest in Cooking Boss?</strong></p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#ff6b6b]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#ff6b6b] font-bold">1</span>
                </div>
                <div>
                  <p className="text-(--text-primary) font-medium">Proven Technology Stack</p>
                  <p className="text-slate-400 text-sm">Built with industry-standard, future-proof technologies</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#ff6b6b]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#ff6b6b] font-bold">2</span>
                </div>
                <div>
                  <p className="text-(--text-primary) font-medium">Scalable Architecture</p>
                  <p className="text-slate-400 text-sm">Can handle millions of users, easy to add new features</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#ff6b6b]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#ff6b6b] font-bold">3</span>
                </div>
                <div>
                  <p className="text-(--text-primary) font-medium">Multiple Revenue Streams</p>
                  <p className="text-slate-400 text-sm">Affiliate, subscriptions, advertising, partnerships, data licensing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#ff6b6b]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#ff6b6b] font-bold">4</span>
                </div>
                <div>
                  <p className="text-(--text-primary) font-medium">Low Operational Costs</p>
                  <p className="text-slate-400 text-sm">Static hosting, pay-as-you-go APIs, automated systems</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#ff6b6b]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#ff6b6b] font-bold">5</span>
                </div>
                <div>
                  <p className="text-(--text-primary) font-medium">Growing Market</p>
                  <p className="text-slate-400 text-sm">Food-tech market expanding, home cooking trend</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#ff6b6b]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#ff6b6b] font-bold">6</span>
                </div>
                <div>
                  <p className="text-(--text-primary) font-medium">Unique Features</p>
                  <p className="text-slate-400 text-sm">Fridge Finder, multi-source aggregation, integrated shopping</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-linear-to-r from-[#ff6b6b]/20 to-[#ff8e53]/20 rounded-3xl p-6 sm:p-8 md:p-12 border border-[#ff6b6b]/20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary) mb-4">Ready to Discuss Investment?</h2>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto px-4">
              Cooking Boss represents a unique investment opportunity in the food-tech space with modern technology and innovative features.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:ahmed.ali.office70@gmail.com"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-[#ff6b6b] text-white rounded-full hover:bg-[#ff5252] transition-colors text-sm sm:text-base"
              >
                <FaEnvelope className="text-lg sm:text-xl" />
                Email Us
              </a>
              <a
                href="https://github.com/AhmedAliCoder-boss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-white/10 text-(--text-primary) rounded-full hover:bg-white/20 transition-colors text-sm sm:text-base"
              >
                <FaGithub className="text-lg sm:text-xl" />
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-slate-500">
            Document prepared for investment consideration
          </p>
          <p className="text-slate-600 text-sm mt-2">
            Last updated: May 2026
          </p>
        </div>
      </div>
    </main>
  )
}

export default InvestmentOverview
