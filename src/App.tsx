import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  BookOpen,
  Monitor,
  Key,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Users,
  Globe,
  ArrowRight,
  Menu,
  X,
  Shield,
  Zap,
  Target,
  Rocket,
  ChevronLeft,
  Twitter,
  Instagram,
  Linkedin,
  Facebook
} from "lucide-react";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'EDR Model', href: '#edr' },
    { name: 'Products', href: '#products' },
    { name: 'Phases', href: '#phases' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <img src="../Logo.png" alt="K-HUB Logo" className="h-10 w-auto" referrerPolicy="no-referrer" />
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold text-white/80 hover:text-khub-orange transition-colors tracking-wide uppercase"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-khub-blue text-white px-7 py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(77,150,255,0.3)]"
              >
                JOIN NOW
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass-nav absolute top-full left-0 w-full border-t border-white/10"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-lg font-bold text-white hover:text-khub-orange"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-khub-dark">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[100%] h-[100%] bg-gradient-to-br from-khub-orange/20 to-transparent rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [0, -50, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -right-1/4 w-[100%] h-[100%] bg-gradient-to-tl from-khub-blue/20 to-transparent rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y, opacity }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 glass-card px-6 py-2 rounded-full mb-10 border-white/20"
            >
              <div className="w-2 h-2 bg-khub-orange rounded-full animate-pulse" />
              <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Next-Gen Digital Ecosystem</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl sm:text-7xl md:text-9xl font-black text-white leading-[0.85] mb-10 tracking-tighter"
            >
              THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-khub-orange to-khub-blue">FUTURE</span> <br />
              IS HUB.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl text-white/50 mb-12 max-w-xl leading-relaxed font-medium"
            >
              Empowering 600+ centers with a unique EDR model that bridges education, digital infrastructure, and rural reach.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <a href="#contact" className="px-8 sm:px-12 py-4 sm:py-6 bg-white text-khub-dark rounded-2xl font-black hover:bg-khub-orange hover:text-white transition-all shadow-2xl flex items-center justify-center sm:justify-start gap-4 group text-sm sm:text-base">
                GET STARTED <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="#edr" className="px-8 sm:px-12 py-4 sm:py-6 glass-card text-white rounded-2xl font-black hover:bg-white/10 transition-all border-white/10 text-center text-sm sm:text-base">
                OUR MODEL
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative perspective-2000 hidden lg:block"
          >
            <div className="relative preserve-3d transform hover:rotate-y-12 hover:rotate-x-6 transition-transform duration-1000 ease-in-out">
              <div className="rounded-[4rem] overflow-hidden border border-white/20 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.9)] bg-khub-dark/50 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200" 
                  alt="Future Tech" 
                  className="w-full h-auto opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 glass-card p-10 rounded-[3rem] shadow-2xl border-white/20 backdrop-blur-3xl z-20"
              >
                <div className="text-6xl font-black text-khub-orange mb-2">600+</div>
                <div className="text-sm font-bold text-white/40 uppercase tracking-[0.2em]">Live Hubs</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-12 -left-12 glass-card p-10 rounded-[3rem] shadow-2xl border-white/20 backdrop-blur-3xl z-20"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                  <div className="text-4xl font-black text-white">ACTIVE</div>
                </div>
                <div className="text-sm font-bold text-white/40 uppercase tracking-[0.2em]">National Network</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProductCarousel = () => {

  const [index, setIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    {
      title: 'Digital Library',
      icon: <BookOpen />,
      desc: 'Access thousands of resources instantly.',
      details: 'Our digital library provides thousands of eBooks, journals and research materials.'
    },
    {
      title: 'Skill Courses',
      icon: <Target />,
      desc: 'Master the tools of tomorrow.',
      details: 'Industry-ready courses including AI, Web Development, Data Science and Cloud.'
    },
    {
      title: 'Hardware Hub',
      icon: <Monitor />,
      desc: 'Premium equipment at your fingertips.',
      details: 'Rent laptops, GPUs and high-end systems for development and learning.'
    },
    {
      title: 'Co-working',
      icon: <Users />,
      desc: 'Collaborate in modern spaces.',
      details: 'Work with startups and professionals in modern collaborative workspaces.'
    },
    {
      title: 'Service Center',
      icon: <Shield />,
      desc: 'Expert technical assistance.',
      details: 'Technical support, laptop repair and digital infrastructure services.'
    },
    {
      title: 'Franchise',
      icon: <Globe />,
      desc: 'Scale with our proven model.',
      details: 'Start your own K-Hub center using our proven digital ecosystem.'
    }
  ];

  const next = () => setIndex((prev) => (prev + 1) % products.length);
  const prev = () => setIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <section id="products" className="py-32 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-khub-orange font-black uppercase tracking-[0.2em] text-sm mb-4">
              Our Ecosystem
            </h2>

            <h3 className="text-5xl md:text-6xl font-black text-khub-dark leading-tight">
              REVENUE <br /> <span className="text-khub-blue">PRODUCTS</span>
            </h3>
          </div>

          <div className="flex gap-4">
            <button onClick={prev} className="w-14 h-14 rounded-full border-2 border-khub-dark/10 flex items-center justify-center hover:bg-khub-dark hover:text-white transition-all">
              <ChevronLeft size={24} />
            </button>

            <button onClick={next} className="w-14 h-14 rounded-full border-2 border-khub-dark/10 flex items-center justify-center hover:bg-khub-dark hover:text-white transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative min-h-[450px] md:h-[400px] perspective-1000">

          <AnimatePresence mode="popLayout">

            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="md:absolute md:inset-0 grid grid-cols-1 md:grid-cols-3 gap-8"
            >

              {[0, 1, 2].map((offset) => {

                const item = products[(index + offset) % products.length];

                return (
                  <div
                    key={offset}
                    className={`bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 hover:shadow-2xl transition-all group ${offset > 0 ? 'hidden md:block' : 'block'}`}
                  >

                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-khub-orange text-white flex items-center justify-center mb-6 md:mb-8">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                    </div>

                    <h4 className="text-xl md:text-2xl font-black text-khub-dark mb-4">
                      {item.title}
                    </h4>

                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Learn More Button */}
                    <button
                      onClick={() => setSelectedProduct(item)}
                      className="mt-6 md:mt-8 flex items-center gap-2 text-khub-blue font-bold hover:gap-4 transition-all text-sm md:text-base"
                    >
                      LEARN MORE <ArrowRight size={16} />
                    </button>

                  </div>
                );
              })}

            </motion.div>

          </AnimatePresence>

        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>

        {selectedProduct && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60"
              onClick={() => setSelectedProduct(null)}
            />

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative bg-white rounded-3xl p-10 max-w-lg w-full shadow-2xl"
            >

              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-black"
              >
                <X size={22} />
              </button>

              <div className="mb-4 text-khub-orange">
                {React.cloneElement(selectedProduct.icon as React.ReactElement, { size: 40 })}
              </div>

              <h3 className="text-3xl font-black text-khub-dark mb-4">
                {selectedProduct.title}
              </h3>

              <p className="text-gray-500 leading-relaxed">
                {selectedProduct.details}
              </p>

            </motion.div>

          </div>

        )}

      </AnimatePresence>

    </section>
  );
};

const EDRSection = () => {
  const pillars = [
    { 
      title: 'EDUCATION', 
      color: 'bg-khub-orange', 
      icon: <BookOpen size={48} />,
      desc: 'Bridging the gap between traditional learning and the digital era through our unique curriculum.',
      grid: 'lg:col-span-2'
    },
    { 
      title: 'DIGITAL', 
      color: 'bg-khub-blue', 
      icon: <Monitor size={48} />,
      desc: 'Providing state-of-the-art digital infrastructure for every student.',
      grid: 'lg:col-span-1'
    },
    { 
      title: 'RENTALS', 
      color: 'bg-khub-dark', 
      icon: <Key size={48} />,
      desc: 'Affordable hardware and equipment rentals to democratize access.',
      grid: 'lg:col-span-1'
    },
    { 
      title: 'RURAL REACH', 
      color: 'bg-khub-accent', 
      icon: <Globe size={48} />,
      desc: 'Extending our ecosystem to the most remote corners of the nation.',
      grid: 'lg:col-span-2'
    }
  ];

  return (
    <section id="edr" className="py-32 bg-khub-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-khub-orange font-black uppercase tracking-[0.3em] text-sm mb-6">The Methodology</h2>
          <h3 className="text-5xl md:text-7xl font-black text-white">THE EDR MODEL</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 perspective-2000">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                y: -15, 
                rotateX: 8, 
                rotateY: -5,
                boxShadow: "0 40px 80px -15px rgba(0,0,0,0.5)"
              }}
              className={`relative p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] glass-card border-white/10 group overflow-hidden preserve-3d ${p.grid}`}
            >
              <div className={`absolute -top-24 -right-24 w-64 h-64 ${p.color} opacity-10 blur-[100px] group-hover:opacity-40 transition-opacity duration-700`}></div>
              
              <motion.div 
                className="text-white mb-8 transform translate-z-40 inline-block"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                {p.icon}
              </motion.div>
              
              <h4 className="text-4xl font-black text-white mb-6 tracking-tight transform translate-z-30">{p.title}</h4>
              <p className="text-white/50 leading-relaxed mb-8 transform translate-z-20 text-lg font-medium">
                {p.desc}
              </p>
              
              <div className="flex items-center gap-4 transform translate-z-10">
                <div className="h-1.5 w-20 bg-khub-orange rounded-full group-hover:w-32 transition-all duration-700"></div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Phase {i + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'General Inquiry',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading' | null, message: string, simulated?: boolean }>({ type: null, message: '' });
  const [isServerLive, setIsServerLive] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        setIsServerLive(data.configured);
      } catch (e) {
        setIsServerLive(false);
      }
    };
    checkStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your inquiry...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: `Inquiry sent successfully! Reference: ${data.referenceNumber}`,
          simulated: data.simulated
        });
        setFormData({ name: '', email: '', phone: '', organization: '', inquiryType: 'General Inquiry', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Could not connect to the server. Please check your connection.' });
    }
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-khub-dark rounded-[4rem] overflow-hidden shadow-2xl relative">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-khub-blue/5 to-transparent pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 relative z-10">
            <div className="p-10 sm:p-16 lg:p-24 bg-khub-orange text-white flex flex-col justify-between">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest mb-8"
                >
                  Get In Touch
                </motion.div>
                <h3 className="text-4xl sm:text-6xl font-black mb-8 leading-[0.9] tracking-tighter">LET'S <br /> BUILD THE <br /> FUTURE.</h3>
                <p className="text-white/70 mb-12 text-lg sm:text-xl max-w-md leading-relaxed">
                  Whether you're looking to partner, join our network, or just want to learn more, we're here to help.
                </p>
              </div>
              
              <div className="space-y-8 sm:space-y-10">
                <div className="flex items-center gap-6 sm:gap-8 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl glass flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-1">Email Us</div>
                    <div className="text-lg sm:text-xl font-bold">sudhakar@vidyardi.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:gap-8 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl glass flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-1">Call Us</div>
                    <div className="text-lg sm:text-xl font-bold">+91 9848074212</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-10 sm:p-16 lg:p-24 bg-white">
              <div className="flex justify-between items-center mb-10">
                <h4 className="text-2xl font-black text-khub-dark tracking-tighter">SEND A MESSAGE</h4>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isServerLive ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {isServerLive === null ? 'Checking...' : isServerLive ? 'System Live' : 'Simulation Mode'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-khub-dark/40">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 outline-none focus:border-khub-orange transition-all font-bold text-lg" 
                      placeholder="" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-khub-dark/40">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 outline-none focus:border-khub-orange transition-all font-bold text-lg" 
                      placeholder="" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-khub-dark/40">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 outline-none focus:border-khub-orange transition-all font-bold text-lg" 
                      placeholder="+91 " 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-khub-dark/40">Inquiry Type</label>
                    <select 
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 outline-none focus:border-khub-orange transition-all font-bold text-lg appearance-none cursor-pointer"
                    >
                      <option>Inquiry</option>
                      <option>Partnership</option>
                      <option>Franchise</option>
                      <option>Technical Support</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-khub-dark/40">Your Message</label>
                  <textarea 
                    required
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 border-b-2 border-gray-100 py-4 outline-none focus:border-khub-orange transition-all font-bold text-lg resize-none" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div className="space-y-6">
                  <button 
                    type="submit"
                    disabled={status.type === 'loading'}
                    className="w-full py-6 bg-khub-dark text-white rounded-2xl font-black hover:bg-khub-blue transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-4 group"
                  >
                    {status.type === 'loading' ? 'PROCESSING...' : 'SEND INQUIRY'}
                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </button>

                  <AnimatePresence>
                    {status.type && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`p-6 rounded-2xl border-2 flex flex-col gap-2 ${
                          status.type === 'success' ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'
                        }`}
                      >
                        <div className="font-black uppercase tracking-widest text-xs">
                          {status.type === 'success' ? 'Message Sent' : 'Error'}
                        </div>
                        <div className="font-bold">{status.message}</div>
                        {status.simulated && (
                          <div className="text-xs opacity-60 italic mt-2">
                            Note: This is a simulation for the preview environment. To receive real emails, configure SMTP settings in the Settings menu.
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-khub-dark py-24 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <img src="../Logo.png" alt="K-HUB Logo" className="h-10 w-auto " referrerPolicy="no-referrer" />
          </div>
          <p className="text-white/40 leading-relaxed font-medium">
            Empowering communities through digital infrastructure and education. Join the revolution.
          </p>
          <div className="flex gap-4">
            {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:bg-khub-orange hover:text-white transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">Quick Links</h4>
          <ul className="space-y-4">
            {['About', 'EDR Model', 'Products', 'Phases', 'Contact'].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-white/40 hover:text-khub-orange transition-colors font-medium">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">Contact</h4>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <Mail className="text-khub-orange shrink-0" size={20} />
              <span className="text-white/40 font-medium">sudhakar@vidyardi.com</span>
            </li>
            <li className="flex gap-4">
              <Phone className="text-khub-orange shrink-0" size={20} />
              <span className="text-white/40 font-medium">+91 9848074212</span>
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">Headquarters</h4>
          <div className="flex gap-4">
            <MapPin className="text-khub-orange shrink-0" size={20} />
            <p className="text-white/40 font-medium leading-relaxed">
              1606B, 16th Floor, Orbit, Plot no :30/c, Sy No:83/2, Hyderabad Knowledge City, Raidurg, panmaktha, Serilingampalle (M), Hyderabad, Telangana 500081
            </p>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-white/20 text-xs font-bold uppercase tracking-widest">
          © 2026 VIDYARDI INSTITUTIONS PVT. LTD.
        </div>
        <div className="flex gap-8 text-xs font-bold text-white/20 uppercase tracking-widest">
          <a href="#" className="hover:text-khub-orange transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-khub-orange transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-khub-orange transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

const About = () => {
  const values = [
    {
      icon: <Target size={40} className="text-khub-orange" />,
      title: "VISION",
      desc: "Democratizing digital knowledge access across the nation."
    },
    {
      icon: <Rocket size={40} className="text-khub-blue" />,
      title: "MISSION",
      desc: "Building a sustainable ecosystem for education and digital services."
    }
  ];

  return (
    <section id="about" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-khub-orange font-black uppercase tracking-[0.3em] text-sm mb-4">
            Our Purpose
          </h2>
          <h3 className="text-5xl md:text-6xl font-black text-khub-dark">
            VISION & MISSION
          </h3>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {values.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >
              <div className="mb-6">
                {item.icon}
              </div>

              <h4 className="text-3xl font-black text-khub-dark mb-4">
                {item.title}
              </h4>

              <p className="text-gray-500 text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const Phases = () => {
  const [selectedPhase, setSelectedPhase] = useState<any>(null);
  const phases = [
    { 
      id: '01', 
      title: 'PILOT', 
      status: 'Done', 
      desc: 'Initial testing and validation of the K-HUB model in select locations.',
      accent: 'bg-khub-orange',
      details: 'The pilot phase involved setting up 10 initial hubs to test our EDR model. We focused on gathering user feedback, optimizing hardware rental processes, and refining our digital curriculum. This phase successfully validated the demand for accessible digital infrastructure in regional areas.'
    },
    { 
      id: '02', 
      title: 'REGIONAL', 
      status: 'Live', 
      desc: 'Expansion across key regional centers with established digital infrastructure.',
      accent: 'bg-khub-blue',
      details: 'Currently in the regional phase, we are expanding to 50+ centers across multiple states. This involves establishing robust supply chains for hardware, training local hub managers, and integrating advanced skill-based courses into our platform.'
    },
    { 
      id: '03', 
      title: 'NATIONAL', 
      status: 'Soon', 
      desc: 'Scaling the ecosystem to major cities and educational hubs nationwide.',
      accent: 'bg-khub-dark',
      details: 'The national phase will see K-HUB entering major metropolitan areas and tier-2 cities. We aim to establish a presence in every state capital, providing a standardized digital ecosystem for students and professionals alike.'
    },
    { 
      id: '04', 
      title: 'RURAL', 
      status: 'Soon', 
      desc: 'Bridging the digital divide by reaching remote and underserved communities.',
      accent: 'bg-khub-accent',
      details: 'Our rural reach phase is the heart of our mission. We are developing low-cost, high-impact hub models specifically designed for remote areas with limited connectivity, ensuring no community is left behind in the digital revolution.'
    },
    { 
      id: '05', 
      title: '600+ HUBS', 
      status: 'Goal', 
      desc: 'Achieving our vision of a massive, interconnected network of digital hubs.',
      accent: 'bg-gray-400',
      details: 'The ultimate goal is to create a network of 600+ interconnected hubs. This ecosystem will serve as a national backbone for digital education, remote work, and community development, empowering millions of individuals.'
    }
  ];

  return (
    <section id="phases" className="py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-khub-orange font-black uppercase tracking-[0.4em] text-xs mb-6"
          >
            The Roadmap
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-khub-dark tracking-tighter leading-none"
          >
            GROWTH <span className="text-khub-blue">PHASES</span>
          </motion.h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative z-10 p-12 rounded-[3.5rem] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] group-hover:-translate-y-2">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-6xl font-black text-gray-50 group-hover:text-gray-100 transition-colors">{phase.id}</span>
                  <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    phase.status === 'Done' ? 'bg-khub-accent/10 text-khub-accent' : 
                    phase.status === 'Live' ? 'bg-khub-blue/10 text-khub-blue' : 
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {phase.status}
                  </div>
                </div>

                <div className="mb-12">
                  <div className={`w-12 h-1 mb-8 ${phase.accent} rounded-full origin-left group-hover:scale-x-150 transition-transform duration-500`}></div>
                  <h4 className="text-3xl font-black text-khub-dark mb-6 tracking-tight group-hover:text-khub-orange transition-colors">
                    {phase.title}
                  </h4>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed">
                    {phase.desc}
                  </p>
                </div>

                <button 
                  onClick={() => setSelectedPhase(phase)}
                  className="flex items-center gap-3 text-khub-dark font-black text-xs tracking-widest group-hover:text-khub-orange transition-colors"
                >
                  VIEW DETAILS <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              {/* Subtle Glow Effect */}
              <div className={`absolute inset-0 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 -z-10 ${phase.accent}`}></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Phase Detail Modal */}
      <AnimatePresence>
        {selectedPhase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhase(null)}
              className="absolute inset-0 bg-khub-dark/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] p-10 sm:p-16 overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedPhase(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-khub-dark hover:bg-khub-orange hover:text-white transition-all"
              >
                <X size={24} />
              </button>

              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-black text-gray-100">{selectedPhase.id}</span>
                  <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    selectedPhase.status === 'Done' ? 'bg-khub-accent/10 text-khub-accent' : 
                    selectedPhase.status === 'Live' ? 'bg-khub-blue/10 text-khub-blue' : 
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {selectedPhase.status}
                  </div>
                </div>
                <h4 className="text-4xl sm:text-5xl font-black text-khub-dark mb-8 tracking-tighter">
                  PHASE: <span className="text-khub-orange">{selectedPhase.title}</span>
                </h4>
                <div className={`w-24 h-2 ${selectedPhase.accent} rounded-full mb-10`}></div>
                <p className="text-xl text-gray-500 leading-relaxed font-medium">
                  {selectedPhase.details}
                </p>
              </div>

              <button 
                onClick={() => setSelectedPhase(null)}
                className="w-full py-6 bg-khub-dark text-white rounded-2xl font-black hover:bg-khub-orange transition-all shadow-xl"
              >
                CLOSE DETAILS
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    { icon: <Zap className="text-khub-orange" />, title: 'Fast Deployment', desc: 'Get your hub up and running in record time with our proven blueprint.' },
    { icon: <Shield className="text-khub-blue" />, title: 'Secure Infrastructure', desc: 'Enterprise-grade security for all digital assets and user data.' },
    { icon: <TrendingUp className="text-khub-accent" />, title: 'Scalable Growth', desc: 'Our model is designed to grow with your community and needs.' },
    { icon: <Users className="text-white" />, title: 'Expert Support', desc: '24/7 technical and operational support from our dedicated team.' }
  ];

  return (
    <section className="py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-khub-orange font-black uppercase tracking-[0.3em] text-sm mb-6">Why K-HUB?</h2>
            <h3 className="text-5xl md:text-7xl font-black text-khub-dark mb-8 leading-tight">THE EDGE IN <br /> DIGITAL TRANSFORMATION.</h3>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed">
              We don't just provide technology; we provide a sustainable ecosystem that empowers individuals and communities to thrive in the digital age.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center">
                    {f.icon}
                  </div>
                  <h4 className="text-xl font-bold text-khub-dark">{f.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative perspective-2000">
            <motion.div 
              whileHover={{ rotateY: -15, rotateX: 5 }}
              className="relative preserve-3d transition-transform duration-1000"
            >
              <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                  alt="Innovation" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-khub-blue p-10 rounded-[3rem] text-white shadow-2xl transform translate-z-50">
                <div className="text-4xl font-black mb-2">99%</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-60">Success Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Active Hubs', value: '600+' },
    { label: 'Students Empowered', value: '50K+' },
    { label: 'States Covered', value: '12+' },
    { label: 'Digital Courses', value: '100+' }
  ];

  return (
    <section className="bg-khub-dark py-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">{s.value}</div>
              <div className="text-xs font-bold text-khub-orange uppercase tracking-[0.3em]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-khub-orange selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <EDRSection />
      <WhyChooseUs />
      <ProductCarousel />
      <Phases />
      <Contact />
      <Footer />
    </div>
  );
}
