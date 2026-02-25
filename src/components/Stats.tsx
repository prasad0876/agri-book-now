import { Tractor, Users, MapPin, Star } from "lucide-react";

const stats = [
  { icon: Tractor, value: "200+", label: "ट्रैक्टर उपलब्ध · Tractors" },
  { icon: Users, value: "5,000+", label: "खुश किसान · Happy Farmers" },
  { icon: MapPin, value: "120+", label: "गाँव · Villages Served" },
  { icon: Star, value: "4.8", label: "रेटिंग · Rating" },
];

const Stats = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center animate-count-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <stat.icon className="h-8 w-8 text-secondary mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
