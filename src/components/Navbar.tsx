import { Tractor, Phone, Mail } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2 text-primary-foreground">
          <Tractor className="h-6 w-6 text-secondary" />
          <span className="text-lg font-bold font-display">AgriBook</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-primary-foreground/70">
          <a href="#fleet" className="hover:text-primary-foreground transition-colors">ट्रैक्टर</a>
          <a href="#services" className="hover:text-primary-foreground transition-colors">सेवाएं</a>
          <a href="#how" className="hover:text-primary-foreground transition-colors">कैसे बुक करें</a>
          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
