"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download, Database, Wifi } from "lucide-react";

interface LoadingState {
  id: string;
  title: string;
  description: string;
  progress: number;
  isActive: boolean;
  icon: React.ReactNode;
  color: string;
}

export function LoadingStates() {
  const [loadingStates, setLoadingStates] = useState<LoadingState[]>([
    {
      id: "download",
      title: "Downloading Files",
      description: "Fetching latest updates...",
      progress: 0,
      isActive: false,
      icon: <Download className="h-4 w-4" />,
      color: "[&>div]:bg-blue-500"
    },
    {
      id: "database",
      title: "Database Sync",
      description: "Synchronizing data...",
      progress: 0,
      isActive: false,
      icon: <Database className="h-4 w-4" />,
      color: "[&>div]:bg-green-500"
    },
    {
      id: "network",
      title: "Network Connection",
      description: "Establishing connection...",
      progress: 0,
      isActive: false,
      icon: <Wifi className="h-4 w-4" />,
      color: "[&>div]:bg-purple-500"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStates(prevStates =>
        prevStates.map(state => {
          if (state.isActive && state.progress < 100) {
            const increment = Math.random() * 8 + 2;
            const newProgress = Math.min(state.progress + increment, 100);
            
            return {
              ...state,
              progress: newProgress,
              isActive: newProgress < 100
            };
          }
          return state;
        })
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const startLoading = (id: string) => {
    setLoadingStates(prevStates =>
      prevStates.map(state =>
        state.id === id 
          ? { ...state, isActive: true, progress: 0 }
          : state
      )
    );
  };

  const resetAll = () => {
    setLoadingStates(prevStates =>
      prevStates.map(state => ({
        ...state,
        isActive: false,
        progress: 0
      }))
    );
  };

  const startAllSequentially = () => {
    resetAll();
    
    setTimeout(() => startLoading("download"), 100);
    setTimeout(() => startLoading("database"), 2000);
    setTimeout(() => startLoading("network"), 4000);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Loader2 className="h-5 w-5" />
          Loading States
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {loadingStates.map((state) => (
          <div key={state.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {state.isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  state.icon
                )}
                <div>
                  <p className="text-sm font-medium">{state.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {state.description}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium">
                  {Math.round(state.progress)}%
                </p>
                {state.progress === 100 && (
                  <p className="text-xs text-green-600">Complete</p>
                )}
              </div>
            </div>
            
            <Progress 
              value={state.progress} 
              className={`w-full ${state.color}`}
            />
            
            <Button
              onClick={() => startLoading(state.id)}
              disabled={state.isActive}
              variant="outline"
              size="sm"
              className="w-full"
            >
              {state.isActive ? "Loading..." : `Start ${state.title}`}
            </Button>
          </div>
        ))}
        
        <div className="flex gap-2 pt-4 border-t">
          <Button
            onClick={startAllSequentially}
            size="sm"
            className="flex-1"
          >
            Start All
          </Button>
          <Button
            onClick={resetAll}
            variant="outline"
            size="sm"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}