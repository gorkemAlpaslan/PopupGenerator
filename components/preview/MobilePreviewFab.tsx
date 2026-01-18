'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X } from 'lucide-react';
import { usePopupStore } from '@/lib/stores/popupStore';
import { PopupRenderer } from './PopupRenderer';

export function MobilePreviewFab() {
  const config = usePopupStore((state) => state.config);
  const [isOpen, setIsOpen] = useState(false);

  // Close preview when config changes (new template selected)
  useEffect(() => {
    setIsOpen(false);
  }, [config]);

  if (!config) return null;

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center lg:hidden"
            aria-label="Preview Popup"
          >
            <Eye className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm lg:hidden flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="bg-transparent flex justify-center">
                 <PopupRenderer
                    config={config}
                    isVisible={true}
                    onClose={() => setIsOpen(false)}
                    previewMode={true}
                  />
              </div>
              
              <p className="text-center text-white/50 text-sm mt-8">
                Tap outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
