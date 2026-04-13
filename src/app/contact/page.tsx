"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Mail, MessageSquare, ChevronRight, ExternalLink, Settings, Backpack } from "lucide-react";

// Icons
const Github = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="#fff" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.165c-3.338.726-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.125-.303-.535-1.524.115-3.176 0 0 1.005-.322 3.3 1.23.955-.266 1.98-.398 3-.405 1.02.007 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.1.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const Gitlab = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="#e24329" d="M23.955 9.497L21.364 1.5A.503.503 0 0020.407 1.5l-2.035 6.262H5.63L3.593 1.5A.503.503 0 002.636 1.5L.045 9.497a.505.505 0 00.16.55l11.758 8.543a.083.083 0 00.076 0L23.795 10.046a.505.505 0 00.16-.549z"/>
    <path fill="#fc6d26" d="M23.955 9.497l-2.59-7.997a.503.503 0 00-.958 0L18.373 7.761h5.27zM.045 9.497l2.59-7.997a.503.503 0 01.958 0L5.63 7.761H.357z"/>
    <path fill="#fca326" d="M23.955 9.497l-5.582-1.736L12 18.59zM.045 9.497l5.582-1.736L12 18.59z"/>
  </svg>
);

const Bitbucket = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="#2684ff" d="M22.5 4H1.5C1 4 .6 4.4.7 4.9l2.7 13.5c.1.6.6 1.1 1.2 1.1h14.8c.6 0 1.1-.4 1.2-1.1L23.3 4.9c.1-.5-.3-.9-.8-.9z"/>
    <path fill="#0052cc" d="M14.4 14H9.6L8.5 8.5h7.1z"/>
  </svg>
);

const GithubClassroom = ({ className }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
      <Github className="w-full h-full opacity-80" />
      <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-orange-400 to-red-500 rounded-full p-0.5 shadow-lg border border-black flex items-center justify-center">
         <Backpack className="w-[10px] h-[10px] text-white" />
      </div>
  </div>
);

const Git = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="#F1502F" d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l3.28 3.28c.84-.207 1.776.082 2.308.613.593.592.83 1.5.546 2.308l3.197 3.198c.808-.28 1.714-.045 2.308.547.886.886.886 2.32 0 3.206-.884.885-2.315.885-3.203 0-.67-.67-.852-1.636-.457-2.45L13.56 10.2a2.3 2.3 0 00-.77 1.054v4.542c.45.244.823.633 1.042 1.127.356.81.246 1.772-.31 2.327-.885.887-2.32.887-3.206 0-.886-.887-.886-2.32.002-3.207.575-.575 1.488-.707 2.29-.395V11.12a2.22 2.22 0 00-.79-1.077l-3.32-3.32v-.004L.454 13.064c-.603.604-.603 1.583 0 2.188l10.48 10.48c.604.604 1.582.604 2.188 0l10.426-10.425c.603-.604.603-1.583 0-2.19v-.002z"/>
  </svg>
);

const Mercurial = ({ className }: { className?: string }) => (
  <div className={`flex items-center justify-center rounded-full bg-gradient-to-br from-gray-500 to-gray-800 border border-gray-400 ${className}`}>
    <span className="text-white font-black italic tracking-tighter w-full h-full flex items-center justify-center" style={{ fontSize: '110%' }}>Hg</span>
  </div>
);

const Subversion = ({ className }: { className?: string }) => (
  <div className={`flex items-center justify-center rounded bg-gradient-to-br from-cyan-600 to-blue-800 border border-blue-400 rotate-3 ${className}`}>
    <span className="text-white font-black tracking-widest w-full h-full flex items-center justify-center" style={{ fontSize: '70%' }}>SVN</span>
  </div>
);

import Beams from "@/components/Beams";

