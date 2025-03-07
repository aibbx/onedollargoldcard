
// Buffer Polyfill Implementation
import { Buffer as BufferImpl } from 'buffer';

// Ensure Buffer is available globally in the browser
if (typeof window !== 'undefined') {
  window.Buffer = BufferImpl;
}

// Export for direct imports
export const Buffer = BufferImpl;

// Initialize the polyfill immediately
console.log('Buffer polyfill initialized');
