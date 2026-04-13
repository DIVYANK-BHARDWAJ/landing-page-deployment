"use client";

import React from "react";
import Beams from "@/components/Beams";
import SplitText from "@/components/SplitText";
import ShinyText from "@/components/ShinyText";
import TrueFocus from "@/components/TrueFocus";
import ScrambledText from "@/components/ScrambledText";
import Shuffle from "@/components/Shuffle";
import TextType from "@/components/TextType";
import DecryptedText from "@/components/DecryptedText";
import TerminalCLI from "@/components/TerminalCLI";
import VariableProximity from "@/components/VariableProximity";
import { motion } from "framer-motion";
import { Shield, Zap, TrendingUp, Code, Globe, Terminal } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

export default function LandingPage() {
  const terminalSectionRef = useRef<HTMLElement>(null);
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-none flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">JudgeNod</span>
          </div>
          <a href="/admin" className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-colors">
            Admin Panel
          </a>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
          <a href="#" className="hover:text-white transition-colors">Solana</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <Link href="/contact" className="px-6 py-2 bg-white text-black text-sm font-black rounded-none hover:bg-purple-500 hover:text-white transition-all active:scale-95 border-b-4 border-gray-300 hover:border-purple-700">
          Let's Talk
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Beams Background */}
        <div className="absolute inset-0 z-0">
          <Beams
            beamWidth={3}
            beamHeight={40}
            beamNumber={30}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.5}
            scale={0.15}
            rotation={15}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10" />
        </div>

        <div className="relative z-20 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white/5 border border-white/10 text-xs font-medium text-purple-400 mb-8">
              <Zap className="w-3 h-3" />
              <span>Powered by Solana Sealevel</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
              TAMPER-PROOF<br />INFRASTRUCTURE
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
              The first decentralized judging engine for hackathons. Automated analysis, on-chain verification, and immutable proofs of builder excellence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-4">
              <button className="group relative w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-none transition-all active:translate-y-1 active:shadow-none shadow-[0_10px_0_#94a3b8,0_25px_50px_rgba(255,255,255,0.1),0_0_100px_rgba(255,255,255,0.05)] hover:shadow-[0_12px_0_#cbd5e1,0_30px_60px_rgba(255,255,255,0.2),0_10px_100px_rgba(255,255,255,0.1)] hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95">
                <span className="relative z-10 flex items-center gap-3">
                  LAUNCH SUBMISSION <TrendingUp className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 border-t-2 border-l-2 border-white/50 opacity-20 group-hover:opacity-100" />
                {/* Bottom Shadow Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10" />
              </button>
              
              <button className="group relative w-full sm:w-auto px-10 py-5 bg-black/40 border-l border-t border-white/10 border-r border-b border-black/50 text-white font-black rounded-none transition-all active:translate-y-1 active:shadow-none shadow-[0_10px_0_#1e293b,0_25px_50px_rgba(0,0,0,0.8),0_0_80px_rgba(147,51,234,0.05)] hover:shadow-[0_12px_0_#334155,0_30px_60px_rgba(0,0,0,1),0_15px_100px_rgba(147,51,234,0.1)] hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95">
                <Code className="w-5 h-5 text-purple-400" /> VIEW ON GITHUB
                <div className="absolute inset-0 border-t-2 border-l-2 border-white/5 opacity-20 group-hover:opacity-100" />
                {/* Bottom Shadow Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30" />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <div className="w-px h-12 bg-white" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
           <SplitText
            text="THE CORE ENGINE"
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
            delay={50}
            duration={1.25}
            ease="power3.out"
            textAlign="center"
          />
           <p className="text-gray-400">Scalable infrastructure designed for the most demanding hackathon workloads.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-purple-500" />}
            title="Secure Scoring"
            description="Python-powered FastAPI engine utilizes static analysis to grade code without RCE risks."
          />
          <FeatureCard 
            icon={<Zap className="w-8 h-8 text-blue-500" />}
            title="Node.js CLI"
            description="Participants package and submit their entire codebase seamlessly with our dedicated tool."
          />
          <FeatureCard 
            icon={<Globe className="w-8 h-8 text-pink-500" />}
            title="Anchor Contracts"
            description="Rust smart contracts deployed on Solana immutably record every evaluation and rank."
          />
          <FeatureCard 
            icon={<Terminal className="w-8 h-8 text-green-500" />}
            title="Visual Dashboard"
            description="Next.js frontend providing real-time score breakdowns and verifiable on-chain proofs."
          />
        </div>
      </section>

      <section className="py-24 px-8 border-y border-white/5 bg-neutral-950/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase flex items-center gap-4">
              <span className="w-12 h-1 bg-purple-500 rounded-full shrink-0" />
              THE SUBMISSION PIPELINE
            </h2>
            <p className="text-gray-500 font-medium">Trace the journey of your code from a local repo to a verified on-chain score.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12 relative">
            {/* Straight Connection Line */}
            <div className="hidden md:block absolute top-[110px] left-0 right-0 h-[2px] bg-white/5 z-0" />
            
            <StepItem 
              num="01" 
              title="CLI Workspace" 
              text="Bundle and package your local repository with a single secure Node.js command." 
              color="text-indigo-400" 
              bg="bg-indigo-950/40" 
              border="border-indigo-500/30" 
              shadow="shadow-indigo-900/40"
            />
            <StepItem 
              num="02" 
              title="Deterministic Run" 
              text="Submissions are processed in a sandboxed FastAPI environment for standardized evaluation." 
              color="text-slate-200" 
              bg="bg-slate-900/60" 
              border="border-slate-700/50" 
              shadow="shadow-black/50"
            />
            <StepItem 
              num="03" 
              title="AI Record Mint" 
              text="Our JudgeNod AI assigns a score. Metadata is minted on-chain as a tamper-proof proof." 
              color="text-amber-500" 
              bg="bg-amber-950/20" 
              border="border-amber-600/30" 
              shadow="shadow-amber-900/20"
            />
            <StepItem 
              num="04" 
              title="Immutable Proof" 
              text="Final scores are pushed to Solana Sealevel, creating a permanent legacy for builders." 
              color="text-emerald-500" 
              bg="bg-emerald-950/20" 
              border="border-emerald-600/30" 
              shadow="shadow-emerald-900/20"
            />
          </div>
        </div>
      </section>

      {/* Live Proofs Marquee */}
      <section className="py-12 bg-purple-600/5 border-b border-white/5 overflow-hidden whitespace-nowrap relative">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />
        
        <div className="flex items-center gap-4 mb-6 px-12">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-green-500 uppercase">Live Proof Stream</span>
        </div>

        <div className="flex animate-marquee gap-8 w-fit">
          <ProofItem user="superteam" score="98" hash="5Gv9...w9r1" />
          <ProofItem user="solana_dev" score="84" hash="2pX8...k3m2" />
          <ProofItem user="web3_builder" score="92" hash="8hN1...z5p9" />
          <ProofItem user="rust_ninja" score="95" hash="4tY2...q7v4" />
          <ProofItem user="anchor_master" score="89" hash="9mL5...x2w3" />
          <ProofItem user="jupiter_agg" score="97" hash="3cK1...b8n6" />
          {/* Duplicate for seamless loop */}
          <ProofItem user="superteam" score="98" hash="5Gv9...w9r1" />
          <ProofItem user="solana_dev" score="84" hash="2pX8...k3m2" />
          <ProofItem user="web3_builder" score="92" hash="8hN1...z5p9" />
          <ProofItem user="rust_ninja" score="95" hash="4tY2...q7v4" />
          <ProofItem user="anchor_master" score="89" hash="9mL5...x2w3" />
          <ProofItem user="jupiter_agg" score="97" hash="3cK1...b8n6" />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-8 bg-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <TrueFocus 
              sentence="Infrastructure Upgrade"
              manualMode={false}
              blurAmount={5}
              borderColor="#9333ea"
              animationDuration={0.5}
              pauseBetweenAnimations={1}
            />
            <p className="text-gray-400 mb-8 max-w-xl mx-auto md:mx-0">
              Traditional judging is broken. JudgeNod leverages Solana to provide the first fair, automated, and immutable evaluation engine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Traditional Card */}
            <div className="p-10 rounded-none bg-neutral-900/30 border-l border-t border-white/5 border-r border-b border-black/50 grayscale opacity-60 hover:opacity-100 transition-all shadow-[25px_25px_50px_rgba(0,0,0,0.6)]">
              <h3 className="text-2xl font-bold mb-8 text-gray-500 uppercase tracking-widest italic">Traditional Judging</h3>
              <ul className="space-y-6">
                <CompareItem text="Manual grading subject to human bias" isBad />
                <CompareItem text="Opaque scoring with no audit trail" isBad />
                <CompareItem text="Slow feedback loops (days/weeks)" isBad />
                <CompareItem text="Centralized control and risk of tampering" isBad />
              </ul>
            </div>

            {/* JudgeNod Card */}
            <div className="md:col-span-1 p-8 border border-white/10 bg-black/40 relative group overflow-hidden">
              <h3 className="text-2xl font-black mb-8 text-purple-400 uppercase tracking-widest italic">JudgeNod Protocol</h3>
              <ul className="space-y-6">
                <CompareItem text="Deterministic AI-driven evaluation" />
                <CompareItem text="Immutable on-chain verification" />
                <CompareItem text="Near-instant sub-second feedback" />
                <CompareItem text="Decentralized and tamper-proof" />
              </ul>
              {/* Corner Specular Highlight */}
              <div className="absolute top-0 left-0 w-32 h-[2px] bg-gradient-to-r from-purple-400/60 to-transparent" />
              <div className="absolute top-0 left-0 w-[2px] h-32 bg-gradient-to-b from-purple-400/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>
      {/* Soulbound Verification Section */}
      <section className="py-24 px-8 bg-neutral-950/20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic">Permanent Proof of Skill</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium">Every score is minted as a <span className="text-purple-400">Soulbound Token (SBT)</span>, creating an immutable developer resume verified by code and secured by the Solana Ledger.</p>
          </div>

          <div className="relative group cursor-default inline-block">
            {/* The Badge */}
            <div className="w-64 h-80 bg-neutral-900 border-2 border-purple-500/30 rounded-none p-8 shadow-[0_0_50px_rgba(147,51,234,0.1)] transition-all duration-500 group-hover:scale-105 group-hover:border-purple-500 group-hover:shadow-[0_0_80px_rgba(147,51,234,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
              <div className="h-full flex flex-col items-center justify-between py-4">
                <div className="w-12 h-1 bg-purple-500 rounded-none mb-4 opacity-50" />
                <div className="w-24 h-24 rounded-none bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center p-1 shadow-xl">
                    <div className="w-full h-full rounded-none bg-black flex items-center justify-center">
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-black tracking-widest text-purple-400 uppercase mb-1">JudgeNod Proof</div>
                  <div className="text-2xl font-black text-white">SCORE: 98</div>
                  <div className="text-[8px] font-mono text-gray-500 mt-2 truncate max-w-[120px]">SOL_CERT_4A...7Zp</div>
                </div>
                <div className="px-4 py-1 rounded-none bg-green-500/10 border border-green-500/20 text-[8px] font-bold text-green-500 uppercase tracking-widest">Verifiable SBT</div>
              </div>
            </div>
            
            {/* Floating stats around badge */}
            <div className="hidden md:block absolute -left-20 top-10 p-4 bg-white/5 border border-white/10 rounded-none backdrop-blur-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="text-[10px] text-gray-500 uppercase font-black">Security</div>
                <div className="text-xl font-black text-white">Elite</div>
            </div>
            <div className="hidden md:block absolute -right-20 bottom-10 p-4 bg-white/5 border border-white/10 rounded-none backdrop-blur-xl animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="text-[10px] text-gray-500 uppercase font-black">Optimized</div>
                <div className="text-xl font-black text-white">Top 1%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Soulbound Tokens Section */}
      <section className="py-24 px-8 border-t border-white/5 bg-black overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-none pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-1 bg-purple-500 rounded-none shrink-0" />
              <TextType 
                text={["RARE SOULBOUND TOKENS"]}
                typingSpeed={75}
                pauseDuration={3000}
                showCursor
                cursorCharacter="_"
                className="text-3xl md:text-5xl font-black uppercase text-white"
                loop={true}
                startOnVisible={true}
              />
            </div>
            <p className="text-gray-500 font-medium italic">Collect and showcase elite proof-of-skill tokens from the Solana ecosystem.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <TokenItem 
              imageUrl="/tokens/nft1.jpg"
              title="Hallowed Visionary"
              rarity="GODLIKE"
              condition="Achieve 99 Security Score"
              description="A master of deep-logic perception, guarded by the halo of verification."
              color="border-purple-500/40 bg-purple-950/20 group-hover:border-purple-500"
            />
            <TokenItem 
              imageUrl="/tokens/nft2.jpg"
              title="Solid Gold Architect"
              rarity="ELITE"
              condition="Top 1% Global Ranking"
              description="Forged in pure gold, representing the highest standard of Solana architecture."
              color="border-yellow-500/40 bg-yellow-950/20 group-hover:border-yellow-500"
            />
            <TokenItem 
              imageUrl="/tokens/nft3.jpg"
              title="Neon Sea Captain"
              rarity="RARE"
              condition="5+ Submissions in 24h"
              description="Navigating the complex currents of on-chain data with effortless style."
              color="border-blue-500/40 bg-blue-950/20 group-hover:border-blue-500"
            />
            <TokenItem 
              imageUrl="/tokens/nft4.jpg"
              title="Tactical Auditor"
              rarity="COMMON"
              condition="First Verified Submission"
              description="Battle-hardened precision combined with a festive sub-second feedback loop."
              color="border-green-500/40 bg-green-950/20 group-hover:border-green-500"
            />
            <TokenItem 
              imageUrl="/tokens/nft5.jpg"
              title="High-Velocity Pilot"
              rarity="LEGENDARY"
              condition="10 Repos Verified"
              description="An agile expert in rapid-deployment cycles and modular efficiency."
              color="border-orange-500/40 bg-orange-950/20 group-hover:border-orange-500"
            />
          </div>
        </div>
      </section>
      <section className="py-24 px-8 border-t border-white/5 bg-neutral-950/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
              <ShinyText text="Built for Speed" speed={3} color="#ffffff" shineColor="#9333ea" />
              <br />
              <ShinyText text="Verified by Chain" speed={3} color="#ffffff" shineColor="#3b82f6" />
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <ArchItem 
                icon={<Terminal className="w-5 h-5 text-purple-400" />}
                title="Node.js CLI"
                text="Bundle local environments and sync to the scoring engine instantly."
              />
              <ArchItem 
                icon={<Shield className="w-5 h-5 text-blue-400" />}
                title="Python Backend"
                text="FastAPI & Pydantic ensure deterministic validation with zero RCE vectors."
              />
              <ArchItem 
                icon={<Code className="w-5 h-5 text-pink-400" />}
                title="Anchor Programs"
                text="Custom Rust programs manage PDA-based storage for immutable leaderboard records."
              />
              <ArchItem 
                icon={<Zap className="w-5 h-5 text-yellow-400" />}
                title="Solana Sealevel"
                text="Parallel transaction processing ensures sub-second verification on-chain."
              />
            </div>
          </div>
          <div className="relative aspect-video rounded-none overflow-hidden border border-white/10 bg-white/5 p-8 flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl" />
             <pre className="text-xs md:text-sm font-mono text-purple-300">
               {`// Submit to JudgeNod
$ judge submission upload --repo ./my-dapp
⠋ Validating repository...
✔ Metadata extracted
⠙ Analyzing code quality...
✔ Score: 98/100
⠼ Signing on-chain proof...
✔ Transaction: 4jA1...z9Xp`}
             </pre>
          </div>
        </div>
      </section>

      {/* CLI Interaction Section */}
      <section 
        ref={terminalSectionRef}
        className="py-24 px-8 border-t border-white/5 bg-black relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
              <VariableProximity
                label="EXPLORE THE JUDGENOD SDK"
                className="variable-proximity-demo"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={terminalSectionRef}
                radius={200}
                falloff="linear"
              />
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Everything you need to interact with the JudgeNod protocol, right from your terminal. 
              Deploy, verify, and mint certificates with one command.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <TerminalCLI />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-20 px-8 border-t border-white/5 text-center">
        <h3 className="text-3xl font-bold mb-8 italic">READY TO SHIP?</h3>
        <button className="px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-none font-black text-lg hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(147,51,234,0.3)]">
          Join the Chain
        </button>
          <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">
            &copy; 2026 JudgeNod. Built with 100xDevs Mindset.
          </p>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-none bg-neutral-900/40 border-l border-t border-white/10 border-r border-b border-white/5 hover:border-purple-500/50 hover:bg-white/[0.05] transition-all group relative overflow-hidden shadow-[20px_20px_40px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(255,255,255,0.02)]">
      <div className="mb-6 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">{icon}</div>
      <h4 className="text-lg font-black mb-4 uppercase tracking-tighter italic text-white/90">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      
      {/* Dynamic Specular Highlight */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
      
      {/* Bottom Right Deep Shadow */}
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}

