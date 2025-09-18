"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users, Target } from "lucide-react";

interface Project {
  id: string;
  name: string;
  progress: number;
  status: "on-track" | "at-risk" | "delayed" | "completed";
  dueDate: string;
  team: { name: string; avatar?: string }[];
  tasksCompleted: number;
  totalTasks: number;
}

export function ProjectProgress() {
  const projects: Project[] = [
    {
      id: "1",
      name: "E-commerce Platform",
      progress: 85,
      status: "on-track",
      dueDate: "Dec 15, 2024",
      team: [
        { name: "Alice", avatar: "/avatars/alice.jpg" },
        { name: "Bob", avatar: "/avatars/bob.jpg" },
        { name: "Carol" }
      ],
      tasksCompleted: 34,
      totalTasks: 40
    },
    {
      id: "2",
      name: "Mobile App Redesign",
      progress: 60,
      status: "at-risk",
      dueDate: "Jan 20, 2025",
      team: [
        { name: "David" },
        { name: "Eve" }
      ],
      tasksCompleted: 18,
      totalTasks: 30
    },
    {
      id: "3",
      name: "API Documentation",
      progress: 100,
      status: "completed",
      dueDate: "Nov 30, 2024",
      team: [
        { name: "Frank" },
        { name: "Grace" },
        { name: "Henry" }
      ],
      tasksCompleted: 25,
      totalTasks: 25
    },
    {
      id: "4",
      name: "Database Migration",
      progress: 25,
      status: "delayed",
      dueDate: "Dec 1, 2024",
      team: [
        { name: "Ivy" },
        { name: "Jack" }
      ],
      tasksCompleted: 5,
      totalTasks: 20
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return { 
          color: "[&>div]:bg-green-500", 
          badge: "bg-green-100 text-green-800",
          label: "Completed"
        };
      case "on-track":
        return { 
          color: "[&>div]:bg-blue-500", 
          badge: "bg-blue-100 text-blue-800",
          label: "On Track"
        };
      case "at-risk":
        return { 
          color: "[&>div]:bg-yellow-500", 
          badge: "bg-yellow-100 text-yellow-800",
          label: "At Risk"
        };
      case "delayed":
        return { 
          color: "[&>div]:bg-red-500", 
          badge: "bg-red-100 text-red-800",
          label: "Delayed"
        };
      default:
        return { 
          color: "[&>div]:bg-gray-500", 
          badge: "bg-gray-100 text-gray-800",
          label: "Unknown"
        };
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-4">
      <h3 className="text-lg font-semibold">Project Dashboard</h3>
      
      {projects.map((project) => {
        const statusConfig = getStatusConfig(project.status);
        
        return (
          <Card key={project.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{project.name}</CardTitle>
                <Badge className={`${statusConfig.badge}`}>
                  {statusConfig.label}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress 
                  value={project.progress} 
                  className={`w-full ${statusConfig.color}`}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Due:</span>
                  <span>{project.dueDate}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Tasks:</span>
                  <span>{project.tasksCompleted}/{project.totalTasks}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Team:</span>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}