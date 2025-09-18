"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BarChart3, PieChart, TrendingUp, Users, DollarSign, Activity } from "lucide-react"

export default function SwitchDashboardWidgets() {
  const [analytics, setAnalytics] = useState(true)
  const [salesChart, setSalesChart] = useState(true)
  const [userMetrics, setUserMetrics] = useState(false)
  const [revenue, setRevenue] = useState(true)
  const [performance, setPerformance] = useState(false)
  const [realTimeData, setRealTimeData] = useState(true)

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Dashboard Widgets
        </CardTitle>
        <CardDescription>
          Customize which widgets appear on your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="analytics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Analytics Overview
            </Label>
            <p className="text-sm text-muted-foreground">
              Show website traffic and engagement metrics
            </p>
          </div>
          <Switch
            id="analytics"
            checked={analytics}
            onCheckedChange={setAnalytics}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="sales-chart" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Sales Chart
            </Label>
            <p className="text-sm text-muted-foreground">
              Display sales trends and forecasts
            </p>
          </div>
          <Switch
            id="sales-chart"
            checked={salesChart}
            onCheckedChange={setSalesChart}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="user-metrics" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Metrics
            </Label>
            <p className="text-sm text-muted-foreground">
              Show active users and registration stats
            </p>
          </div>
          <Switch
            id="user-metrics"
            checked={userMetrics}
            onCheckedChange={setUserMetrics}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="revenue" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Revenue Tracking
            </Label>
            <p className="text-sm text-muted-foreground">
              Monitor income and profit margins
            </p>
          </div>
          <Switch
            id="revenue"
            checked={revenue}
            onCheckedChange={setRevenue}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="performance" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Performance Monitor
            </Label>
            <p className="text-sm text-muted-foreground">
              Track system performance and uptime
            </p>
          </div>
          <Switch
            id="performance"
            checked={performance}
            onCheckedChange={setPerformance}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="real-time-data" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Real-time Data
            </Label>
            <p className="text-sm text-muted-foreground">
              Enable live data updates and notifications
            </p>
          </div>
          <Switch
            id="real-time-data"
            checked={realTimeData}
            onCheckedChange={setRealTimeData}
          />
        </div>
      </CardContent>
    </Card>
  )
}