function StepItem({ num, title, text, color, bg, border, shadow }: { num: string, title: string, text: string, color: string, bg: string, border: string, shadow: string }) {
  return (
    <div className="relative z-10 group cursor-default">
      <div className={`w-24 h-24 rounded-none ${bg} ${border} border-2 flex items-center justify-center text-4xl font-black ${color} mb-8 mx-auto md:mx-0 shadow-[10px_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_30px_${shadow.split('-')[1]}] overflow-hidden relative`}>
        <span className="relative z-10">{num}</span>
        <div className={`absolute inset-0 ${bg} opacity-20 blur-xl`} />
        {/* Step Border Lighting */}
        <div className="absolute inset-0 border-t border-l border-white/20 pointer-events-none" />
        <div className="absolute inset-0 border-r border-b border-black/50 pointer-events-none" />
      </div>
      <h5 className={`text-2xl font-black mb-4 uppercase tracking-tighter transition-colors duration-300 group-hover:${color}`}>{title}</h5>
      <p className="text-gray-400 text-sm leading-relaxed font-medium">{text}</p>
    </div>
  );
}

function ProofItem({ user, score, hash }: { user: string, score: string, hash: string }) {
  return (
    <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-none">
      <div className="w-8 h-8 rounded-none bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-[10px] font-bold">
        {user.substring(0, 2).toUpperCase()}
      </div>
      <div>
        <div className="text-xs font-bold text-gray-200">@{user}</div>
        <div className="text-[10px] text-gray-500 font-mono italic">{hash}</div>
      </div>
      <div className="h-8 w-px bg-white/10 mx-2" />
      <div className="text-right">
        <div className="text-sm font-black text-purple-400">{score}/100</div>
        <div className="text-[8px] font-bold text-green-500 tracking-tighter uppercase">VERIFIED</div>
      </div>
    </div>
  );
}

