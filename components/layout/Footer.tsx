'use client';

import React from 'react';
import { ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">About This Project</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              A professional-grade popup generator built to demonstrate modern frontend capabilities.
            </p>
            <div className="pt-2">
              <p className="font-medium text-foreground">Görkem Derin Alpaslan</p>
              <p className="text-sm text-muted-foreground">Frontend Developer</p>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Connect</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://gorkemalpaslan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Portfolio</span>
              </a>
              <a
                href="https://github.com/gorkemalpaslan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/gorkemderinalpaslan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Built With</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Next.js 14',
                'TypeScript',
                'Tailwind CSS',
                'Framer Motion',
                'Zustand',
                'Lucide React',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} PopupGen. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <span className="text-red-500">❤️</span> by Görkem
          </p>
        </div>
      </div>
    </footer>
  );
}
