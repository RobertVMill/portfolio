// src/lib/analytics.ts

// Type declarations for gtag
declare global {
    interface Window {
      gtag: {
        (
          command: 'config',
          targetId: string,
          config?: {
            page_path?: string;
            event_category?: string;
            event_label?: string;
            value?: number;
          }
        ): void;
        (
          command: 'event',
          action: string,
          config: {
            event_category: string;
            event_label: string;
            value?: number;
          }
        ): void;
      }
    }
  }
  
  export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
  
  interface GAEvent {
    action: string;
    category: string;
    label: string;
    value?: number;
  }
  
  export function trackPageview(url: string): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID!, {
        page_path: url,
      });
    }
  }
  
  export function trackEvent({ action, category, label, value }: GAEvent): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }