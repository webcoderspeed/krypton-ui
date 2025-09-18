"use client"

import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Zap,
  Shield,
  Wifi,
  Battery
} from "lucide-react"

export default function TooltipStatusIndicators() {
  return (
    <div className="flex items-center justify-center p-8">
      <TooltipProvider>
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">System Status Dashboard</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Service Status */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Services</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CheckCircle className="h-4 w-4 text-green-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-medium">API Service: Online</p>
                        <p className="text-xs">Response time: 45ms</p>
                        <p className="text-xs">Uptime: 99.9%</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm">API Gateway</span>
                </div>

                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertTriangle className="h-4 w-4 text-yellow-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-medium">Database: Degraded</p>
                        <p className="text-xs">High latency detected</p>
                        <p className="text-xs">Response time: 2.3s</p>
                        <p className="text-xs">Investigation in progress</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm">Database</span>
                </div>

                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <XCircle className="h-4 w-4 text-red-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-medium">Email Service: Down</p>
                        <p className="text-xs">Last seen: 2 hours ago</p>
                        <p className="text-xs">Error: Connection timeout</p>
                        <p className="text-xs">ETA fix: 30 minutes</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm">Email Service</span>
                </div>
              </div>
            </div>

            {/* User Status */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">User Status</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="h-2 w-2 bg-green-500 rounded-full cursor-help"></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Online - Active 2 minutes ago</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm">John Doe</span>
                </div>

                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="h-2 w-2 bg-yellow-500 rounded-full cursor-help"></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Away - Last seen 15 minutes ago</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm">Jane Smith</span>
                </div>

                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="h-2 w-2 bg-gray-400 rounded-full cursor-help"></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Offline - Last seen 2 hours ago</p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm">Mike Johnson</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Metrics */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">System Metrics</h4>
            <div className="flex gap-4 justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="cursor-help">
                    <Zap className="h-3 w-3 mr-1" />
                    Performance
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">System Performance</p>
                    <p className="text-xs">CPU: 45%</p>
                    <p className="text-xs">Memory: 62%</p>
                    <p className="text-xs">Disk: 78%</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="cursor-help">
                    <Shield className="h-3 w-3 mr-1" />
                    Security
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Security Status</p>
                    <p className="text-xs">SSL Certificate: Valid</p>
                    <p className="text-xs">Firewall: Active</p>
                    <p className="text-xs">Last scan: 1 hour ago</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="cursor-help">
                    <Wifi className="h-3 w-3 mr-1" />
                    Network
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Network Status</p>
                    <p className="text-xs">Bandwidth: 850 Mbps</p>
                    <p className="text-xs">Latency: 12ms</p>
                    <p className="text-xs">Packet loss: 0.1%</p>
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