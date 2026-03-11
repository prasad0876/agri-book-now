import { Sprout, Wheat, Scissors, SprayCan, Trash2 } from "lucide-react";

const features = [
{ icon: Sprout, title: "దుక్కి · Ploughing", description: "లోతైన మరియు సమానమైన దుక్కి కోసం ఆధునిక ట్రాక్టర్. మట్టిని సారవంతంగా చేయండి.", price: "₹800/ఎకరం" },
{ icon: Wheat, title: "కోత · Harvesting", description: "పంట సమయానికి కోయండి. గోధుమ, వరి, మొక్కజొన్న అన్ని పంటలకు.", price: "₹1,200/ఎకరం" },
{ icon: Scissors, title: "విత్తనం · Seeding", description: "సరైన లోతు మరియు దూరంలో విత్తనం. విత్తనం ఆదా మరియు మంచి దిగుబడి.", price: "₹600/ఎకరం" },
{ icon: SprayCan, title: "పిచికారి · Spraying", description: "పురుగు మందు మరియు ఎరువు సమానంగా పిచికారి. పంటను రక్షించండి.", price: "₹400/ఎకరం" },
{ icon: Trash2, title: "శుభ్రపరచడం · Cleaning", description: "పొలం శుభ్రపరచడం మరియు చదును చేయడం. తదుపరి విత్తనం కోసం సిద్ధం చేయండి.", price: "₹500/ఎకరం" }];


const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-muted/50 rounded-none">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">మా సేవలు · Our Services</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">రైతులకు తక్కువ ధరలో నమ్మకమైన సేవలు. ప్రతి పొలం, ప్రతి పంటకు.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) =>
          <div key={f.title} className="rounded-2xl bg-card border border-border p-6 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/15 mb-4">
                <f.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{f.description}</p>
              <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-full">{f.price}</span>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default ServicesSection;