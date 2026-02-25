import { Search, CalendarCheck, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Select",
    description: "Explore our fleet of modern tractors and find the perfect match for your farming needs.",
  },
  {
    icon: CalendarCheck,
    title: "Pick Your Dates",
    description: "Choose your rental period with our easy calendar. Flexible daily or weekly rates available.",
  },
  {
    icon: Truck,
    title: "Get It Delivered",
    description: "We deliver the tractor to your farm and pick it up when you're done. Simple as that.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
            Three simple steps to get the equipment you need on your farm.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="text-center p-8 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary text-secondary-foreground mb-6">
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">{step.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
