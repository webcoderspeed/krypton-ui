"use client";

import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  Verified,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Users,
  TrendingUp,
  Clock
} from "lucide-react";

const posts = [
  {
    id: 1,
    author: {
      name: "Alex Chen",
      username: "@alexchen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      verified: true,
      followers: 12500,
      following: 890,
      bio: "Frontend Developer | React Enthusiast | Building beautiful UIs",
      location: "San Francisco, CA",
      website: "alexchen.dev",
      joinDate: "March 2020"
    },
    content: "Just shipped a new feature using React Server Components! The performance improvements are incredible 🚀",
    timestamp: "2h",
    likes: 234,
    comments: 45,
    shares: 12,
    bookmarks: 67,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    hashtags: ["#React", "#WebDev", "#Performance"],
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 2,
    author: {
      name: "Sarah Johnson",
      username: "@sarahj_design",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      verified: false,
      followers: 8900,
      following: 1200,
      bio: "UX Designer | Design Systems | Making digital experiences delightful ✨",
      location: "New York, NY",
      website: "sarahdesigns.com",
      joinDate: "January 2021"
    },
    content: "Working on a new design system component library. Here's a sneak peek at our button variants! What do you think?",
    timestamp: "4h",
    likes: 189,
    comments: 32,
    shares: 8,
    bookmarks: 45,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=200&fit=crop",
    hashtags: ["#DesignSystems", "#UI", "#Figma"],
    isLiked: true,
    isBookmarked: false
  },
  {
    id: 3,
    author: {
      name: "Tech News Daily",
      username: "@technewsdaily",
      avatar: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=40&h=40&fit=crop&crop=center",
      verified: true,
      followers: 45600,
      following: 234,
      bio: "Latest tech news, trends, and insights | Daily updates on the tech world 📱💻",
      location: "Global",
      website: "technewsdaily.com",
      joinDate: "June 2019"
    },
    content: "BREAKING: New JavaScript framework promises 50% faster rendering. Early benchmarks show impressive results across all major browsers.",
    timestamp: "6h",
    likes: 567,
    comments: 123,
    shares: 89,
    bookmarks: 234,
    image: null,
    hashtags: ["#JavaScript", "#WebDev", "#TechNews"],
    isLiked: false,
    isBookmarked: true
  }
];

export default function HoverCardSocialMedia() {
  const [postStates, setPostStates] = useState<Record<number, { isLiked: boolean; isBookmarked: boolean; likes: number }>>(
    posts.reduce((acc, post) => ({
      ...acc,
      [post.id]: {
        isLiked: post.isLiked,
        isBookmarked: post.isBookmarked,
        likes: post.likes
      }
    }), {} as Record<number, { isLiked: boolean; isBookmarked: boolean; likes: number }>)
  );

  const toggleLike = (postId: number) => {
    setPostStates(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        isLiked: !prev[postId].isLiked,
        likes: prev[postId].isLiked ? prev[postId].likes - 1 : prev[postId].likes + 1
      }
    }));
  };

  const toggleBookmark = (postId: number) => {
    setPostStates(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        isBookmarked: !prev[postId].isBookmarked
      }
    }));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Social Media Feed</h3>
        <p className="text-sm text-muted-foreground">
          Hover over user avatars to see detailed profiles and engagement stats
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {posts.map((post) => {
          const currentState = postStates[post.id];
          
          return (
            <div key={post.id} className="border rounded-lg bg-card">
              {/* Post Header */}
              <div className="p-4 flex items-start gap-3">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="cursor-pointer">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80" side="right">
                    <div className="space-y-4">
                      {/* Profile Header */}
                      <div className="flex items-start gap-3">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback className="text-lg">
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{post.author.name}</h4>
                            {post.author.verified && (
                              <Verified className="h-4 w-4 text-blue-500 fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{post.author.username}</p>
                          <Button size="sm" className="mt-2">
                            Follow
                          </Button>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm leading-relaxed">{post.author.bio}</p>

                      {/* Stats */}
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">{formatNumber(post.author.following)}</span>
                          <span className="text-muted-foreground">Following</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">{formatNumber(post.author.followers)}</span>
                          <span className="text-muted-foreground">Followers</span>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {post.author.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{post.author.location}</span>
                          </div>
                        )}
                        {post.author.website && (
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4" />
                            <span className="text-blue-600 hover:underline cursor-pointer">
                              {post.author.website}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {post.author.joinDate}</span>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Recent Activity</div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-3 w-3" />
                            <span>Posted 3 times this week</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            <span>Gained 45 followers this month</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{post.author.name}</span>
                    {post.author.verified && (
                      <Verified className="h-4 w-4 text-blue-500 fill-current" />
                    )}
                    <span className="text-sm text-muted-foreground">{post.author.username}</span>
                    <span className="text-sm text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-sm leading-relaxed mb-3">{post.content}</p>
                
                {/* Hashtags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.hashtags.map((hashtag, index) => (
                    <span key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                      {hashtag}
                    </span>
                  ))}
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="rounded-lg overflow-hidden border">
                    <img 
                      src={post.image} 
                      alt="Post content"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Engagement Stats */}
              <div className="px-4 py-2 border-t border-b text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>{currentState.likes} likes</span>
                  <span>{post.comments} comments</span>
                  <span>{post.shares} shares</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(post.id)}
                    className={`gap-2 ${currentState.isLiked ? 'text-red-600' : ''}`}
                  >
                    <Heart className={`h-4 w-4 ${currentState.isLiked ? 'fill-current' : ''}`} />
                    <span>{currentState.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share className="h-4 w-4" />
                    <span>{post.shares}</span>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleBookmark(post.id)}
                  className={currentState.isBookmarked ? 'text-blue-600' : ''}
                >
                  <Bookmark className={`h-4 w-4 ${currentState.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}