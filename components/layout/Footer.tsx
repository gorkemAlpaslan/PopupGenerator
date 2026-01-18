'use client';

import React from 'react';
import { ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">About This Project</h3>
            <p className="text-white/70 leading-relaxed">
              This is one of my personal projects. A modern popup generator built with cutting-edge
              technologies to help developers create beautiful popups effortlessly.
            </p>
            <div className="pt-4">
              <p className="text-white font-semibold mb-1">Görkem Derin Alpaslan</p>
              <p className="text-white/60 text-sm">Frontend Developer</p>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://gorkemalpaslan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Portfolio</span>
              </a>
              <a
                href="https://github.com/gorkemalpaslan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/gorkemderinalpaslan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Built With</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Next.js',
                'TypeScript',
                'Tailwind CSS',
                'GSAP',
                'Zustand',
                'Lucide React',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Görkem Derin Alpaslan. All rights reserved.
            </p>
            <p className="text-white/60 text-sm">
              Made with ❤️ using modern web technologies
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
