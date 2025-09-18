"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Mail, 
  MessageCircle, 
  Phone,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  Twitter,
  Clock
} from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Frontend Developer",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    email: "sarah.chen@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    joinDate: "March 2022",
    status: "online",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    social: {
      github: "sarahchen",
      linkedin: "sarah-chen-dev",
      twitter: "sarahcodes"
    },
    bio: "Passionate about creating beautiful and accessible user interfaces. Love working with modern web technologies."
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "DevOps Engineer",
    department: "Infrastructure",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    email: "marcus.johnson@company.com",
    phone: "+1 (555) 987-6543",
    location: "Austin, TX",
    timezone: "CST (UTC-6)",
    joinDate: "January 2021",
    status: "away",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    social: {
      github: "marcusj",
      linkedin: "marcus-johnson-devops"
    },
    bio: "Building scalable infrastructure and automating deployment pipelines. Coffee enthusiast and weekend hiker."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "UX Designer",
    department: "Design",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    email: "elena.rodriguez@company.com",
    phone: "+1 (555) 456-7890",
    location: "New York, NY",
    timezone: "EST (UTC-5)",
    joinDate: "September 2023",
    status: "busy",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    social: {
      linkedin: "elena-rodriguez-ux",
      twitter: "elenadesigns"
    },
    bio: "Creating user-centered designs that solve real problems. Always curious about user behavior and design trends."
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online": return "bg-green-500";
    case "away": return "bg-yellow-500";
    case "busy": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "online": return "Available";
    case "away": return "Away";
    case "busy": return "Busy";
    default: return "Offline";
  }
};

export default function HoverCardTeamMembers() {
  return (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Team Directory</h3>
        <p className="text-sm text-muted-foreground">
          Hover over team members to see their detailed profiles and contact information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {teamMembers.map((member) => (
          <HoverCard key={member.id}>
            <HoverCardTrigger asChild>
              <div className="cursor-pointer group">
                <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{member.name}</h4>
                      <p className="text-sm text-muted-foreground truncate">{member.role}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {member.department}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-96" side="top">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-lg">{member.name}</h4>
                    <p className="text-muted-foreground">{member.role}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{member.department}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {getStatusText(member.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>

                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="text-sm font-medium">Contact Information</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-blue-600 hover:underline cursor-pointer">
                        {member.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{member.timezone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {member.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Skills & Expertise</div>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Social Links</div>
                  <div className="flex gap-2">
                    {member.social.github && (
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                    {member.social.linkedin && (
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    )}
                    {member.social.twitter && (
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}