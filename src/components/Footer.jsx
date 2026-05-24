import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaHeart, FaUtensils, FaStar, FaPaperPlane, FaExternalLinkAlt, FaCommentDots, FaGlobe } from "react-icons/fa";
import newsletterBg from '../images/newsletterbg.jpg';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribing(true);
    setError("");

    try {
      const response = await fetch('https://formspree.io/f/mpqnlkee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          subject: 'Newsletter Subscription',
          message: 'User subscribed to newsletter',
          _subject: 'New Newsletter Subscription'
        })
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 5000);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  const socialLinks = [
    { icon: FaExternalLinkAlt, name: "Website", href: "https://cookingboss.com" },
    { icon: FaCommentDots, name: "Community", href: "https://discord.com" },
    { icon: FaGlobe, name: "Blog", href: "https://blog.cookingboss.com" },
  ];

  const quickStats = [
    { icon: FaUtensils, value: "10K+", label: "Recipes" },
    { icon: FaHeart, value: "50+", label: "Cuisines" },
    { icon: FaStar, value: "5", label: "API Sources" },
  ];

  return (
    <footer className="app-footer print:hidden bg-slate-900 border-t border-white/10">
      {/* Newsletter Section */}
      <div 
        className="border-b border-none bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${newsletterBg})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b6b]/10 rounded-full mb-4">
              <FaEnvelope className="text-[#ff6b6b] text-lg" />
              <span className="text-[#ff6b6b] font-medium text-sm">Stay Updated</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Get Recipe Inspiration Weekly
            </h3>
            <p className="text-slate-400 mb-6">
              Join our newsletter and discover new recipes, cooking tips, and exclusive content.
            </p>
            {subscribed ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400">
                Thanks for subscribing! 🎉
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={subscribing}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-6 py-3 bg-[#ff6b6b] text-white rounded-xl hover:bg-[#ff5252] transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#ff6b6b]"
                >
                  {subscribing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-lg" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
            )}
            {error && (
              <div className="mt-3 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#ff6b6b] rounded-xl flex items-center justify-center">
                <FaUtensils className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Cooking Boss</h2>
                <p className="text-sm text-[#ff6b6b]">Where taste meets mystery</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Discover recipes from every cuisine, curated collections, and easy meal ideas for every day. 
              Your ultimate cooking companion powered by 5 different recipe APIs.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#ff6b6b] hover:bg-white/20 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/recipes" className="text-slate-400 hover:text-[#ff6b6b] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full" />
                  All Recipes
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-slate-400 hover:text-[#ff6b6b] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full" />
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/fridge-finder" className="text-slate-400 hover:text-[#ff6b6b] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full" />
                  Fridge Finder
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-slate-400 hover:text-[#ff6b6b] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full" />
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-slate-400 hover:text-[#ff6b6b] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full" />
                  Cooking Videos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-slate-400 hover:text-[#ff6b6b] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-[#ff6b6b] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-[#ff6b6b] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-[#ff6b6b] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-[#ff6b6b] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Stats */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Our Impact</h3>
            <div className="space-y-4">
              {quickStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ff6b6b]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <stat.icon className="text-[#ff6b6b] text-xl" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{stat.value}</p>
                    <p className="text-slate-400 text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
            <p className="flex items-center gap-2">
              © {new Date().getFullYear()} Cooking Boss. Made with{" "}
              <FaHeart className="text-[#ff6b6b] fill-[#ff6b6b] text-sm" />
              for food lovers everywhere.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-[#ff6b6b] transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-[#ff6b6b] transition-colors">
                Terms
              </Link>
              <Link to="/contact" className="hover:text-[#ff6b6b] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
