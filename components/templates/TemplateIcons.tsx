import React from 'react';
import { 
  Mail, 
  Tag, 
  XOctagon, 
  Hand, 
  Megaphone, 
  Share2, 
  ShieldCheck, 
  Zap, 
  Cookie, 
  ShoppingBag, 
  Download, 
  Timer, 
  Inbox, 
  ClipboardList, 
  MessageSquare, 
  PlayCircle 
} from 'lucide-react';

export const getTemplateIcon = (id: string, className?: string) => {
  const props = { className: className || "w-5 h-5" };

  switch (id) {
    // Modals
    case 'newsletter-signup': return <Mail {...props} />;
    case 'discount-offer': return <Tag {...props} />;
    case 'exit-intent': return <XOctagon {...props} />;
    case 'welcome-message': return <Hand {...props} />;
    case 'product-announcement': return <Megaphone {...props} />;
    case 'social-media-follow': return <Share2 {...props} />;
    case 'age-verification': return <ShieldCheck {...props} />;
    case 'free-trial': return <Zap {...props} />;
    
    // Banners
    case 'cookie-consent': return <Cookie {...props} />;
    case 'sale-announcement': return <ShoppingBag {...props} />;
    case 'download-offer': return <Download {...props} />;
    case 'limited-time-offer': return <Timer {...props} />;
    
    // Slide-ins
    case 'email-capture': return <Inbox {...props} />;
    case 'survey-request': return <ClipboardList {...props} />;
    
    // Floating
    case 'feedback-request': return <MessageSquare {...props} />;
    case 'video-popup': return <PlayCircle {...props} />;
    
    default: return <Mail {...props} />;
  }
};
