import React, { useEffect } from 'react'
import { FaShieldAlt, FaEye, FaDatabase, FaLock, FaExclamationTriangle } from 'react-icons/fa'

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy - Cooking Boss'
  }, [])
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-6">
            <FaShieldAlt className="text-[#ff6b6b] text-lg" />
            <span className="text-[#ff6b6b] font-medium">Privacy Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--text-primary) mb-6">
            Your <span className="text-[#ff6b6b]">Privacy</span> Matters
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Introduction</h2>
            <p className="text-slate-400 leading-relaxed">
              Cooking Boss ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our cooking 
              recipe application. Please read this policy carefully.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center">
                <FaDatabase className="text-[#ff6b6b] text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-(--text-primary)">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-slate-400">
              <div>
                <h3 className="text-(--text-primary) font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email address (if you contact us)</li>
                  <li>Name (if you provide it)</li>
                  <li>Any information you voluntarily provide</li>
                </ul>
              </div>
              <div>
                <h3 className="text-(--text-primary) font-semibold mb-2">Usage Data</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Pages visited and features used</li>
                  <li>Search queries and recipes viewed</li>
                  <li>Device information and browser type</li>
                  <li>IP address and approximate location</li>
                </ul>
              </div>
              <div>
                <h3 className="text-(--text-primary) font-semibold mb-2">Stored Data</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Favorited recipes (stored locally on your device)</li>
                  <li>Shopping lists (stored locally on your device)</li>
                  <li>App preferences and settings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center">
                <FaEye className="text-[#ff6b6b] text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-(--text-primary)">How We Use Your Information</h2>
            </div>
            <ul className="space-y-3 text-slate-400 list-disc list-inside ml-4">
              <li>To provide and maintain our service</li>
              <li>To improve user experience and app functionality</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To analyze usage patterns and optimize performance</li>
              <li>To detect and prevent technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          {/* Data Sharing */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center">
                <FaLock className="text-[#ff6b6b] text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-(--text-primary)">Data Sharing & Disclosure</h2>
            </div>
            <div className="space-y-4 text-slate-400">
              <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>With Service Providers:</strong> Third-party services that help us operate our app (e.g., recipe APIs)</li>
                <li><strong>For Legal Reasons:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share</li>
              </ul>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Third-Party Services</h2>
            <p className="text-slate-400 mb-4">
              Our app integrates with the following third-party services to provide recipe data:
            </p>
            <ul className="space-y-2 text-slate-400 list-disc list-inside ml-4">
              <li><strong>TheMealDB</strong> - Recipe database</li>
              <li><strong>Spoonacular</strong> - Smart search and ingredient analysis</li>
              <li><strong>Edamam</strong> - Nutrition information</li>
              <li><strong>Tasty API</strong> - Cooking videos</li>
              <li><strong>API Ninjas</strong> - Ingredient-based recipes</li>
            </ul>
            <p className="text-slate-400 mt-4">
              These services have their own privacy policies. We encourage you to review them.
            </p>
          </div>

          {/* Data Security */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center">
                <FaShieldAlt className="text-[#ff6b6b] text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-(--text-primary)">Data Security</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We implement appropriate security measures to protect your information. However, no method of 
              transmission over the internet is 100% secure. While we strive to protect your data, we cannot 
              guarantee absolute security.
            </p>
          </div>

          {/* Your Rights */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Your Rights</h2>
            <p className="text-slate-400 mb-4">You have the right to:</p>
            <ul className="space-y-2 text-slate-400 list-disc list-inside ml-4">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Cookies & Local Storage</h2>
            <p className="text-slate-400 leading-relaxed">
              We use cookies and local storage to enhance your experience, remember your preferences, and 
              analyze app usage. You can control cookies through your browser settings. Note that disabling 
              cookies may affect some features of our app.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center">
                <FaExclamationTriangle className="text-[#ff6b6b] text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-(--text-primary)">Children's Privacy</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Our service is not intended for children under 13. We do not knowingly collect personal 
              information from children under 13. If you are a parent or guardian and believe your child 
              has provided us with personal information, please contact us.
            </p>
          </div>

          {/* Changes to Policy */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Changes to This Policy</h2>
            <p className="text-slate-400 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new policy on this page and updating the "Last updated" date.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Contact Us</h2>
            <p className="text-slate-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-[#ff6b6b] font-medium mt-2">support@cookingboss.com</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PrivacyPolicy
