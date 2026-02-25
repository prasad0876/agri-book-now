import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, Gauge, Settings2, Sprout, Scissors, Wheat, SprayCan, Trash2 } from "lucide-react";
import BookingDialog from "./BookingDialog";

export interface TractorService {
  name: string;
  icon: React.ElementType;
  pricePerAcre: number;
}

export interface TractorData {
  name: string;
  image: string;
  hp: number;
  fuel: string;
  type: string;
  pricePerDay: number;
  available: boolean;
  services: TractorService[];
}

const serviceIcons: Record<string, React.ElementType> = {
  Ploughing: Sprout,
  Harvesting: Wheat,
  Seeding: Scissors,
  Spraying: SprayCan,
  Cleaning: Trash2,
};

const TractorCard = ({ name, image, hp, fuel, type, pricePerDay, available, services }: TractorData) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <div className="group rounded-2xl bg-card overflow-hidden border border-border transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge
            className={`absolute top-4 right-4 ${available ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            {available ? "उपलब्ध · Available" : "बुक हो चुका · Booked"}
          </Badge>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 font-display">{name}</h3>
          <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-secondary" />
              {hp} HP
            </span>
            <span className="flex items-center gap-1.5">
              <Fuel className="h-4 w-4 text-secondary" />
              {fuel}
            </span>
            <span className="flex items-center gap-1.5">
              <Settings2 className="h-4 w-4 text-secondary" />
              {type}
            </span>
          </div>

          {/* Services */}
          <div className="mb-5">
            <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Services Available</p>
            <div className="flex flex-wrap gap-1.5">
              {services.map((s) => {
                const Icon = serviceIcons[s.name] || Sprout;
                return (
                  <span key={s.name} className="inline-flex items-center gap-1 text-xs bg-muted rounded-full px-2.5 py-1 text-foreground">
                    <Icon className="h-3 w-3 text-secondary" />
                    {s.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">₹{pricePerDay.toLocaleString("en-IN")}</span>
              <span className="text-muted-foreground text-sm"> / दिन (day)</span>
            </div>
            <Button
              onClick={() => setBookingOpen(true)}
              disabled={!available}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              बुक करें
            </Button>
          </div>
        </div>
      </div>
      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        tractorName={name}
        pricePerDay={pricePerDay}
        services={services}
      />
    </>
  );
};

export default TractorCard;
