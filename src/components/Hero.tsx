import heroImage from "@/assets/hero-tractor.jpg";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";

const Hero = () => {
  const scrollToFleet = () => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] overflow-hidden flex-row flex items-center justify-start">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      <div className="container relative z-10 py-20 my-[6px] shadow-none rounded-none border-none border-0">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm mb-6">
            <Calendar className="h-4 w-4" />
            రైతులకు స్మార్ట్ బుకింగ్ · Smart Booking for Farmers
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-[sidebar-accent-foreground] text-[#f4dd10] ml-[78px] text-left bg-[#49c4d4] mx-[72px]">
            ట్రాక్టర్ బుక్ చేయండి,{" "}
            <span className="text-[#f4680b]">వ్యవసాయం పెంచండి</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-lg leading-relaxed text-[#fa054f] bg-[#c2eaa9]">
            Swaraj, Mahindra, John Deere, Farmtrac, Massey Ferguson — అన్ని బ్రాండ్ ట్రాక్టర్లు అద్దెకు. దుక్కి, విత్తనం, కోత అన్నీ తక్కువ ధరలో.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={scrollToFleet} className="text-lg px-8 py-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full">
              ట్రాక్టర్లు చూడండి · Browse
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })} className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
              ఎలా బుక్ చేయాలి?
            </Button>
          </div>
        </div>
      </div>
    </section>);

};

export default Hero;