import { Search, CalendarCheck, Truck } from "lucide-react";

const steps = [
  { icon: Search, title: "1. ట్రాక్టర్ & సేవ ఎంచుకోండి", subtitle: "Choose Tractor & Service", description: "మీ అవసరం ప్రకారం ట్రాక్టర్ ఎంచుకోండి — దుక్కి, విత్తనం, కోత, పిచికారి లేదా శుభ్రపరచడం." },
  { icon: CalendarCheck, title: "2. తేదీ & ఎకరాలు తెలియజేయండి", subtitle: "Pick Date & Acres", description: "క్యాలెండర్ నుండి తేదీ ఎంచుకోండి మరియు ఎన్ని ఎకరాలు పని ఉందో చెప్పండి. అద్దె వెంటనే కనిపిస్తుంది." },
  { icon: Truck, title: "3. బుకింగ్ పక్కా!", subtitle: "Booking Confirmed!", description: "పేరు, మొబైల్ నంబర్ మరియు గ్రామం పేరు నమోదు చేయండి. ట్రాక్టర్ మీ పొలానికి వస్తుంది." },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">ఎలా బుక్ చేయాలి? · How It Works</h2>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">కేవలం 3 సులభమైన స్టెప్‌లలో ట్రాక్టర్ బుక్ చేయండి. చాలా సులభం!</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center p-8 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary text-secondary-foreground mb-6">
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-1 font-display">{step.title}</h3>
              <p className="text-sm text-secondary mb-3">{step.subtitle}</p>
              <p className="text-primary-foreground/70 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
