"use client"

import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { 
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  Share,
  MoreHorizontal,
  Music
} from "lucide-react"

export default function ToggleMediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off')
  const [isLiked, setIsLiked] = useState(false)
  const [volume, setVolume] = useState([75])
  const [progress, setProgress] = useState([35])

  const currentSong = {
    title: "Midnight Dreams",
    artist: "Luna & The Stars",
    album: "Cosmic Journey",
    duration: "3:42",
    currentTime: "1:18"
  }

  const handleRepeatToggle = () => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all'
      if (prev === 'all') return 'one'
      return 'off'
    })
  }

  const getRepeatIcon = () => {
    if (repeatMode === 'one') return '1'
    return null
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardContent className="p-6 space-y-6">
          {/* Album Art & Song Info */}
          <div className="text-center space-y-4">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Music className="h-16 w-16 text-white" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-bold text-lg">{currentSong.title}</h3>
              <p className="text-muted-foreground">{currentSong.artist}</p>
              <p className="text-sm text-muted-foreground">{currentSong.album}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{currentSong.currentTime}</span>
              <span>{currentSong.duration}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-4">
            <Toggle
              pressed={isShuffled}
              onPressedChange={setIsShuffled}
              size="sm"
              aria-label="Toggle shuffle"
              className="text-muted-foreground data-[state=on]:text-primary"
            >
              <Shuffle className="h-4 w-4" />
            </Toggle>

            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <SkipBack className="h-5 w-5" />
            </button>

            <Toggle
              pressed={isPlaying}
              onPressedChange={setIsPlaying}
              size="lg"
              aria-label={isPlaying ? "Pause" : "Play"}
              className="bg-primary text-primary-foreground hover:bg-primary/90 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </Toggle>

            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <SkipForward className="h-5 w-5" />
            </button>

            <Toggle
              pressed={repeatMode !== 'off'}
              onPressedChange={handleRepeatToggle}
              size="sm"
              aria-label="Toggle repeat"
              className="text-muted-foreground data-[state=on]:text-primary relative"
            >
              <Repeat className="h-4 w-4" />
              {repeatMode === 'one' && (
                <span className="absolute -top-1 -right-1 text-xs font-bold">
                  1
                </span>
              )}
            </Toggle>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Toggle
              pressed={isMuted}
              onPressedChange={setIsMuted}
              size="sm"
              aria-label="Toggle mute"
              className="text-muted-foreground"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Toggle>
            
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
              disabled={isMuted}
            />
            
            <span className="text-xs text-muted-foreground w-8 text-right">
              {isMuted ? 0 : volume[0]}
            </span>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center justify-between pt-2 border-t">
            <Toggle
              pressed={isLiked}
              onPressedChange={setIsLiked}
              size="sm"
              aria-label="Toggle like"
              className="text-muted-foreground data-[state=on]:text-red-500"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Toggle>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Share className="h-4 w-4 text-muted-foreground" />
              </button>
              
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            {isShuffled && (
              <span className="flex items-center gap-1">
                <Shuffle className="h-3 w-3" />
                Shuffle
              </span>
            )}
            {repeatMode !== 'off' && (
              <span className="flex items-center gap-1">
                <Repeat className="h-3 w-3" />
                {repeatMode === 'one' ? 'Repeat One' : 'Repeat All'}
              </span>
            )}
            {isMuted && (
              <span className="flex items-center gap-1">
                <VolumeX className="h-3 w-3" />
                Muted
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}