// Custom Repo Dropdown Component
function RepoDropdown({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { name: "GitHub", icon: <Github className="w-5 h-5 drop-shadow-lg" /> },
    { name: "GitHub Classroom", icon: <GithubClassroom className="w-5 h-5 drop-shadow-lg" /> },
    { name: "GitLab", icon: <Gitlab className="w-5 h-5 drop-shadow-lg" /> },
    { name: "Bitbucket", icon: <Bitbucket className="w-5 h-5 drop-shadow-lg" /> },
    { name: "Other", icon: <Settings className="w-5 h-5 text-gray-400 group-hover:text-white drop-shadow-lg" /> }
  ];

  const selectedOption = options.find((o) => o.name === value) || null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-black/50 border border-white/10 p-4 font-bold text-white focus:border-purple-500 focus:outline-none transition-colors rounded-none uppercase text-xs cursor-pointer h-[50px]"
      >
        {selectedOption ? (
          <div className="flex items-center gap-3">
             <div className="text-white group-hover:text-white">{selectedOption.icon}</div>
             <span>{selectedOption.name}</span>
          </div>
        ) : (
          <span className="text-white/50">Select Repository</span>
        )}
        <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "-rotate-90" : "rotate-90"}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full mt-2 left-0 w-full bg-neutral-900 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-50 flex flex-col"
          >
            {options.map((option) => (
              <button
                key={option.name}
                type="button"
                onClick={() => {
                  onChange(option.name);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full p-4 hover:bg-white/5 transition-colors group text-left border-b border-white/5 last:border-0"
              >
                {option.icon}
                <span className="text-xs font-bold uppercase text-gray-400 group-hover:text-white transition-colors">{option.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Custom Submissions Dropdown Component
function SubmissionsDropdown({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { name: "1-50 Submissions", icon: <div className="w-5 h-5 flex items-center justify-center font-black text-[10px] text-gray-400 bg-white/5 border border-white/10 rounded-sm">S</div> },
    { name: "51-200 Submissions", icon: <div className="w-5 h-5 flex items-center justify-center font-black text-[10px] text-gray-300 bg-white/10 border border-white/20 rounded-sm">M</div> },
    { name: "201+ Submissions", icon: <div className="w-5 h-5 flex items-center justify-center font-black text-[10px] text-purple-400 bg-purple-500/10 border border-purple-500/30 rounded-sm">L</div> }
  ];

  const selectedOption = options.find((o) => o.name === value) || null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-black/50 border border-white/10 p-4 font-bold text-white focus:border-purple-500 focus:outline-none transition-colors rounded-none uppercase text-xs cursor-pointer h-[50px]"
      >
        {selectedOption ? (
          <div className="flex items-center gap-3">
             <div className="text-white group-hover:text-white">{selectedOption.icon}</div>
             <span>{selectedOption.name}</span>
          </div>
        ) : (
          <span className="text-white/50">Select Volume</span>
        )}
        <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "-rotate-90" : "rotate-90"}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full mt-2 left-0 w-full bg-neutral-900 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-50 flex flex-col"
          >
            {options.map((option) => (
              <button
                key={option.name}
                type="button"
                onClick={() => {
                  onChange(option.name);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full p-4 hover:bg-white/5 transition-colors group text-left border-b border-white/5 last:border-0"
              >
                {option.icon}
                <span className="text-xs font-bold uppercase text-gray-400 group-hover:text-white transition-colors">{option.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Floating animations component for the right panel
function FloatingIcon({ children, delay, x, y, duration = 6 }: { children: React.ReactNode, delay: number, x: string, y: string, duration?: number }) {
  return (
    <motion.div
      className={`absolute ${x} ${y} p-6 bg-black/40 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md rounded-2xl flex items-center justify-center z-10 hover:border-purple-500/50 transition-colors will-change-transform`}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}

function FloatingVersionControl() {
  return (
     <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none">
        <div className="relative w-full h-[500px] max-w-md mx-auto">
          {/* Central Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 blur-[100px]" />
          
          {/* Rigid Top Boundary Line */}
          <FloatingIcon delay={0} x="left-0" y="top-0">
            <Github className="w-16 h-16 drop-shadow-xl" />
          </FloatingIcon>
          <FloatingIcon delay={2.2} x="left-[calc(50%-48px)]" y="top-0" duration={6.5}>
             <Git className="w-12 h-12 drop-shadow-xl" />
          </FloatingIcon>
          <FloatingIcon delay={1.5} x="right-0" y="top-0" duration={7}>
            <Gitlab className="w-20 h-20 drop-shadow-xl" />
          </FloatingIcon>
          
          {/* Rigid Midpoint Walls */}
          <FloatingIcon delay={3} x="left-0" y="top-[calc(50%-56px)]" duration={5}>
            <Bitbucket className="w-16 h-16 drop-shadow-xl" />
          </FloatingIcon>
          <FloatingIcon delay={5.1} x="right-0" y="top-[calc(50%-44px)]" duration={7.5}>
             <Subversion className="w-10 h-10 drop-shadow-xl" />
          </FloatingIcon>

          {/* Rigid Bottom Boundary Line */}
          <FloatingIcon delay={1.8} x="left-0" y="bottom-0" duration={6}>
             <Mercurial className="w-10 h-10 drop-shadow-xl" />
          </FloatingIcon>
          <FloatingIcon delay={4.5} x="right-0" y="bottom-0" duration={8}>
             <GithubClassroom className="w-12 h-12 drop-shadow-xl" />
          </FloatingIcon>

          {/* Central Pulse */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
             <div className="w-32 h-32 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-8 h-8 text-white/20" />
             </div>
          </motion.div>
        </div>
     </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    submissions: "",
    repo: "",
    challenges: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error("Failed to send");
      
      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 overflow-x-hidden flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-none flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">JudgeNod</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400 ml-8">
            <Link href="/#infrastructure" className="hover:text-white transition-colors">Infrastructure</Link>
            <Link href="/#solana" className="hover:text-white transition-colors">Solana</Link>
            <Link href="/#docs" className="hover:text-white transition-colors">Docs</Link>
          </div>
        </div>
        <Link href="/" className="text-sm font-bold text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
          Back to Home <ChevronRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero / Form Section */}
      <section className="relative flex-grow pt-32 pb-20 px-8 flex flex-col items-center justify-center">
        {/* Background Beams */}
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
          <Beams
            beamWidth={3}
            beamHeight={40}
            beamNumber={20}
            lightColor="#ffffff"
            speed={1.5}
            noiseIntensity={1}
            scale={0.15}
            rotation={15}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black to-black z-10" />
        </div>

        <div className="relative z-20 w-full max-w-6xl flex flex-col items-center">
          {/* Header Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full flex flex-col items-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-bold text-purple-400 uppercase tracking-widest mb-8 text-center max-w-fit">
              <Zap className="w-3 h-3" />
              <span>Direct Access Pipeline</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-tight uppercase italic max-w-4xl text-center">
              Upgrade to Enterprise-Grade Evaluation Protocols
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl font-medium italic text-center">
              Fill out the form below. We will reach out within 24 hours to schedule a live demo of the analysis engine using a sample repository.
            </p>
          </motion.div>

          <div className="w-full grid lg:grid-cols-12 gap-12 mt-8 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 xl:col-span-7 relative w-full"
            >
              <div className="p-8 md:p-12 border border-white/10 bg-neutral-900/40 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative group">
                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 group-hover:border-purple-500 transition-colors pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 group-hover:border-purple-500 transition-colors pointer-events-none" />

                <form className="space-y-6 relative" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">First Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="e.g. Satoshi"
                        className="w-full bg-black/50 border border-white/10 p-4 font-bold text-white focus:border-purple-500 focus:outline-none transition-colors rounded-none placeholder:text-white/10 text-sm h-[50px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Last Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="e.g. Nakamoto"
                        className="w-full bg-black/50 border border-white/10 p-4 font-bold text-white focus:border-purple-500 focus:outline-none transition-colors rounded-none placeholder:text-white/10 text-sm h-[50px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Work Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="name@company.com"
                      className="w-full bg-black/50 border border-white/10 p-4 font-bold text-white focus:border-purple-500 focus:outline-none transition-colors rounded-none placeholder:text-white/10 text-sm h-[50px]"
                    />
                  </div>

                  <div className="space-y-2 relative z-10">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Organization / Company Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      placeholder="Enter Org Name"
                      className="w-full bg-black/50 border border-white/10 p-4 font-bold text-white focus:border-purple-500 focus:outline-none transition-colors rounded-none placeholder:text-white/10 text-sm h-[50px]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 relative z-[60]">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Average Submissions / Event</label>
                      <SubmissionsDropdown 
                         value={formData.submissions}
                         onChange={(val) => setFormData({...formData, submissions: val})}
                      />
                    </div>
                    <div className="space-y-2 relative z-50">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Primary Code Repo</label>
                      <RepoDropdown 
                         value={formData.repo}
                         onChange={(val) => setFormData({...formData, repo: val})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 relative z-10 pt-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">What are you hoping to solve? (Optional)</label>
                    <textarea 
                      rows={3}
                      value={formData.challenges}
                      onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                      placeholder="Describe your workflow challenges..."
                      className="w-full bg-black/50 border border-white/10 p-4 font-bold text-white focus:border-purple-500 focus:outline-none transition-colors rounded-none placeholder:text-white/10 text-sm resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="relative z-10 group w-full py-6 bg-white text-black font-black text-lg transition-all active:translate-y-1 active:shadow-none shadow-[0_10px_0_#94a3b8] hover:shadow-[0_12px_0_#cbd5e1] hover:-translate-y-1 flex items-center justify-center gap-3 uppercase italic mt-8 cursor-pointer disabled:opacity-75 disabled:active:translate-y-0 disabled:active:shadow-[0_10px_0_#94a3b8] disabled:hover:-translate-y-0 disabled:hover:shadow-[0_10px_0_#94a3b8]"
                  >
                    {status === "loading" ? "Initializing Pipeline..." : status === "success" ? "Demo Requested!" : status === "error" ? "Transmission Failed" : <>Request a Live Demo <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></>}
                  </button>
                </form>
              </div>

              {/* Alternative Contact Options (Under the form) */}
              <div className="mt-8 flex flex-col md:flex-row items-center justify-start gap-8 px-4">
                <div className="flex flex-col items-start gap-2">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">General Inquiries</span>
                  <a href="mailto:hello@judgenod.com" className="group flex items-center gap-2 text-sm font-black hover:text-purple-400 transition-colors">
                    <Mail className="w-4 h-4 text-purple-500" /> hello@judgenod.com
                  </a>
                </div>
                <div className="w-[1px] h-8 bg-white/10 hidden md:block" />
                <div className="flex flex-col items-start gap-2">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Support Portal</span>
                  <a href="#" className="group flex items-center gap-2 text-sm font-black hover:text-blue-400 transition-colors">
                    <MessageSquare className="w-4 h-4 text-blue-500" /> Support center <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Floating Elements */}
            <div className="hidden lg:block lg:col-span-5 relative h-full min-h-[500px] w-full">
               <FloatingVersionControl />
               
               {/* Informational badge overlay at the bottom */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.8 }}
                 className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[280px]"
               >
                 <div className="p-5 border border-white/10 bg-neutral-900/80 backdrop-blur-lg flex items-start gap-4">
                    <Zap className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
                    <div>
                       <h4 className="text-xs font-black uppercase text-white mb-1 tracking-wider">Seamless Fetching</h4>
                       <p className="text-[10px] text-gray-400 font-medium">Instantly analyze codebases across primary version control platforms without complex setup.</p>
                    </div>
                 </div>
               </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-8 px-8 flex-shrink-0 border-t border-white/5 text-center mt-auto">
        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
          &copy; 2026 JudgeNod. Built for the Decentralized Web.
        </p>
      </footer>
    </main>
  );
}
