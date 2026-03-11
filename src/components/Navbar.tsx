import { useState } from "react";
import { Tractor, Phone, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onLoginClick?: () => void;
}

const Navbar = ({ onLoginClick }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2 text-primary-foreground">
          <Tractor className="h-6 w-6 text-secondary" />
          <span className="text-lg font-bold font-display">AgriBook</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-primary-foreground/70">
          <a href="#fleet" className="hover:text-primary-foreground transition-colors">ట్రాక్టర్లు · Tractors</a>
          <a href="#services" className="hover:text-primary-foreground transition-colors">సేవలు · Services</a>
          <a href="#how" className="hover:text-primary-foreground transition-colors">ఎలా బుక్ చేయాలి</a>
          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <span>+91 98765 43210</span>
          </div>
          <Button size="sm" variant="outline" onClick={onLoginClick} className="rounded-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            <User className="h-4 w-4 mr-1" /> Login
          </Button>
        </div>
        <button className="md:hidden text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-foreground/95 backdrop-blur-md border-t border-primary-foreground/10 p-4 space-y-3 text-primary-foreground/70">
          <a href="#fleet" className="block py-2" onClick={() => setMobileOpen(false)}>ట్రాక్టర్లు · Tractors</a>
          <a href="#services" className="block py-2" onClick={() => setMobileOpen(false)}>సేవలు · Services</a>
          <a href="#how" className="block py-2" onClick={() => setMobileOpen(false)}>ఎలా బుక్ చేయాలి</a>
          <Button size="sm" variant="outline" onClick={() => { setMobileOpen(false); onLoginClick?.(); }} className="w-full rounded-full border-secondary text-secondary">
            <User className="h-4 w-4 mr-1" /> Login
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
