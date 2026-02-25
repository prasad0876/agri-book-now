import { Tractor } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/60 py-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-primary-foreground">
          <Tractor className="h-5 w-5 text-secondary" />
          <span className="font-bold font-display">AgriBook</span>
        </div>
        <p className="text-sm text-center">© 2026 AgriBook — किसानों के लिए स्मार्ट ट्रैक्टर बुकिंग। सर्वाधिकार सुरक्षित।</p>
      </div>
    </footer>
  );
};

export default Footer;
