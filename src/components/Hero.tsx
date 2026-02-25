import heroImage from "@/assets/hero-tractor.jpg";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";

const Hero = () => {
  const scrollToFleet = () => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm mb-6">
            <Calendar className="h-4 w-4" />
            Smart Booking Platform
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6">
            Book Your Tractor,{" "}
            <span className="text-secondary">Grow Your Farm</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-lg leading-relaxed">
            Access modern agricultural machinery on-demand. Book tractors for plowing, harvesting, and more — all at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={scrollToFleet}
              className="text-lg px-8 py-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full"
            >
              Browse Fleet
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToFleet}
              className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
            >
              How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
