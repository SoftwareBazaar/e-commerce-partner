import { Link } from "react-router-dom";
import { Award, Globe, Lightbulb, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const values = [
  { icon: Target, title: "Disciplined", desc: "Risk-first design. Every tool ships with rules to protect your capital." },
  { icon: Lightbulb, title: "Transparent", desc: "Clear logic, honest results, no recycled YouTube hype." },
  { icon: Award, title: "Battle-tested", desc: "Tools used on live and prop-firm accounts before they reach you." },
  { icon: Globe, title: "Global", desc: "Traders from 40+ countries trust NeuroAlgo to power their setups." },
];

const About = () => (
  <>
    <section className="border-b border-border bg-card/30 py-14">
      <div className="container-tight text-center">
        <Badge variant="outline" className="border-primary/40 text-primary mb-3">About</Badge>
        <h1 className="font-display text-4xl md:text-5xl font-bold">Built by a trader, for traders.</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          NeuroAlgo Forex Edge delivers premium Expert Advisors, advanced indicators, and professional mentorship built for disciplined, high-performance trading. Designed with real-market experience to help traders achieve precision, confidence, and consistency.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container-tight grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <h2 className="font-display text-3xl font-bold">The story</h2>
          <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Eight years ago, NeuroAlgo Forex Edge was built from real trading experience, discipline, and consistency. After learning the hard lessons of emotional trading and blown accounts, we focused on creating professional trading systems driven by logic, risk management, and precision.
            </p>
            <p>
              Today, we develop battle-tested EAs, indicators, and mentorship programs designed for traders who value structure, professionalism, and long-term growth.
            </p>
            <p>
              Empowering traders through smart tools, proven strategies, and disciplined execution to achieve confidence and consistency in the financial markets.
            </p>
          </div>
          <Button asChild className="mt-6 bg-gradient-primary text-primary-foreground">
            <Link to="/booking">Book a free call with me</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-gradient-card p-5">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold">{v.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
