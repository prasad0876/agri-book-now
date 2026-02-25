import { Sprout, Wheat, Scissors, SprayCan, Trash2 } from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "जुताई · Ploughing",
    description: "गहरी और एक समान जुताई के लिए आधुनिक ट्रैक्टर। मिट्टी को उपजाऊ बनाएं।",
    price: "₹800/एकड़",
  },
  {
    icon: Wheat,
    title: "कटाई · Harvesting",
    description: "फसल की समय पर कटाई करें। गेहूं, धान, मक्का सभी फसलों के लिए।",
    price: "₹1,200/एकड़",
  },
  {
    icon: Scissors,
    title: "बुवाई · Seeding",
    description: "सही गहराई और दूरी पर बुवाई। बीज की बचत और अच्छी उपज।",
    price: "₹600/एकड़",
  },
  {
    icon: SprayCan,
    title: "छिड़काव · Spraying",
    description: "कीटनाशक और खाद का समान छिड़काव। फसल की सुरक्षा करें।",
    price: "₹400/एकड़",
  },
  {
    icon: Trash2,
    title: "सफाई · Cleaning",
    description: "खेत की सफाई और समतल करना। अगली बुवाई के लिए तैयार करें।",
    price: "₹500/एकड़",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            हमारी सेवाएं · Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            किसानों के लिए सस्ती और भरोसेमंद सेवाएं। हर खेत, हर फसल के लिए।
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-card border border-border p-6 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/15 mb-4">
                <f.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{f.description}</p>
              <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-full">
                {f.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
