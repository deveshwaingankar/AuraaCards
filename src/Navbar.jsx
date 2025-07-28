import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] bg-clip-text text-transparent">
          Auraa Cards
        </Link>
        <div className="hidden md:flex space-x-6 text-white">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/about" className="hover:text-orange-500">About</Link>
          <Link to="/features" className="hover:text-orange-500">Features</Link>
          <Link to="/blog" className="hover:text-orange-500">Blog</Link>
          <Link to="/contact" className="hover:text-orange-500">Contact</Link>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(o => !o)}>
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-md px-6 py-4 space-y-4">
          <Link to="/" className="block text-white hover:text-orange-500" onClick={()=>setOpen(false)}>Home</Link>
          <Link to="/about" className="block text-white hover:text-orange-500" onClick={()=>setOpen(false)}>About</Link>
          <Link to="/features" className="block text-white hover:text-orange-500" onClick={()=>setOpen(false)}>Features</Link>
          <Link to="/blog" className="block text-white hover:text-orange-500" onClick={()=>setOpen(false)}>Blog</Link>
          <Link to="/contact" className="block text-white hover:text-orange-500" onClick={()=>setOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}