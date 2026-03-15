import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Tractor, User, Phone } from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: string;
  tractor_name: string;
  services: string[];
  acres: number;
  start_date: string;
  end_date: string;
  total_cost: number;
  farmer_name: string;
  farmer_phone: string;
  village: string;
  field_lat: number;
  field_lng: number;
  status: string;
  created_at: string;
}

const BookingsDisplay = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("bookings-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => {
        fetchBookings();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (!error && data) {
      setBookings(data as Booking[]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <p className="text-muted-foreground">బుకింగ్‌లు లోడ్ అవుతున్నాయి... · Loading bookings...</p>
        </div>
      </section>
    );
  }

  if (bookings.length === 0) return null;

  return (
    <section id="bookings" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ఇటీవలి బుకింగ్‌లు · Recent Bookings
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            మా రైతుల ఇటీవలి ట్రాక్టర్ బుకింగ్‌లు చూడండి · See our latest tractor bookings
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl bg-card border border-border p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Tractor className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">{booking.tractor_name}</h3>
                </div>
                <Badge className={booking.status === "confirmed" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}>
                  {booking.status === "confirmed" ? "కన్ఫర్మ్ · Confirmed" : booking.status}
                </Badge>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4 text-secondary" />
                  <span>{booking.farmer_name}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-secondary" />
                  <span>{booking.farmer_phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span>
                    {format(new Date(booking.start_date), "dd MMM")} — {format(new Date(booking.end_date), "dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span>{booking.village}</span>
                  <a
                    href={`https://www.google.com/maps?q=${booking.field_lat},${booking.field_lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline text-xs ml-auto"
                  >
                    మ్యాప్ చూడండి →
                  </a>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {booking.services.map((s) => (
                  <span key={s} className="text-xs bg-muted rounded-full px-2.5 py-1 text-foreground">{s}</span>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{booking.acres} ఎకరాలు · acres</span>
                <span className="text-lg font-bold text-primary">₹{booking.total_cost.toLocaleString("en-IN")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingsDisplay;
