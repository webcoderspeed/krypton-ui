"use client"

import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Grid3X3, 
  List, 
  Calendar,
  User,
  Clock,
  Star
} from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Website Redesign",
    status: "In Progress",
    assignee: "John Doe",
    dueDate: "2024-02-15",
    priority: "High"
  },
  {
    id: 2,
    title: "Mobile App Development",
    status: "Planning",
    assignee: "Jane Smith",
    dueDate: "2024-03-01",
    priority: "Medium"
  },
  {
    id: 3,
    title: "Database Migration",
    status: "Completed",
    assignee: "Mike Johnson",
    dueDate: "2024-01-30",
    priority: "High"
  }
]

export default function ToggleViewModes() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid')

  const handleViewChange = (mode: 'grid' | 'list' | 'calendar') => {
    setViewMode(mode)
  }

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <Badge variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}>
              {project.status}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              {project.assignee}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {project.dueDate}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4" />
              <Badge variant={project.priority === 'High' ? 'destructive' : 'secondary'}>
                {project.priority}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderListView = () => (
    <div className="space-y-2">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="font-semibold">{project.title}</h3>
                <Badge variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}>
                  {project.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{project.assignee}</span>
                <span>{project.dueDate}</span>
                <Badge variant={project.priority === 'High' ? 'destructive' : 'secondary'}>
                  {project.priority}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderCalendarView = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Project Timeline</h3>
      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center gap-4 p-3 border rounded-lg">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="flex-1">
              <h4 className="font-medium">{project.title}</h4>
              <p className="text-sm text-muted-foreground">Due: {project.dueDate}</p>
            </div>
            <Badge variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}>
              {project.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Dashboard</h2>
        
        {/* View Mode Toggles */}
        <div className="flex items-center gap-1 p-1 border rounded-lg bg-background">
          <Toggle 
            pressed={viewMode === 'grid'}
            onPressedChange={() => handleViewChange('grid')}
            size="sm"
            aria-label="Grid view"
          >
            <Grid3X3 className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={viewMode === 'list'}
            onPressedChange={() => handleViewChange('list')}
            size="sm"
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={viewMode === 'calendar'}
            onPressedChange={() => handleViewChange('calendar')}
            size="sm"
            aria-label="Calendar view"
          >
            <Calendar className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      {/* Content based on view mode */}
      <div className="min-h-96">
        {viewMode === 'grid' && renderGridView()}
        {viewMode === 'list' && renderListView()}
        {viewMode === 'calendar' && renderCalendarView()}
      </div>
    </div>
  )
}