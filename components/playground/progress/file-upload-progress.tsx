"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle, XCircle, File } from "lucide-react";

interface FileUpload {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed" | "error";
}

export function FileUploadProgress() {
  const [files, setFiles] = useState<FileUpload[]>([
    {
      id: "1",
      name: "document.pdf",
      size: "2.4 MB",
      progress: 0,
      status: "uploading"
    },
    {
      id: "2", 
      name: "image.jpg",
      size: "1.8 MB",
      progress: 0,
      status: "uploading"
    },
    {
      id: "3",
      name: "video.mp4", 
      size: "15.2 MB",
      progress: 0,
      status: "uploading"
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isUploading) {
      interval = setInterval(() => {
        setFiles(prevFiles => 
          prevFiles.map(file => {
            if (file.status === "uploading" && file.progress < 100) {
              const increment = Math.random() * 5 + 1;
              const newProgress = Math.min(file.progress + increment, 100);
              
              return {
                ...file,
                progress: newProgress,
                status: newProgress === 100 ? "completed" : "uploading"
              };
            }
            return file;
          })
        );
      }, 200);
    }

    return () => clearInterval(interval);
  }, [isUploading]);

  const handleStartUpload = () => {
    setIsUploading(true);
    setFiles(files.map(file => ({ ...file, progress: 0, status: "uploading" })));
  };

  const handleReset = () => {
    setIsUploading(false);
    setFiles(files.map(file => ({ ...file, progress: 0, status: "uploading" })));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Upload className="h-4 w-4 text-blue-500" />;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "completed":
        return "[&>div]:bg-green-500";
      case "error":
        return "[&>div]:bg-red-500";
      default:
        return "[&>div]:bg-blue-500";
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          File Upload Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {files.map((file) => (
          <div key={file.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium truncate">{file.name}</span>
              </div>
              {getStatusIcon(file.status)}
            </div>
            
            <div className="space-y-1">
              <Progress 
                value={file.progress} 
                className={`w-full ${getProgressColor(file.status)}`}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{file.size}</span>
                <span>{Math.round(file.progress)}%</span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleStartUpload}
            disabled={isUploading}
            size="sm"
            className="flex-1"
          >
            {isUploading ? "Uploading..." : "Start Upload"}
          </Button>
          <Button 
            onClick={handleReset}
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