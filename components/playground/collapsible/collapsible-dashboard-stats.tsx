"use client"

import { useState } from "react"
import { ChevronDown, TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const statsData = [
  {
    id: "revenue",
    title: "Revenue Analytics",
    icon: <DollarSign className="h-5 w-5" />,
    mainStat: "$45,231",
    change: "+12.5%",
    trend: "up",
    details: [
      { label: "This Month", value: "$45,231", change: "+12.5%" },
      { label: "Last Month", value: "$40,205", change: "+8.2%" },
      { label: "Average Order", value: "$127", change: "+3.1%" },
      { label: "Total Orders", value: "356", change: "+15.3%" }
    ]
  },
  {
    id: "users",
    title: "User Metrics",
    icon: <Users className="h-5 w-5" />,
    mainStat: "2,847",
    change: "+8.2%",
    trend: "up",
    details: [
      { label: "Active Users", value: "2,847", change: "+8.2%" },
      { label: "New Signups", value: "124", change: "+22.1%" },
      { label: "Retention Rate", value: "87%", change: "+2.3%" },
      { label: "Churn Rate", value: "3.2%", change: "-0.8%" }
    ]
  },
  {
    id: "sales",
    title: "Sales Performance",
    icon: <ShoppingCart className="h-5 w-5" />,
    mainStat: "1,234",
    change: "-2.4%",
    trend: "down",
    details: [
      { label: "Total Sales", value: "1,234", change: "-2.4%" },
      { label: "Conversion Rate", value: "3.2%", change: "-0.5%" },
      { label: "Cart Abandonment", value: "68%", change: "+1.2%" },
      { label: "Avg. Session", value: "4m 32s", change: "+12s" }
    ]
  },
  {
    id: "traffic",
    title: "Website Traffic",
    icon: <Eye className="h-5 w-5" />,
    mainStat: "12,847",
    change: "+18.7%",
    trend: "up",
    details: [
      { label: "Page Views", value: "12,847", change: "+18.7%" },
      { label: "Unique Visitors", value: "8,234", change: "+15.2%" },
      { label: "Bounce Rate", value: "42%", change: "-3.1%" },
      { label: "Avg. Duration", value: "2m 45s", change: "+23s" }
    ]
  }
]

export default function CollapsibleDashboardStats() {
  const [openStats, setOpenStats] = useState<Record<string, boolean>>({})

  const toggleStat = (id: string) => {
    setOpenStats(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600"
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />
  }

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Dashboard Analytics</h2>
        <p className="text-muted-foreground">Overview of your business metrics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statsData.map((stat) => (
          <Card key={stat.id}>
            <Collapsible 
              open={openStats[stat.id]} 
              onOpenChange={() => toggleStat(stat.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {stat.icon}
                      <CardTitle className="text-lg">{stat.title}</CardTitle>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openStats[stat.id] ? 'rotate-180' : ''}`} />
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-3xl font-bold">{stat.mainStat}</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(stat.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(stat.trend)}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-3">
                      Detailed breakdown:
                    </div>
                    
                    {stat.details.map((detail, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm font-medium">{detail.label}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold">{detail.value}</span>
                          <Badge 
                            variant={detail.change.startsWith('+') ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {detail.change}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Performance vs Target</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  )
}