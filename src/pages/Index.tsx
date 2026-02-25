import tractor1 from "@/assets/tractor-1.jpg";
import tractor2 from "@/assets/tractor-2.jpg";
import tractor3 from "@/assets/tractor-3.jpg";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TractorCard from "@/components/TractorCard";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

const tractors = [
  {
    name: "GreenForce 6250R",
    image: tractor1,
    hp: 250,
    fuel: "Diesel",
    type: "Row Crop",
    pricePerDay: 320,
    available: true,
  },
  {
    name: "Compact CX35",
    image: tractor2,
    hp: 35,
    fuel: "Diesel",
    type: "Utility",
    pricePerDay: 120,
    available: true,
  },
  {
    name: "BlueHarvest T7060",
    image: tractor3,
    hp: 180,
    fuel: "Diesel",
    type: "General Purpose",
    pricePerDay: 260,
    available: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />

      <section id="fleet" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Fleet</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Top-maintained tractors for every farming need. Pick the right machine and book instantly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tractors.map((tractor) => (
              <TractorCard key={tractor.name} {...tractor} />
            ))}
          </div>
        </div>
      </section>

      <div id="how">
        <HowItWorks />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