function CompareItem({ text, isBad = false }: { text: string, isBad?: boolean }) {
  return (
    <li className="flex items-start gap-4">
      <div className={`mt-1 w-5 h-5 rounded-none flex items-center justify-center shrink-0 ${isBad ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
        {isBad ? '✕' : '✓'}
      </div>
      <span className={`text-sm font-medium ${isBad ? 'text-gray-500' : 'text-gray-300'}`}>{text}</span>
    </li>
  );
}

function LeaderboardRow({ rank, name, score, badges }: { rank: number, name: string, score: number, badges: string[] }) {
  return (
    <div className="grid grid-cols-4 px-8 py-6 items-center hover:bg-white/[0.02] transition-colors group">
      <div className="flex items-center gap-4">
        <span className={`text-sm font-black w-4 ${rank <= 3 ? 'text-purple-400' : 'text-gray-600'}`}>#{rank}</span>
        <div className="w-8 h-8 rounded-none bg-gradient-to-tr from-gray-800 to-gray-700 border border-white/10" />
        <span className="text-sm font-bold group-hover:text-purple-400 transition-colors">@{name}</span>
      </div>
      <div className="text-center">
        <span className="text-lg font-black">{score}<span className="text-[10px] text-gray-500 ml-1">/100</span></span>
      </div>
      <div className="flex justify-center gap-2">
        {badges.map(b => (
          <span key={b} className="text-[8px] px-2 py-0.5 rounded-none bg-white/5 border border-white/10 text-gray-400 uppercase font-black">
            {b}
          </span>
        ))}
      </div>
      <div className="text-right">
        <button className="text-[10px] font-bold text-gray-500 border border-white/10 px-3 py-1 rounded-none hover:bg-white hover:text-black transition-all">
          VERIFY
        </button>
      </div>
    </div>
  );
}

function ArchItem({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 shrink-0 rounded-none bg-white/5 flex items-center justify-center border border-white/10">
        {icon}
      </div>
      <div>
        <h5 className="font-bold mb-1 text-gray-200">{title}</h5>
        <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function TokenItem({ imageUrl, title, rarity, condition, description, color }: { imageUrl: string, title: string, rarity: string, condition: string, description: string, color: string }) {
  return (
    <div className={`p-6 rounded-none border-t-2 border-l-2 transition-all duration-700 group relative flex flex-col items-center text-center ${color} shadow-[15px_15px_40px_rgba(0,0,0,0.7)] hover:-translate-y-2 hover:shadow-[25px_25px_60px_rgba(0,0,0,0.9)]`}>
      <div className="mb-6 w-full aspect-square relative overflow-hidden bg-black shadow-inner border border-white/5">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-black tracking-widest text-white/50 group-hover:text-white uppercase z-20">
        {rarity}
      </div>

      <h4 className="text-base font-black mb-1 text-white/90 uppercase italic tracking-tighter group-hover:text-white group-hover:animate-pulse">{title}</h4>
      <p className="text-xs text-purple-400 uppercase font-black tracking-widest leading-relaxed mb-3">{condition}</p>
      
      <div className="h-[1px] w-8 bg-white/10 mb-3 group-hover:w-full transition-all duration-500" />
      
      <p className="text-[12px] text-gray-500 font-medium leading-relaxed group-hover:text-gray-300 transition-colors italic">{description}</p>
      
      {/* 3D Base Shadow Simulation */}
      <div className="absolute -bottom-[2px] -right-[2px] w-full h-full border-r-2 border-b-2 border-black/40 pointer-events-none" />
      
      {/* Glow background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white blur-[100px] pointer-events-none" />
    </div>
  );
}
