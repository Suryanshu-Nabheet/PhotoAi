import { PricingCard } from "./pricing-card";

export default function PricingSection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your AI image generation needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out PhotoAI",
    features: [
      "10 AI Images per month",
      "Basic AI models",
      "Standard quality",
      "Community support",
      "Basic export options",
    ],
    highlighted: false,
    buttonText: "Get Started",
    buttonLink: "/dashboard",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For professionals and creators",
    features: [
      "500 AI Images per month",
      "All premium AI models",
      "HD & 4K quality",
      "Priority support",
      "Advanced editing tools",
      "Commercial license",
      "API access",
    ],
    highlighted: true,
    buttonText: "Start Free Trial",
    buttonLink: "/dashboard",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and businesses",
    features: [
      "Unlimited AI Images",
      "Custom AI models",
      "8K quality",
      "Dedicated support",
      "Team collaboration",
      "Custom integrations",
      "SLA guarantee",
      "White-label options",
    ],
    highlighted: false,
    buttonText: "Contact Sales",
    buttonLink: "#contact",
  },
];
