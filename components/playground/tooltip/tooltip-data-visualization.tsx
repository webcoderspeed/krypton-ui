"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

export default function TooltipDataVisualization() {
  const chartData = [
    { month: "Jan", value: 65, color: "bg-blue-500" },
    { month: "Feb", value: 78, color: "bg-green-500" },
    { month: "Mar", value: 52, color: "bg-yellow-500" },
    { month: "Apr", value: 89, color: "bg-purple-500" },
    { month: "May", value: 94, color: "bg-red-500" },
    { month: "Jun", value: 71, color: "bg-indigo-500" },
  ]

  const progressData = [
    { label: "CPU Usage", value: 67, color: "bg-blue-500", details: "4 cores, 2.8 GHz average" },
    { label: "Memory", value: 84, color: "bg-green-500", details: "13.4 GB of 16 GB used" },
    { label: "Storage", value: 45, color: "bg-yellow-500", details: "225 GB of 500 GB used" },
    { label: "Network", value: 23, color: "bg-purple-500", details: "115 Mbps of 500 Mbps" },
  ]

  return (
    <div className="flex items-center justify-center p-8">
      <TooltipProvider>
        <div className="space-y-8 w-full max-w-2xl">
          {/* Bar Chart */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Monthly Revenue Chart</h3>
            <div className="flex items-end justify-center gap-4 h-48 bg-muted/20 rounded-lg p-4">
              {chartData.map((item, index) => (
                <div key={item.month} className="flex flex-col items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`w-12 ${item.color} rounded-t cursor-help transition-opacity hover:opacity-80`}
                        style={{ height: `${(item.value / 100) * 160}px` }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-medium">{item.month} 2024</p>
                        <p className="text-sm">Revenue: ${item.value}k</p>
                        <p className="text-xs text-muted-foreground">
                          {item.value > 80 ? "Excellent performance" : 
                           item.value > 60 ? "Good performance" : "Needs improvement"}
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">System Metrics</h3>
            <div className="space-y-4">
              {progressData.map((item, index) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.label}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm text-muted-foreground cursor-help">
                          {item.value}%
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p className="font-medium">{item.label} Details</p>
                          <p className="text-sm">{item.details}</p>
                          <p className="text-xs text-muted-foreground">
                            Status: {item.value > 80 ? "High usage" : 
                                    item.value > 50 ? "Moderate usage" : "Low usage"}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Data Points */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Interactive Data Points</h3>
            <div className="grid grid-cols-3 gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-card border rounded-lg p-4 cursor-help hover:bg-muted/50 transition-colors">
                    <div className="text-2xl font-bold text-blue-600">1,234</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Active Users Today</p>
                    <p className="text-sm">Peak: 1,456 at 2:30 PM</p>
                    <p className="text-sm">Growth: +12% from yesterday</p>
                    <p className="text-xs text-muted-foreground">Last updated: 2 minutes ago</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-card border rounded-lg p-4 cursor-help hover:bg-muted/50 transition-colors">
                    <div className="text-2xl font-bold text-green-600">$45.2k</div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Monthly Revenue</p>
                    <p className="text-sm">Target: $50k (90% achieved)</p>
                    <p className="text-sm">Average order: $127</p>
                    <p className="text-xs text-muted-foreground">Projected: $48.5k by month end</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-card border rounded-lg p-4 cursor-help hover:bg-muted/50 transition-colors">
                    <div className="text-2xl font-bold text-purple-600">98.5%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">System Uptime</p>
                    <p className="text-sm">Last 30 days: 98.5%</p>
                    <p className="text-sm">Downtime: 10.8 hours total</p>
                    <p className="text-xs text-muted-foreground">SLA target: 99.9%</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}