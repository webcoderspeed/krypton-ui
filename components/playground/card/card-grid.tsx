"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CardGrid() {
  const cards = [
    {
      title: "Team Plan",
      description: "Perfect for small teams",
      price: "$29",
      features: ["Up to 10 users", "2GB storage", "Email support"],
      badge: "Popular",
    },
    {
      title: "Pro Plan",
      description: "Best for professionals",
      price: "$59",
      features: ["Up to 50 users", "10GB storage", "Priority support"],
      badge: "Recommended",
    },
    {
      title: "Enterprise",
      description: "For large organizations",
      price: "$99",
      features: ["Unlimited users", "100GB storage", "24/7 support"],
      badge: "Enterprise",
    },
  ];

  return (
    <div className="flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} className="w-[300px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{card.title}</CardTitle>
                <Badge variant="secondary">{card.badge}</Badge>
              </div>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.price}<span className="text-sm font-normal">/month</span></div>
              <ul className="mt-4 space-y-2">
                {card.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-muted-foreground">
                    • {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}