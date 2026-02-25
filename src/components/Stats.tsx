import { Tractor, Users, MapPin, Star } from "lucide-react";

const stats = [
  { icon: Tractor, value: "150+", label: "Tractors Available" },
  { icon: Users, value: "2,400+", label: "Happy Farmers" },
  { icon: MapPin, value: "35", label: "Service Areas" },
  { icon: Star, value: "4.9", label: "Average Rating" },
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
