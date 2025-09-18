"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

export function SkillProgress() {
  const skills: Skill[] = [
    { name: "React", level: 90, category: "Frontend", color: "[&>div]:bg-blue-500" },
    { name: "TypeScript", level: 85, category: "Language", color: "[&>div]:bg-blue-600" },
    { name: "Node.js", level: 80, category: "Backend", color: "[&>div]:bg-green-500" },
    { name: "Python", level: 75, category: "Language", color: "[&>div]:bg-yellow-500" },
    { name: "PostgreSQL", level: 70, category: "Database", color: "[&>div]:bg-indigo-500" },
    { name: "Docker", level: 65, category: "DevOps", color: "[&>div]:bg-cyan-500" },
    { name: "AWS", level: 60, category: "Cloud", color: "[&>div]:bg-orange-500" },
    { name: "GraphQL", level: 55, category: "API", color: "[&>div]:bg-pink-500" }
  ];

  const getSkillLevel = (level: number) => {
    if (level >= 80) return { label: "Expert", color: "bg-green-100 text-green-800" };
    if (level >= 60) return { label: "Advanced", color: "bg-blue-100 text-blue-800" };
    if (level >= 40) return { label: "Intermediate", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Beginner", color: "bg-gray-100 text-gray-800" };
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Technical Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.map((skill, index) => {
          const skillLevel = getSkillLevel(skill.level);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{skill.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {skill.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${skillLevel.color}`}>
                    {skillLevel.label}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
              </div>
              
              <Progress 
                value={skill.level} 
                className={`w-full ${skill.color}`}
              />
            </div>
          );
        })}
        
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Overall Proficiency</span>
            <span>{Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%</span>
          </div>
          <Progress 
            value={skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length} 
            className="w-full mt-2 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-blue-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}