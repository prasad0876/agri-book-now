import { Tractor } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/60 py-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-primary-foreground">
          <Tractor className="h-5 w-5 text-secondary" />
          <span className="font-bold font-display">AgriBook</span>
        </div>
        <p className="text-sm">© 2026 AgriBook. All rights reserved. Smart Agriculture Tractor Booking.</p>
      </div>
    </footer>
  );
};

export default Footer;
