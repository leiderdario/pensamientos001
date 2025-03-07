
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import IdeaCard from '@/components/ideas/IdeaCard';
import Tag from '@/components/ui/Tag';
import SearchBar from '@/components/ui/SearchBar';
import { MOCK_IDEAS, TRENDING_TAGS } from '@/lib/models';
import { ChevronRight, Lightbulb, TrendingUp, Search } from 'lucide-react';

const Index = () => {
  const [featuredIdeas] = useState(MOCK_IDEAS.slice(0, 3));
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent z-0" />
        
        <div className="page-container relative z-10 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Where ideas take shape and grow
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 md:mb-10">
                Share your ideas, connect with like-minded thinkers, and discover inspiring concepts from around the world.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Button asChild size="lg" className="btn-primary">
                  <Link to="/ideas/new">Share your idea</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="btn-outline">
                  <Link to="/ideas">Explore ideas</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="max-w-xl mx-auto">
                <SearchBar 
                  placeholder="Search for ideas, topics, or tags..."
                  showSubmitButton
                  roundedFull
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Ideas Section */}
      <section className="section bg-secondary/30">
        <div className="page-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider bg-accent/10 text-accent-foreground px-3 py-1 rounded-full">
                  Featured
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Trending ideas
              </h2>
              <p className="text-muted-foreground mt-2">
                Discover what's capturing everyone's imagination
              </p>
            </div>
            
            <Button asChild variant="ghost" className="group">
              <Link to="/ideas" className="flex items-center gap-1">
                View all 
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featuredIdeas.map(idea => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Why Use IdeaExchange Section */}
      <section className="section">
        <div className="page-container">
          <div className="text-center mb-12">
            <div className="inline-block bg-muted rounded-full p-3 mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Why use ideaexchange?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A platform designed for creative minds to connect, share, and elevate ideas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Topics Section */}
      <section className="section bg-secondary/30">
        <div className="page-container">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold">
              Explore trending topics
            </span>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {TRENDING_TAGS.map(tag => (
              <Tag 
                key={tag.name} 
                name={tag.name} 
                count={tag.count} 
                size="lg" 
                variant="accent"
              />
            ))}
          </div>
          
          <Button asChild variant="outline" className="mt-2">
            <Link to="/tags">View all topics</Link>
          </Button>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Ready to share your ideas with the world?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community of thinkers, innovators, and creators.
            </p>
            <Button asChild size="lg" className="btn-primary">
              <Link to="/ideas/new">Get started</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Features data
const features = [
  {
    title: "Share Your Thoughts",
    description: "Post your ideas in a supportive environment designed for meaningful engagement.",
    icon: Lightbulb
  },
  {
    title: "Connect & Collaborate",
    description: "Find like-minded thinkers and potential collaborators for your next big project.",
    icon: TrendingUp
  },
  {
    title: "Discover Inspiration",
    description: "Explore a world of creative concepts that might spark your next breakthrough.",
    icon: Search
  }
];

export default Index;
