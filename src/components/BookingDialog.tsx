import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tractorName: string;
  pricePerDay: number;
}

const BookingDialog = ({ open, onOpenChange, tractorName, pricePerDay }: BookingDialogProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const days = startDate && endDate
    ? Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setSubmitted(false);
      setStartDate(undefined);
      setEndDate(undefined);
      setName("");
      setPhone("");
    }
    onOpenChange(val);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
            <h3 className="text-2xl font-bold font-display">Booking Confirmed!</h3>
            <p className="text-muted-foreground">
              Your <strong>{tractorName}</strong> has been booked for {days} day{days > 1 ? "s" : ""}.
              We'll contact you at <strong>{phone}</strong> with details.
            </p>
            <Button onClick={() => handleClose(false)} className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Book {tractorName}</DialogTitle>
          <DialogDescription>Select your dates and fill in your details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} disabled={(d) => d < (startDate || new Date())} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Farmer" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" required />
          </div>
          {days > 0 && (
            <div className="rounded-xl bg-muted p-4 flex justify-between items-center">
              <span className="text-muted-foreground">{days} day{days > 1 ? "s" : ""} × ${pricePerDay}</span>
              <span className="text-2xl font-bold text-primary">${days * pricePerDay}</span>
            </div>
          )}
          <Button type="submit" disabled={!startDate || !endDate || !name || !phone} className="w-full rounded-full py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90">
            Confirm Booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
