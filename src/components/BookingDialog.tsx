import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FieldMap from "./FieldMap";
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
  const [email, setEmail] = useState("");
  const [village, setVillage] = useState("");
  const [fieldLocation, setFieldLocation] = useState<[number, number]>([15.5, 78.5]);
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
    setSelectedServices((prev) => prev.includes(sName) ? prev.filter((n) => n !== sName) : [...prev, sName]);
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
      setEmail("");
      setVillage("");
      setFieldLocation([15.5, 78.5]);
    }
    onOpenChange(val);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
            <h3 className="text-2xl font-bold font-display">బుకింగ్ కన్ఫర్మ్ అయింది! ✅</h3>
            <p className="text-lg font-semibold text-primary">Booking Confirmed!</p>
            <p className="text-muted-foreground">
              <strong>{tractorName}</strong> — {days} రోజులకు బుక్ అయింది.<br />
              గ్రామం: <strong>{village}</strong><br />
              మొత్తం ఖర్చు: <strong>₹{totalCost.toLocaleString("en-IN")}</strong><br />
              మేము మీకు <strong>{phone}</strong> కు కాల్ చేస్తాము.
            </p>
            <Button onClick={() => handleClose(false)} className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              సరే · Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{tractorName} బుక్ చేయండి</DialogTitle>
          <DialogDescription>కేవలం 3 సులభమైన స్టెప్‌లలో బుకింగ్ · Book in 3 easy steps</DialogDescription>
        </DialogHeader>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors", step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{s}</div>
              {s < 3 && <div className={cn("h-0.5 w-8 rounded", step > s ? "bg-primary" : "bg-muted")} />}
            </div>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {step === 1 && "సేవ ఎంచుకోండి"}
            {step === 2 && "తేదీ ఎంచుకోండి"}
            {step === 3 && "వివరాలు నమోదు చేయండి"}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <Label className="text-base">ఏ సేవ కావాలి? · Select Services</Label>
              <div className="space-y-3">
                {services.map((svc) => (
                  <label key={svc.name} className={cn("flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors", selectedServices.includes(svc.name) ? "border-primary bg-primary/5" : "border-border hover:border-primary/30")}>
                    <div className="flex items-center gap-3">
                      <Checkbox checked={selectedServices.includes(svc.name)} onCheckedChange={() => toggleService(svc.name)} />
                      <span className="font-medium">{svc.name}</span>
                    </div>
                    <span className="text-sm text-primary font-semibold">₹{svc.pricePerAcre.toLocaleString("en-IN")}/ఎకరం</span>
                  </label>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="acres">ఎన్ని ఎకరాలు? · How many acres?</Label>
                <Input id="acres" type="number" min="1" value={acres} onChange={(e) => setAcres(e.target.value)} placeholder="1" />
              </div>
              <Button type="button" onClick={() => setStep(2)} disabled={selectedServices.length === 0} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-5">
                ముందుకు · Next →
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label className="text-base">ఎప్పుడు కావాలి? · Select Dates</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">ప్రారంభం · Start</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "dd MMM yyyy") : "తేదీ ఎంచుకోండి"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">ముగింపు · End</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "dd MMM yyyy") : "తేదీ ఎంచుకోండి"}
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
                  <div className="flex justify-between"><span>ట్రాక్టర్ అద్దె · Rent</span><span>{days} రోజులు × ₹{pricePerDay.toLocaleString("en-IN")} = ₹{(days * pricePerDay).toLocaleString("en-IN")}</span></div>
                  {serviceCost > 0 && <div className="flex justify-between"><span>సేవ ఛార్జ్ · Service</span><span>₹{serviceCost.toLocaleString("en-IN")}</span></div>}
                  <div className="flex justify-between font-bold text-base text-primary border-t border-border pt-2"><span>మొత్తం · Total</span><span>₹{totalCost.toLocaleString("en-IN")}</span></div>
                </div>
              )}
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full py-5">← వెనుకకు</Button>
                <Button type="button" onClick={() => setStep(3)} disabled={!startDate || !endDate} className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-5">ముందుకు →</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label className="text-base">మీ వివరాలు నమోదు చేయండి · Your Details</Label>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="fname">పేరు · Name</Label>
                  <Input id="fname" value={name} onChange={(e) => setName(e.target.value)} placeholder="మీ పేరు" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="femail">ఈమెయిల్ · Email</Label>
                  <Input id="femail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fphone">మొబైల్ నంబర్ · Phone</Label>
                  <Input id="fphone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fvillage">గ్రామం / మండలం · Village</Label>
                  <Input id="fvillage" value={village} onChange={(e) => setVillage(e.target.value)} placeholder="మీ గ్రామం పేరు" required />
                </div>
              </div>

              {/* Field Map */}
              <div className="space-y-2">
                <Label className="text-sm">పొలం లొకేషన్ · Field Location (Map)</Label>
                <FieldMap position={fieldLocation} onPositionChange={setFieldLocation} />
                <p className="text-xs text-muted-foreground">మ్యాప్ మీద క్లిక్ చేసి మీ పొలం లొకేషన్ ఎంచుకోండి · Click on map to select your field</p>
              </div>

              <div className="rounded-xl bg-muted p-4 flex justify-between items-center">
                <span className="text-muted-foreground">మొత్తం ఖర్చు · Total</span>
                <span className="text-2xl font-bold text-primary">₹{totalCost.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-full py-5">← వెనుకకు</Button>
                <Button type="submit" disabled={!name || !phone || !village} className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 text-base">బుక్ చేయండి ✅</Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
