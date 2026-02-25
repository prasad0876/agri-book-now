import { Search, CalendarCheck, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. ट्रैक्टर और सेवा चुनें",
    subtitle: "Choose Tractor & Service",
    description: "अपनी ज़रूरत के हिसाब से ट्रैक्टर चुनें — जुताई, बुवाई, कटाई, छिड़काव या सफाई।",
  },
  {
    icon: CalendarCheck,
    title: "2. तारीख और एकड़ बताएं",
    subtitle: "Pick Date & Acres",
    description: "कैलेंडर से तारीख चुनें और कितने एकड़ काम है बताएं। किराया तुरंत दिखेगा।",
  },
  {
    icon: Truck,
    title: "3. बुकिंग पक्की!",
    subtitle: "Booking Confirmed!",
    description: "नाम, मोबाइल नंबर और गाँव का नाम भरें। ट्रैक्टर आपके खेत पर आएगा।",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">कैसे बुक करें? · How It Works</h2>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
            सिर्फ 3 आसान स्टेप में ट्रैक्टर बुक करें। बहुत आसान है!
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
