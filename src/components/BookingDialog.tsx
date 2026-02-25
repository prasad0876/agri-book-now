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
import { Checkbox } from "@/components/ui/checkbox";
import type { TractorService } from "./TractorCard";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tractorName: string;
  pricePerDay: number;
  services: TractorService[];
}

const BookingDialog = ({ open, onOpenChange, tractorName, pricePerDay, services }: BookingDialogProps) => {
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [acres, setAcres] = useState("1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const days = startDate && endDate
    ? Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  const serviceCost = selectedServices.reduce((sum, sName) => {
    const svc = services.find((s) => s.name === sName);
    return sum + (svc ? svc.pricePerAcre * Number(acres || 0) : 0);
  }, 0);

  const totalCost = days * pricePerDay + serviceCost;

  const toggleService = (sName: string) => {
    setSelectedServices((prev) =>
      prev.includes(sName) ? prev.filter((n) => n !== sName) : [...prev, sName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setSubmitted(false);
      setStep(1);
      setStartDate(undefined);
      setEndDate(undefined);
      setSelectedServices([]);
      setAcres("1");
      setName("");
      setPhone("");
      setVillage("");
    }
    onOpenChange(val);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
            <h3 className="text-2xl font-bold font-display">बुकिंग पक्की हो गई! ✅</h3>
            <p className="text-lg font-semibold text-primary">Booking Confirmed!</p>
            <p className="text-muted-foreground">
              <strong>{tractorName}</strong> — {days} दिन के लिए बुक हो गया।<br />
              गाँव: <strong>{village}</strong><br />
              कुल खर्च: <strong>₹{totalCost.toLocaleString("en-IN")}</strong><br />
              हम आपको <strong>{phone}</strong> पर कॉल करेंगे।
            </p>
            <Button onClick={() => handleClose(false)} className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              ठीक है · Done
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
          <DialogTitle className="font-display text-2xl">{tractorName} बुक करें</DialogTitle>
          <DialogDescription>सिर्फ 3 आसान स्टेप्स में बुकिंग करें · Book in 3 easy steps</DialogDescription>
        </DialogHeader>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {s}
              </div>
              {s < 3 && <div className={cn("h-0.5 w-8 rounded", step > s ? "bg-primary" : "bg-muted")} />}
            </div>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {step === 1 && "सेवा चुनें"}
            {step === 2 && "तारीख चुनें"}
            {step === 3 && "जानकारी भरें"}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Select Services */}
          {step === 1 && (
            <div className="space-y-4">
              <Label className="text-base">कौन सी सेवा चाहिए? · Select Services</Label>
              <div className="space-y-3">
                {services.map((svc) => (
                  <label
                    key={svc.name}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors",
                      selectedServices.includes(svc.name)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedServices.includes(svc.name)}
                        onCheckedChange={() => toggleService(svc.name)}
                      />
                      <span className="font-medium">{svc.name}</span>
                    </div>
                    <span className="text-sm text-primary font-semibold">₹{svc.pricePerAcre.toLocaleString("en-IN")}/एकड़</span>
                  </label>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="acres">कितने एकड़? · How many acres?</Label>
                <Input id="acres" type="number" min="1" value={acres} onChange={(e) => setAcres(e.target.value)} placeholder="1" />
              </div>
              <Button type="button" onClick={() => setStep(2)} disabled={selectedServices.length === 0} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-5">
                आगे बढ़ें · Next →
              </Button>
            </div>
          )}

          {/* Step 2: Select Dates */}
          {step === 2 && (
            <div className="space-y-4">
              <Label className="text-base">कब चाहिए? · Select Dates</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">शुरू · Start</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "dd MMM yyyy") : "तारीख चुनें"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">अंत · End</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "dd MMM yyyy") : "तारीख चुनें"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} disabled={(d) => d < (startDate || new Date())} initialFocus className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {days > 0 && (
                <div className="rounded-xl bg-muted p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>ट्रैक्टर किराया · Tractor Rent</span><span>{days} दिन × ₹{pricePerDay.toLocaleString("en-IN")} = ₹{(days * pricePerDay).toLocaleString("en-IN")}</span></div>
                  {serviceCost > 0 && <div className="flex justify-between"><span>सेवा शुल्क · Service</span><span>₹{serviceCost.toLocaleString("en-IN")}</span></div>}
                  <div className="flex justify-between font-bold text-base text-primary border-t border-border pt-2"><span>कुल · Total</span><span>₹{totalCost.toLocaleString("en-IN")}</span></div>
                </div>
              )}
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full py-5">← पीछे</Button>
                <Button type="button" onClick={() => setStep(3)} disabled={!startDate || !endDate} className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-5">आगे बढ़ें →</Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div className="space-y-4">
              <Label className="text-base">अपनी जानकारी भरें · Your Details</Label>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="fname">नाम · Name</Label>
                  <Input id="fname" value={name} onChange={(e) => setName(e.target.value)} placeholder="आपका नाम" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fphone">मोबाइल नंबर · Phone</Label>
                  <Input id="fphone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fvillage">गाँव / तहसील · Village</Label>
                  <Input id="fvillage" value={village} onChange={(e) => setVillage(e.target.value)} placeholder="आपके गाँव का नाम" required />
                </div>
              </div>
              <div className="rounded-xl bg-muted p-4 flex justify-between items-center">
                <span className="text-muted-foreground">कुल खर्च · Total</span>
                <span className="text-2xl font-bold text-primary">₹{totalCost.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-full py-5">← पीछे</Button>
                <Button type="submit" disabled={!name || !phone || !village} className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 text-base">बुक करें ✅</Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
