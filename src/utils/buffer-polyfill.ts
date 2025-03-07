
// Polyfill for Buffer in the browser
import { Buffer as BufferPolyfill } from 'buffer';

// Make Buffer available globally for browser environment
if (typeof window !== 'undefined') {
  window.Buffer = BufferPolyfill;
  console.log('Buffer polyfill initialized globally');
}

// Export for direct imports
export { BufferPolyfill as Buffer };
