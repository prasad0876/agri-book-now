import { useState } from "react";
import tractorSwaraj from "@/assets/tractor-swaraj.jpg";
import tractorMahindra from "@/assets/tractor-mahindra.jpg";
import tractorJohnDeere from "@/assets/tractor-johndeere.jpg";
import tractorFarmtrac from "@/assets/tractor-farmtrac.jpg";
import tractorMassey from "@/assets/tractor-massey241.jpg";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TractorCard from "@/components/TractorCard";
import type { TractorData } from "@/components/TractorCard";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import LoginDialog from "@/components/LoginDialog";

const tractors: TractorData[] = [
  {
    name: "Swaraj 744 FE",
    image: tractorSwaraj,
    hp: 48,
    fuel: "Diesel",
    fuelCapacity: "60L Tank",
    type: "వ్యవసాయం · Farming",
    pricePerDay: 1500,
    available: true,
    owner: { name: "వెంకటేశ్వర రావు · Venkateshwar Rao", phone: "+91 94401 23456" },
    driver: { name: "రాము · Ramu", phone: "+91 90123 45678" },
    services: [
      { name: "Ploughing", icon: () => null, pricePerAcre: 800 },
      { name: "Seeding", icon: () => null, pricePerAcre: 600 },
      { name: "Cleaning", icon: () => null, pricePerAcre: 500 },
    ],
  },
  {
    name: "Mahindra 575 DI",
    image: tractorMahindra,
    hp: 45,
    fuel: "Diesel",
    fuelCapacity: "55L Tank",
    type: "వ్యవసాయం · Farming",
    pricePerDay: 1400,
    available: true,
    owner: { name: "సుబ్బారావు · Subbarao", phone: "+91 93456 78901" },
    driver: { name: "కృష్ణ · Krishna", phone: "+91 91234 56789" },
    services: [
      { name: "Ploughing", icon: () => null, pricePerAcre: 750 },
      { name: "Harvesting", icon: () => null, pricePerAcre: 1200 },
      { name: "Spraying", icon: () => null, pricePerAcre: 400 },
      { name: "Cleaning", icon: () => null, pricePerAcre: 500 },
    ],
  },
  {
    name: "John Deere 5310",
    image: tractorJohnDeere,
    hp: 55,
    fuel: "Diesel",
    fuelCapacity: "68L Tank",
    type: "బహుళ ఉపయోగం · Multi-use",
    pricePerDay: 1800,
    available: true,
    owner: { name: "నారాయణ రెడ్డి · Narayana Reddy", phone: "+91 98765 43210" },
    driver: { name: "శ్రీను · Sreenu", phone: "+91 92345 67890" },
    services: [
      { name: "Ploughing", icon: () => null, pricePerAcre: 900 },
      { name: "Harvesting", icon: () => null, pricePerAcre: 1300 },
      { name: "Seeding", icon: () => null, pricePerAcre: 650 },
      { name: "Spraying", icon: () => null, pricePerAcre: 450 },
      { name: "Cleaning", icon: () => null, pricePerAcre: 550 },
    ],
  },
  {
    name: "Farmtrac 60 EPI",
    image: tractorFarmtrac,
    hp: 60,
    fuel: "Diesel",
    fuelCapacity: "72L Tank",
    type: "హెవీ డ్యూటీ · Heavy Duty",
    pricePerDay: 2000,
    available: true,
    owner: { name: "లక్ష్మీనారాయణ · Lakshminarayana", phone: "+91 96789 01234" },
    driver: { name: "మాధవ్ · Madhav", phone: "+91 93456 12345" },
    services: [
      { name: "Ploughing", icon: () => null, pricePerAcre: 850 },
      { name: "Harvesting", icon: () => null, pricePerAcre: 1250 },
      { name: "Cleaning", icon: () => null, pricePerAcre: 500 },
    ],
  },
  {
    name: "Massey Ferguson 241",
    image: tractorMassey,
    hp: 42,
    fuel: "Diesel",
    fuelCapacity: "50L Tank",
    type: "వ్యవసాయం · Farming",
    pricePerDay: 1300,
    available: true,
    owner: { name: "రాజశేఖర్ · Rajasekhar", phone: "+91 94567 89012" },
    driver: { name: "గణేష్ · Ganesh", phone: "+91 90987 65432" },
    services: [
      { name: "Ploughing", icon: () => null, pricePerAcre: 700 },
      { name: "Seeding", icon: () => null, pricePerAcre: 550 },
      { name: "Spraying", icon: () => null, pricePerAcre: 380 },
      { name: "Cleaning", icon: () => null, pricePerAcre: 450 },
    ],
  },
];

const Index = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLoginClick={() => setLoginOpen(true)} />
      <Hero />
      <Stats />

      <section id="fleet" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">మా ట్రాక్టర్లు · Our Fleet</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              భారతదేశపు నమ్మకమైన బ్రాండ్లు — Swaraj, Mahindra, John Deere, Farmtrac, Massey Ferguson. తక్కువ అద్దెకు బుక్ చేయండి.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tractors.map((tractor) => (
              <TractorCard key={tractor.name} {...tractor} />
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />

      <div id="how">
        <HowItWorks />
      </div>

      <Footer />
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
};

export default Index;
