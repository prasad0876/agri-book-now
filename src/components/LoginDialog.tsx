import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, User, LogIn } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEMO_CREDENTIALS = {
  email: "farmer@agribook.in",
  password: "farmer123",
  name: "రాజు · Raju",
  phone: "+91 98765 43210",
  location: "అనంతపురం, ఆంధ్రప్రదేశ్",
};

const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  const [isRegister, setIsRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regLocation, setRegLocation] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      setLoggedIn(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setLoggedIn(false);
      setRegistered(false);
      setIsRegister(false);
      setEmail("");
      setPassword("");
      setRegName("");
      setRegPhone("");
      setRegEmail("");
      setRegPassword("");
      setRegLocation("");
    }
    onOpenChange(val);
  };

  if (loggedIn) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
            <h3 className="text-2xl font-bold font-display">స్వాగతం! · Welcome!</h3>
            <div className="bg-muted rounded-xl p-4 w-full text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">పేరు · Name</span><span className="font-medium">{DEMO_CREDENTIALS.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">ఈమెయిల్ · Email</span><span className="font-medium">{DEMO_CREDENTIALS.email}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">ఫోన్ · Phone</span><span className="font-medium">{DEMO_CREDENTIALS.phone}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">లొకేషన్ · Location</span><span className="font-medium">{DEMO_CREDENTIALS.location}</span></div>
            </div>
            <Button onClick={() => handleClose(false)} className="mt-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">సరే · Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (registered) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
            <h3 className="text-2xl font-bold font-display">రిజిస్ట్రేషన్ పూర్తయింది! ✅</h3>
            <p className="text-muted-foreground">Registration Complete! మీరు ఇప్పుడు లాగిన్ చేయవచ్చు.</p>
            <Button onClick={() => { setRegistered(false); setIsRegister(false); }} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">లాగిన్ చేయండి · Login</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            {isRegister ? <><User className="h-6 w-6" /> రిజిస్టర్ · Register</> : <><LogIn className="h-6 w-6" /> లాగిన్ · Login</>}
          </DialogTitle>
          <DialogDescription>
            {isRegister ? "కొత్త ఖాతా సృష్టించండి · Create a new account" : "మీ ఖాతాలో లాగిన్ చేయండి · Login to your account"}
          </DialogDescription>
        </DialogHeader>

        {!isRegister ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lemail">ఈమెయిల్ · Email</Label>
              <Input id="lemail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="farmer@agribook.in" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lpass">పాస్‌వర్డ్ · Password</Label>
              <Input id="lpass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <div className="rounded-xl bg-muted p-3 text-xs text-muted-foreground">
              <p className="font-semibold mb-1">డెమో లాగిన్ · Demo Credentials:</p>
              <p>Email: <strong>{DEMO_CREDENTIALS.email}</strong></p>
              <p>Password: <strong>{DEMO_CREDENTIALS.password}</strong></p>
              <Button type="button" size="sm" variant="ghost" onClick={fillDemo} className="mt-1 text-primary text-xs h-7">ఆటో ఫిల్ · Auto Fill</Button>
            </div>
            <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-5">లాగిన్ · Login</Button>
            <p className="text-center text-sm text-muted-foreground">
              ఖాతా లేదా?{" "}
              <button type="button" onClick={() => setIsRegister(true)} className="text-primary font-semibold underline">రిజిస్టర్ చేయండి · Register</button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="rname">పేరు · Name</Label>
              <Input id="rname" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="మీ పేరు" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remail">ఈమెయిల్ · Email</Label>
              <Input id="remail" type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="example@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rphone">మొబైల్ నంబర్ · Phone</Label>
              <Input id="rphone" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} placeholder="+91 98765 43210" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rloc">లొకేషన్ · Location</Label>
              <Input id="rloc" value={regLocation} onChange={(e) => setRegLocation(e.target.value)} placeholder="గ్రామం, జిల్లా, రాష్ట్రం" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rpass">పాస్‌వర్డ్ · Password</Label>
              <Input id="rpass" type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-5">రిజిస్టర్ · Register</Button>
            <p className="text-center text-sm text-muted-foreground">
              ఖాతా ఉందా?{" "}
              <button type="button" onClick={() => setIsRegister(false)} className="text-primary font-semibold underline">లాగిన్ చేయండి · Login</button>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
