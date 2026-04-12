"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Lock, Key, Users, Activity, CheckCircle, 
  Code, ExternalLink, Search, Filter,
  Check, AlertCircle
} from "lucide-react";

// Mock Data
const MOCK_SUBMISSIONS = [
  {
    id: "sub_101",
    participant: "superteam_dev",
    wallet: "5Gv9...w9r1",
    repo: "github.com/superteam/defi-dash",
    score: 98,
    status: "pending",
    date: "2026-04-12T10:30:00Z"
  },
  {
    id: "sub_102",
    participant: "solana_ninja",
    wallet: "2pX8...k3m2",
    repo: "github.com/solnx/zk-proofs",
    score: 84,
    status: "approved",
    date: "2026-04-11T14:15:00Z"
  },
  {
    id: "sub_103",
    participant: "rust_builder",
    wallet: "8hN1...z5p9",
    repo: "github.com/rs-builder/anchor-amm",
    score: 92,
    status: "pending",
    date: "2026-04-12T09:00:00Z"
  },
  {
    id: "sub_104",
    participant: "0x_wizard",
    wallet: "4tY2...q7v4",
    repo: "github.com/0xwizard/sol-pay",
    score: 95,
    status: "pending",
    date: "2026-04-12T11:45:00Z"
  },
  {
    id: "sub_105",
    participant: "anchor_master",
    wallet: "9mL5...x2w3",
    repo: "github.com/anchor-master/idl-gen",
    score: 76,
    status: "approved",
    date: "2026-04-10T16:20:00Z"
  }
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'pending', 'approved'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    
    // Mock login delay
    setTimeout(() => {
      // Any non-empty password works for the mock
      if (password.length > 0) {
        setIsAuthenticated(true);
      } else {
        setLoginError("Hardware Key or Password required.");
      }
      setIsLoggingIn(false);
    }, 800);
  };

  const handleApprove = (id: string) => {
    setSubmissions(current => 
      current.map(sub => 
        sub.id === id ? { ...sub, status: "approved" } : sub
      )
    );
  };

  // Derived metrics
  const totalSubmissions = submissions.length;
  const pendingCount = submissions.filter(s => s.status === "pending").length;
  const approvedCount = submissions.filter(s => s.status === "approved").length;
  const avgScore = Math.round(submissions.reduce((acc, curr) => acc + curr.score, 0) / (totalSubmissions || 1));

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.participant.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.repo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || sub.status === activeTab;
    return matchesSearch && matchesTab;
  });

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 blur-[120px] rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="p-8 rounded-none bg-neutral-900/60 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-xl">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-none flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-widest uppercase italic">JudgeNod Admin</h1>
              <p className="text-gray-400 text-sm mt-2 font-mono">Secure Access Terminal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Authorization Key
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Key className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-none py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors font-mono"
                    placeholder="Enter passphrase..."
                  />
                </div>
                {loginError && (
                  <p className="text-red-400 text-xs mt-2 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" /> {loginError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Initialize Session
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-widest uppercase italic">JudgeNod <span className="text-purple-400">Admin</span></span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            System Online
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-xs font-bold text-gray-500 hover:text-white transition-colors tracking-widest uppercase"
          >
            Terminate
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header Area */}
        <div className="mb-12">
           <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 uppercase">Command Center</h1>
           <p className="text-gray-400">Review submissions, override metrics, and issue on-chain SBTs.</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Total Submissions" 
            value={totalSubmissions.toString()} 
            icon={<Users className="w-5 h-5 text-blue-400" />} 
          />
          <StatCard 
            title="Pending Review" 
            value={pendingCount.toString()} 
            icon={<Activity className="w-5 h-5 text-amber-400" />} 
            highlight={pendingCount > 0}
          />
          <StatCard 
            title="Approved (On-Chain)" 
            value={approvedCount.toString()} 
            icon={<CheckCircle className="w-5 h-5 text-green-400" />} 
          />
          <StatCard 
            title="Avg. System Score" 
            value={`${avgScore}/100`} 
            icon={<Code className="w-5 h-5 text-purple-400" />} 
          />
        </div>

        {/* Dashboard Tools */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex bg-neutral-900 border border-white/10 w-full md:w-auto p-1">
            <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Entries</TabButton>
            <TabButton active={activeTab === 'pending'} onClick={() => setActiveTab('pending')}>Pending</TabButton>
            <TabButton active={activeTab === 'approved'} onClick={() => setActiveTab('approved')}>Approved</TabButton>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text"
              placeholder="Search repo or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/50 border border-white/10 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 focus:bg-black transition-all"
            />
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-neutral-900/30 border border-white/10 relative overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-black/40 text-xs font-black text-gray-500 uppercase tracking-widest">
            <div className="col-span-3">Participant</div>
            <div className="col-span-4">Repository</div>
            <div className="col-span-2 text-center">Score</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5 relative z-10">
            <AnimatePresence>
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((sub) => (
                  <motion.div 
                    key={sub.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-none border border-white/10 flex items-center justify-center text-xs font-bold
                          ${sub.status === 'approved' ? 'bg-gradient-to-br from-green-900/50 to-blue-900/50' : 'bg-neutral-800'}`}>
                          {sub.participant.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-200">@{sub.participant}</div>
                          <div className="text-[10px] font-mono text-gray-500">{sub.wallet}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-4 flex items-center gap-2">
                       <Code className="w-4 h-4 text-gray-500" />
                       <span className="text-sm text-gray-400 truncate hover:text-white cursor-pointer transition-colors">
                         {sub.repo}
                       </span>
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="inline-flex items-end gap-1">
                        <span className="text-lg font-black text-white">{sub.score}</span>
                        <span className="text-[10px] text-gray-500 mb-1">/100</span>
                      </div>
                    </div>

                    <div className="col-span-2 flex justify-center">
                      {sub.status === 'approved' ? (
                        <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <Check className="w-3 h-3" /> Approved
                        </div>
                      ) : (
                        <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <Activity className="w-3 h-3" /> Pending Review
                        </div>
                      )}
                    </div>

                    <div className="col-span-1 flex justify-end">
                      {sub.status === 'pending' ? (
                        <button 
                          onClick={() => handleApprove(sub.id)}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-1 shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                        >
                          Approve
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-neutral-800 text-gray-400 text-[10px] font-black uppercase tracking-widest border border-white/5 hover:text-white transition-colors flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> View Tx
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <Filter className="w-8 h-8 mx-auto mb-4 opacity-20" />
                  <p className="font-mono text-sm">No submissions found matching criteria.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Specular Highlight bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon, highlight = false }: { title: string, value: string, icon: React.ReactNode, highlight?: boolean }) {
  return (
    <div className={`p-6 border ${highlight ? 'border-purple-500/30 bg-purple-900/10' : 'border-white/10 bg-neutral-900/30'} relative group overflow-hidden`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{title}</h3>
        <div className="p-2 bg-white/5 border border-white/5">
          {icon}
        </div>
      </div>
      <div className="text-4xl font-black text-white">{value}</div>
      
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
    >
      {children}
    </button>
  );
}
