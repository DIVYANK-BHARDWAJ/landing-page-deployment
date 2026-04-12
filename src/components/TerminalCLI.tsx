'use client';

import React, { useState, useEffect, useRef } from 'react';
import './TerminalCLI.css';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
  id: number;
  status?: 'success' | 'warning' | 'info' | 'default';
}

const TerminalCLI = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines, currentInput]);

  const commands = [
    { input: 'solana --version', output: 'solana-cli 1.18.9 (src:2e7951ce; feat:421a3b6d)', status: 'info' },
    { input: 'solana balance', output: 'Balance: 142.65 SOL', status: 'success' },
    { input: 'cargo build-sbf', output: '[INFO] Building program...\n[INFO] Compiling solana-program v1.18.0\n[INFO] Finished release [optimized] target(s) in 2.4s', status: 'default' },
    { input: 'solana program deploy ./target/deploy/program.so', output: 'Program Id: 4v6p...Y7kL\nDeployment Success!', status: 'success' },
    { input: 'spl-token accounts', output: 'Token                                         Balance\n------------------------------------------------------------\nEPjFWiv...  (USDC)                            1,200.00', status: 'default' },
  ];

  const typeCommand = async (text: string) => {
    setIsTyping(true);
    let typed = '';
    for (let i = 0; i <= text.length; i++) {
      typed = text.slice(0, i);
      setCurrentInput(typed);
      await new Promise(resolve => setTimeout(resolve, Math.random() * 50 + 30));
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsTyping(false);
  };

  const runAnimation = async () => {
    setLines([]);
    for (const cmd of commands) {
      await typeCommand(cmd.input);
      setLines(prev => [...prev, { 
        type: 'input', 
        content: cmd.input, 
        id: Date.now() 
      }]);
      setCurrentInput('');
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setLines(prev => [...prev, { 
        type: 'output', 
        content: cmd.output, 
        id: Date.now() + 1,
        status: cmd.status as any
      }]);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    setTimeout(runAnimation, 3000);
  };

  useEffect(() => {
    runAnimation();
  }, []);

  return (
    <div className="terminal_container">
      <div className="terminal_toolbar">
        <div className="terminal_buttons">
          <div className="terminal_btn btn_red"></div>
          <div className="terminal_btn btn_yellow"></div>
          <div className="terminal_btn btn_green"></div>
        </div>
        <div className="terminal_user_tab">visitor@solana: ~</div>
        <div style={{ width: '40px' }}></div>
      </div>
      <div className="terminal_body" ref={bodyRef}>
        {lines.map((line) => (
          <div key={line.id} className="terminal_line">
            {line.type === 'input' ? (
              <div className="terminal_prompt">
                <span className="terminal_user">visitor@solana</span>
                <span className="terminal_bling">:~$</span>
                <span>{line.content}</span>
              </div>
            ) : (
              <div className={`terminal_output terminal_${line.status}`}>
                {line.content}
              </div>
            )}
          </div>
        ))}
        <div className="terminal_line">
          {!isTyping && lines.length === 0 ? null : (
            <div className="terminal_prompt">
              <span className="terminal_user">visitor@solana</span>
              <span className="terminal_bling">:~$</span>
              <span>{currentInput}</span>
              <span className="terminal_cursor"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalCLI;
