"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const metrics = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$124,563",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    period: "vs last month",
    details: {
      current: 124563,
      previous: 110723,
      breakdown: [
        { label: "Product Sales", value: "$89,234", percentage: 71.6 },
        { label: "Subscriptions", value: "$28,456", percentage: 22.8 },
        { label: "Services", value: "$6,873", percentage: 5.5 }
      ],
      chartData: [
        { month: "Jan", value: 98000 },
        { month: "Feb", value: 105000 },
        { month: "Mar", value: 112000 },
        { month: "Apr", value: 118000 },
        { month: "May", value: 124563 }
      ]
    }
  },
  {
    id: 2,
    title: "Active Users",
    value: "8,429",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    period: "vs last week",
    details: {
      current: 8429,
      previous: 7789,
      breakdown: [
        { label: "Daily Active", value: "2,341", percentage: 27.8 },
        { label: "Weekly Active", value: "5,892", percentage: 69.9 },
        { label: "Monthly Active", value: "8,429", percentage: 100 }
      ],
      chartData: [
        { day: "Mon", value: 7800 },
        { day: "Tue", value: 8100 },
        { day: "Wed", value: 8300 },
        { day: "Thu", value: 8200 },
        { day: "Fri", value: 8429 }
      ]
    }
  },
  {
    id: 3,
    title: "Conversion Rate",
    value: "3.24%",
    change: "-0.8%",
    trend: "down",
    icon: ShoppingCart,
    period: "vs last month",
    details: {
      current: 3.24,
      previous: 3.26,
      breakdown: [
        { label: "Landing Page", value: "4.2%", percentage: 129.6 },
        { label: "Product Page", value: "2.8%", percentage: 86.4 },
        { label: "Checkout", value: "2.7%", percentage: 83.3 }
      ],
      chartData: [
        { week: "W1", value: 3.1 },
        { week: "W2", value: 3.3 },
        { week: "W3", value: 3.4 },
        { week: "W4", value: 3.24 }
      ]
    }
  },
  {
    id: 4,
    title: "Page Views",
    value: "45,231",
    change: "+15.3%",
    trend: "up",
    icon: Eye,
    period: "vs last week",
    details: {
      current: 45231,
      previous: 39234,
      breakdown: [
        { label: "Organic Search", value: "18,923", percentage: 41.8 },
        { label: "Direct Traffic", value: "13,567", percentage: 30.0 },
        { label: "Social Media", value: "8,741", percentage: 19.3 },
        { label: "Referrals", value: "4,000", percentage: 8.8 }
      ],
      chartData: [
        { day: "Mon", value: 8900 },
        { day: "Tue", value: 9200 },
        { day: "Wed", value: 9100 },
        { day: "Thu", value: 9031 },
        { day: "Fri", value: 9000 }
      ]
    }
  }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

export default function HoverCardAnalytics() {
  return (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
        <p className="text-sm text-muted-foreground">
          Hover over metrics to see detailed breakdowns and trends
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === "up";
          
          return (
            <HoverCard key={metric.id}>
              <HoverCardTrigger asChild>
                <div className="cursor-pointer group">
                  <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-all duration-200 group-hover:border-primary/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isPositive ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        {metric.change}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.title}</div>
                      <div className="text-xs text-muted-foreground">{metric.period}</div>
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96" side="top">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{metric.title}</h4>
                      <p className="text-sm text-muted-foreground">{metric.period}</p>
                    </div>
                    <Badge variant={isPositive ? "default" : "destructive"}>
                      {metric.change}
                    </Badge>
                  </div>

                  {/* Current vs Previous */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">Current</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-muted-foreground">
                        {metric.title.includes('Revenue') ? formatCurrency(metric.details.previous) :
                         metric.title.includes('Rate') ? `${metric.details.previous}%` :
                         formatNumber(metric.details.previous)}
                      </div>
                      <div className="text-xs text-muted-foreground">Previous</div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Breakdown</div>
                    <div className="space-y-2">
                      {metric.details.breakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{item.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.value}</span>
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(item.percentage, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mini Chart Visualization */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Trend</div>
                    <div className="h-20 flex items-end justify-between gap-1">
                      {metric.details.chartData.map((point, index) => {
                        const maxValue = Math.max(...metric.details.chartData.map(p => p.value));
                        const height = (point.value / maxValue) * 100;
                        
                        return (
                          <div key={index} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                              className={`w-full rounded-t transition-all duration-300 ${
                                isPositive ? 'bg-green-500' : 'bg-red-500'
                              }`}
                              style={{ height: `${height}%` }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {Object.values(point)[0]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>
    </div>
  );
}