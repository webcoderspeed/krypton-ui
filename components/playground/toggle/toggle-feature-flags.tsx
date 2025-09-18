"use client"

import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Flag,
  Users,
  Zap,
  Shield,
  Bell,
  Palette,
  Database,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react"

interface FeatureFlag {
  id: string
  name: string
  description: string
  category: 'ui' | 'api' | 'security' | 'experimental'
  icon: any
  enabled: boolean
  rolloutPercentage: number
  environment: 'development' | 'staging' | 'production'
  lastModified: string
  modifiedBy: string
  dependencies?: string[]
  riskLevel: 'low' | 'medium' | 'high'
}

export default function ToggleFeatureFlags() {
  const [features, setFeatures] = useState<FeatureFlag[]>([
    {
      id: 'new-dashboard',
      name: 'New Dashboard UI',
      description: 'Enable the redesigned dashboard with improved analytics',
      category: 'ui',
      icon: Palette,
      enabled: true,
      rolloutPercentage: 75,
      environment: 'staging',
      lastModified: '2024-01-15',
      modifiedBy: 'john.doe@company.com',
      riskLevel: 'low'
    },
    {
      id: 'advanced-search',
      name: 'Advanced Search API',
      description: 'Enhanced search with filters and real-time suggestions',
      category: 'api',
      icon: Database,
      enabled: false,
      rolloutPercentage: 0,
      environment: 'development',
      lastModified: '2024-01-14',
      modifiedBy: 'jane.smith@company.com',
      dependencies: ['elasticsearch-v8'],
      riskLevel: 'medium'
    },
    {
      id: 'two-factor-auth',
      name: 'Two-Factor Authentication',
      description: 'Additional security layer for user accounts',
      category: 'security',
      icon: Shield,
      enabled: true,
      rolloutPercentage: 100,
      environment: 'production',
      lastModified: '2024-01-10',
      modifiedBy: 'security@company.com',
      riskLevel: 'low'
    },
    {
      id: 'real-time-notifications',
      name: 'Real-time Notifications',
      description: 'WebSocket-based instant notifications',
      category: 'experimental',
      icon: Bell,
      enabled: false,
      rolloutPercentage: 10,
      environment: 'development',
      lastModified: '2024-01-12',
      modifiedBy: 'mike.johnson@company.com',
      dependencies: ['websocket-server'],
      riskLevel: 'high'
    },
    {
      id: 'global-cdn',
      name: 'Global CDN',
      description: 'Serve static assets from global content delivery network',
      category: 'api',
      icon: Globe,
      enabled: true,
      rolloutPercentage: 50,
      environment: 'staging',
      lastModified: '2024-01-13',
      modifiedBy: 'devops@company.com',
      riskLevel: 'medium'
    },
    {
      id: 'ai-recommendations',
      name: 'AI-Powered Recommendations',
      description: 'Machine learning based content recommendations',
      category: 'experimental',
      icon: Zap,
      enabled: false,
      rolloutPercentage: 5,
      environment: 'development',
      lastModified: '2024-01-11',
      modifiedBy: 'ai-team@company.com',
      dependencies: ['ml-service', 'recommendation-engine'],
      riskLevel: 'high'
    }
  ])

  const handleToggle = (featureId: string) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { 
            ...feature, 
            enabled: !feature.enabled,
            lastModified: new Date().toISOString().split('T')[0],
            modifiedBy: 'current.user@company.com'
          }
        : feature
    ))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ui': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'api': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'security': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'experimental': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case 'production': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'staging': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'development': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const enabledCount = features.filter(f => f.enabled).length
  const totalCount = features.length

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Flag className="h-8 w-8" />
            Feature Flags
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage feature rollouts and experimental functionality
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold">{enabledCount}/{totalCount}</div>
          <div className="text-sm text-muted-foreground">Features Enabled</div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['ui', 'api', 'security', 'experimental'].map(category => {
          const categoryFeatures = features.filter(f => f.category === category)
          const enabledInCategory = categoryFeatures.filter(f => f.enabled).length
          
          return (
            <Card key={category}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium capitalize">{category}</p>
                    <p className="text-2xl font-bold">{enabledInCategory}/{categoryFeatures.length}</p>
                  </div>
                  <Badge className={getCategoryColor(category)}>
                    {category.toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Feature Flags List */}
      <div className="space-y-4">
        {features.map((feature) => {
          const Icon = feature.icon
          
          return (
            <Card key={feature.id} className={`transition-all ${feature.enabled ? 'ring-2 ring-green-200 dark:ring-green-800' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-2 rounded-lg ${feature.enabled ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <Icon className={`h-5 w-5 ${feature.enabled ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`} />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{feature.name}</h3>
                          <Badge className={getCategoryColor(feature.category)}>
                            {feature.category}
                          </Badge>
                          <Badge className={getEnvironmentColor(feature.environment)}>
                            {feature.environment}
                          </Badge>
                          {feature.enabled ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Rollout: </span>
                          <span>{feature.rolloutPercentage}%</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all" 
                              style={{ width: `${feature.rolloutPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-medium">Risk Level: </span>
                          <span className={`font-medium ${getRiskColor(feature.riskLevel)}`}>
                            {feature.riskLevel.charAt(0).toUpperCase() + feature.riskLevel.slice(1)}
                          </span>
                          {feature.riskLevel === 'high' && (
                            <AlertTriangle className="h-4 w-4 text-red-600 inline ml-1" />
                          )}
                        </div>
                        
                        <div>
                          <span className="font-medium">Last Modified: </span>
                          <span>{feature.lastModified}</span>
                          <div className="text-xs text-muted-foreground">
                            by {feature.modifiedBy}
                          </div>
                        </div>
                      </div>

                      {feature.dependencies && feature.dependencies.length > 0 && (
                        <div>
                          <span className="font-medium text-sm">Dependencies: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {feature.dependencies.map(dep => (
                              <Badge key={dep} variant="outline" className="text-xs">
                                {dep}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Toggle
                      pressed={feature.enabled}
                      onPressedChange={() => handleToggle(feature.id)}
                      aria-label={`Toggle ${feature.name}`}
                      className="data-[state=on]:bg-green-600 data-[state=on]:text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Footer Info */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <span>
              Changes to production features require approval. High-risk features should be tested thoroughly in staging.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}