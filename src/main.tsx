
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import buffer for browser environment
import { Buffer } from 'buffer';

// Make Buffer available globally
window.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(<App />);
