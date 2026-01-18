import React from 'react';
import { cn } from '@/lib/utils';
import { type PopupType } from '@/types';

interface TemplatePreviewProps {
  type: PopupType;
  className?: string;
}

export function TemplatePreview({ type, className }: TemplatePreviewProps) {
  return (
    <div className={cn("relative w-full aspect-[4/3] bg-muted/20 rounded-lg overflow-hidden border border-white/5", className)}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', 
             backgroundSize: '8px 8px' 
           }} 
      />
      
      {/* Layout Schematic */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* Browser Frame */}
        <div className="w-full h-full bg-background/50 rounded border border-white/10 relative shadow-sm overflow-hidden flex flex-col">
          {/* Header Bar */}
          <div className="h-2 border-b border-white/10 flex items-center px-1 gap-0.5">
            <div className="w-1 h-1 rounded-full bg-red-400/50" />
            <div className="w-1 h-1 rounded-full bg-yellow-400/50" />
            <div className="w-1 h-1 rounded-full bg-green-400/50" />
          </div>

          {/* Page Content Skeleton */}
          <div className="flex-1 p-2 space-y-2 opacity-30">
             <div className="h-2 w-3/4 bg-muted-foreground/20 rounded" />
             <div className="h-2 w-1/2 bg-muted-foreground/20 rounded" />
             <div className="h-16 w-full bg-muted-foreground/10 rounded mt-2" />
          </div>

          {/* Popup Schematic */}
          {type === 'modal' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-3/5 h-auto aspect-[4/3] bg-primary/20 backdrop-blur-sm border border-primary/40 rounded shadow-sm flex flex-col items-center justify-center gap-1 p-2">
                <div className="w-2/3 h-1.5 bg-primary/60 rounded-full" />
                <div className="w-1/2 h-1 bg-primary/40 rounded-full" />
                <div className="w-1/3 h-2 bg-primary rounded mt-1" />
              </div>
            </div>
          )}

          {type === 'banner' && (
             <div className="absolute top-0 left-0 right-0 h-8 bg-primary/20 backdrop-blur-sm border-b border-primary/40 flex items-center justify-between px-3">
                <div className="w-1/2 h-1 bg-primary/60 rounded-full" />
                <div className="w-4 h-2 bg-primary rounded" />
             </div>
          )}

          {type === 'slide-in' && (
            <div className="absolute bottom-2 right-2 w-1/3 aspect-[4/5] bg-primary/20 backdrop-blur-sm border border-primary/40 rounded shadow-sm flex flex-col items-center justify-center gap-1 p-1">
               <div className="w-3/4 h-1 bg-primary/60 rounded-full" />
               <div className="w-full h-1 bg-primary/40 rounded-full" />
               <div className="w-1/2 h-1.5 bg-primary rounded mt-1" />
            </div>
          )}

          {type === 'floating' && (
             <div className="absolute bottom-3 right-3 w-8 h-8 bg-primary/20 backdrop-blur-sm border border-primary/40 rounded-full shadow-sm flex items-center justify-center">
               <div className="w-4 h-4 bg-primary/60 rounded-sm" />
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
