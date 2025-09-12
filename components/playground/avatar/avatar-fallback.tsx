import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AvatarFallbackDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://broken-link.jpg" alt="Broken image" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}