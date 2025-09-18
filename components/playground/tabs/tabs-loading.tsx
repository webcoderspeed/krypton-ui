"use client"

import { useState, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function TabsLoading() {
  const [loading, setLoading] = useState({ tab1: false, tab2: false, tab3: false })
  const [data, setData] = useState({ tab1: null, tab2: null, tab3: null })

  const loadData = useCallback((tab: keyof typeof loading) => {
    setLoading(prev => ({ ...prev, [tab]: true }))
    
    // Simulate API call
    setTimeout(() => {
      setData(prev => ({ 
        ...prev, 
        [tab]: `Data loaded for ${tab} at ${new Date().toLocaleTimeString()}` 
      }))
      setLoading(prev => ({ ...prev, [tab]: false }))
    }, 2000)
  },[])

  useEffect(() => {
    loadData('tab1')
  }, [loadData])

  return (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Users</TabsTrigger>
        <TabsTrigger value="tab2">Orders</TabsTrigger>
        <TabsTrigger value="tab3">Products</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tab1" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Users Data</h3>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => loadData('tab1')}
            disabled={loading.tab1}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading.tab1 ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <div className="p-4 border rounded-lg">
          {loading.tab1 ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {data.tab1 || 'No data available'}
            </p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="tab2" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Orders Data</h3>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => loadData('tab2')}
            disabled={loading.tab2}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading.tab2 ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <div className="p-4 border rounded-lg">
          {loading.tab2 ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {data.tab2 || 'Click refresh to load orders data'}
            </p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="tab3" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Products Data</h3>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => loadData('tab3')}
            disabled={loading.tab3}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading.tab3 ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <div className="p-4 border rounded-lg">
          {loading.tab3 ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {data.tab3 || 'Click refresh to load products data'}
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}