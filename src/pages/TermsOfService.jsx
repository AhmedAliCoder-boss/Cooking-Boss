import React, { useEffect } from 'react'
import { File, AlertTriangle, CheckCircle, XCircle, Gavel } from 'lucide-react'

const TermsOfService = () => {
  useEffect(() => {
    document.title = 'Terms of Service - Cooking Boss'
  }, [])
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-6">
            <File className="text-[#ff6b6b]" size={20} />
            <span className="text-[#ff6b6b] font-medium">Terms of Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--text-primary) mb-6">
            Terms of <span className="text-[#ff6b6b]">Service</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Agreement to Terms */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-[#ff6b6b]" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-(--text-primary)">Agreement to Terms</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              By accessing or using Cooking Boss, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </div>

          {/* Description of Service */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Description of Service</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Cooking Boss is a recipe discovery and management application that provides:
            </p>
            <ul className="space-y-2 text-slate-400 list-disc list-inside ml-4">
              <li>Access to recipes from multiple sources</li>
              <li>Recipe search and filtering capabilities</li>
              <li>Ingredient-based recipe recommendations</li>
              <li>Nutrition information for recipes</li>
              <li>Recipe saving and favoriting features</li>
              <li>Shopping list management</li>
            </ul>
          </div>

          {/* User Responsibilities */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-[#ff6b6b]" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-(--text-primary)">User Responsibilities</h2>
            </div>
            <p className="text-slate-400 mb-4">As a user of Cooking Boss, you agree to:</p>
            <ul className="space-y-2 text-slate-400 list-disc list-inside ml-4">
              <li>Use the service for personal, non-commercial purposes</li>
              <li>Provide accurate information when required</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not use the service to distribute malware or harmful content</li>
              <li>Not interfere with the operation of the service</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </div>

          {/* Prohibited Activities */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                <XCircle className="text-red-500" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-(--text-primary)">Prohibited Activities</h2>
            </div>
            <p className="text-slate-400 mb-4">You may not:</p>
            <ul className="space-y-2 text-slate-400 list-disc list-inside ml-4">
              <li>Reverse engineer, decompile, or disassemble the application</li>
              <li>Copy, modify, or distribute our code or content without permission</li>
              <li>Use automated tools to access the service excessively</li>
              <li>Impersonate any person or entity</li>
              <li>Violate any applicable local, state, national, or international law</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Submit false or misleading information</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center">
                <Gavel className="text-[#ff6b6b]" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-(--text-primary)">Intellectual Property</h2>
            </div>
            <div className="space-y-4 text-slate-400">
              <p>
                <strong>Our Content:</strong> The application design, code, and original content are owned by 
                Cooking Boss and protected by copyright laws.
              </p>
              <p>
                <strong>Third-Party Content:</strong> Recipes and other content provided by third-party APIs 
                (TheMealDB, Spoonacular, Edamam, Tasty, API Ninjas) remain the property of their respective owners.
              </p>
              <p>
                <strong>User Content:</strong> Any content you submit (reviews, comments, etc.) grants us a 
                non-exclusive, royalty-free license to use, display, and distribute it.
              </p>
            </div>
          </div>

          {/* Disclaimer of Warranties */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Disclaimer of Warranties</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Cooking Boss is provided "as is" and "as available" without warranties of any kind, either 
              express or implied. We do not warrant that:
            </p>
            <ul className="space-y-2 text-slate-400 list-disc list-inside ml-4">
              <li>The service will be uninterrupted or error-free</li>
              <li>Defects will be corrected</li>
              <li>The service is free of viruses or harmful components</li>
              <li>The results of using the service will meet your requirements</li>
              <li>Nutrition information is accurate or complete</li>
            </ul>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Limitation of Liability</h2>
            <p className="text-slate-400 leading-relaxed">
              To the maximum extent permitted by law, Cooking Boss shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including but not limited to loss of 
              profits, data, or other intangible losses, resulting from your use or inability to use the service.
            </p>
          </div>

          {/* Recipe Information Disclaimer */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-yellow-500" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-(--text-primary)">Recipe Information Disclaimer</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Recipe information, including ingredients, cooking instructions, and nutrition data, is provided 
              for informational purposes only. We make no guarantees about the accuracy, completeness, or 
              suitability of this information. Always consult a qualified professional for dietary advice, 
              especially if you have allergies or health conditions.
            </p>
          </div>

          {/* Termination */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Termination</h2>
            <p className="text-slate-400 leading-relaxed">
              We reserve the right to terminate or suspend your access to the service at any time, with or 
              without cause, with or without notice. Upon termination, your right to use the service will 
              immediately cease.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Governing Law</h2>
            <p className="text-slate-400 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
              in which Cooking Boss operates, without regard to its conflict of law provisions.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Changes to Terms</h2>
            <p className="text-slate-400 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of significant 
              changes by posting the new terms on this page. Your continued use of the service after such 
              modifications constitutes your acceptance of the new terms.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-(--text-primary) mb-4">Contact Us</h2>
            <p className="text-slate-400 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-[#ff6b6b] font-medium mt-2">support@cookingboss.com</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TermsOfService
