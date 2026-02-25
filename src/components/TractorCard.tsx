import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, Gauge, Settings2 } from "lucide-react";
import BookingDialog from "./BookingDialog";

interface TractorCardProps {
  name: string;
  image: string;
  hp: number;
  fuel: string;
  type: string;
  pricePerDay: number;
  available: boolean;
}

const TractorCard = ({ name, image, hp, fuel, type, pricePerDay, available }: TractorCardProps) => {
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
            {available ? "Available" : "Booked"}
          </Badge>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 font-display">{name}</h3>
          <div className="flex flex-wrap gap-3 mb-5 text-sm text-muted-foreground">
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
          <div className="flex items-end justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">${pricePerDay}</span>
              <span className="text-muted-foreground text-sm"> / day</span>
            </div>
            <Button
              onClick={() => setBookingOpen(true)}
              disabled={!available}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        tractorName={name}
        pricePerDay={pricePerDay}
      />
    </>
  );
};

export default TractorCard;
