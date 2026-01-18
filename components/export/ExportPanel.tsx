'use client';

import React, { useState, useMemo } from 'react';
import { Prism as SyntaxHighlighterComponent } from 'react-syntax-highlighter';

const SyntaxHighlighter = SyntaxHighlighterComponent as any;

import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { usePopupStore } from '@/lib/stores/popupStore';
import { generateReactComponent } from '@/lib/export/reactExporter';
import { generateHTMLCode } from '@/lib/export/htmlExporter';
import { Copy, Download } from 'lucide-react';

type ExportFormat = 'react' | 'html';

export function ExportPanel() {
  const config = usePopupStore((state) => state.config);
  const [activeFormat, setActiveFormat] = useState<ExportFormat>('react');
  const [copied, setCopied] = useState(false);

  const code = useMemo(() => {
    if (!config) return '// Select a template to export code';
    return activeFormat === 'react'
      ? generateReactComponent(config)
      : generateHTMLCode(config);
  }, [config, activeFormat]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    if (!config) return;

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =
      activeFormat === 'react'
        ? `${config.name.replace(/[^a-zA-Z0-9]/g, '')}.tsx`
        : `${config.name.replace(/[^a-zA-Z0-9]/g, '')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!config) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl glass border-2 border-dashed border-white/20">
        <div className="text-center">
          <p className="text-white/70 text-lg">
            Select a template to export code
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col glass rounded-2xl overflow-hidden">
      <div className="mb-4 flex items-center justify-between border-b border-white/20 bg-white/5 p-4">
        <h2 className="text-2xl font-bold text-white">
          Export Code
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-primary text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Copy code to clipboard"
          >
            <Copy className="h-4 w-4" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold border border-white/30 hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
            aria-label="Download code file"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-2 border-b border-white/20 bg-white/5 p-2">
        <button
          type="button"
          onClick={() => setActiveFormat('react')}
          className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
            activeFormat === 'react'
              ? 'bg-gradient-primary text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          aria-selected={activeFormat === 'react'}
          role="tab"
        >
          React Component
        </button>
        <button
          type="button"
          onClick={() => setActiveFormat('html')}
          className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
            activeFormat === 'html'
              ? 'bg-gradient-primary text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          aria-selected={activeFormat === 'html'}
          role="tab"
        >
          HTML/CSS/JS
        </button>
      </div>

      <div className="flex-1 overflow-auto rounded-lg m-4 border border-white/10 bg-gray-900/50">
        <SyntaxHighlighter
          language={activeFormat === 'react' ? 'tsx' : 'html'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            background: 'transparent',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
