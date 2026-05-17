import React from "react";
import HeroSection from '../components/home/HeroSection'
import CategoriesSection from '../components/home/CategoriesSection'
import QuickFeatures from '../components/home/QuickFeatures'
import FeaturedRecipes from '../components/home/FeaturedRecipes'

const Home = () => {

  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <FeaturedRecipes />
      <QuickFeatures />
    </main>
  );
};

export default Home;

