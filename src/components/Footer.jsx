import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="app-footer print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start text-left">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--primary-color)] text-[var(--bg-primary)] text-lg" aria-hidden>🍴</span>
              <div>
                <h2 className="text-2xl font-bold text-(--text-primary)">Cooking Boss</h2>
                <p className="text-sm text-(--text-secondary)">Find amazing recipes, save favorites, and cook with confidence.</p>
                <p className="text-sm text-[var(--primary-color)] mt-1 italic">Where taste meets mystry.</p>
              </div>
            </div>
            <p className="text-(--text-secondary) text-sm leading-relaxed">
              Discover recipes from every cuisine, curated collections, and easy meal ideas for every day.
            </p>
          </div>

          <div>
            <h3 className="text-(--text-primary) text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-3 text-(--text-secondary) text-sm">
              <li>
                <Link to="/recipes" className="hover:text-[var(--primary-color)] transition">All Recipes</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[var(--primary-color)] transition">Categories</Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-[var(--primary-color)] transition">Favorites</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--primary-color)] transition">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-(--text-primary) text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-(--text-secondary) text-sm">
              <li>
                <Link to="/contact" className="hover:text-[var(--primary-color)] transition">Contact</Link>
              </li>
              <li>
                <Link to="/privacy-terms" className="hover:text-[var(--primary-color)] transition">Privacy & Terms</Link>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary-color)] transition">Help Center</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-(--text-secondary) text-sm">
          <span>{'\u00A9'} {new Date().getFullYear()} Cooking Boss. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4">
            <Link to="/privacy-terms" className="hover:text-(--text-primary) transition">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-(--text-primary) transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
