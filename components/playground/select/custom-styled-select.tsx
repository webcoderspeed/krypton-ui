import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function CustomStyledSelect() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Rounded Style</label>
        <Select>
          <SelectTrigger className="rounded-full border-2 border-blue-200 focus:border-blue-500 bg-blue-50">
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="option1" className="rounded-lg">Option 1</SelectItem>
            <SelectItem value="option2" className="rounded-lg">Option 2</SelectItem>
            <SelectItem value="option3" className="rounded-lg">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Minimal Style</label>
        <Select>
          <SelectTrigger className="border-0 border-b-2 border-gray-200 rounded-none focus:border-gray-900 bg-transparent">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="minimal1">Minimal Option 1</SelectItem>
            <SelectItem value="minimal2">Minimal Option 2</SelectItem>
            <SelectItem value="minimal3">Minimal Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Status with Colors</label>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Active</span>
                <Badge variant="secondary" className="ml-auto">Live</Badge>
              </div>
            </SelectItem>
            <SelectItem value="pending">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span>Pending</span>
                <Badge variant="outline" className="ml-auto">Review</Badge>
              </div>
            </SelectItem>
            <SelectItem value="inactive">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span>Inactive</span>
                <Badge variant="destructive" className="ml-auto">Off</Badge>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}