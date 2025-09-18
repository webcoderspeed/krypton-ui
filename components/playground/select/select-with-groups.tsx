import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectWithGroups() {
  return (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          <SelectItem value="cst-china">China Standard Time (CST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Australia</SelectLabel>
          <SelectItem value="aest">Australian Eastern Standard Time (AEST)</SelectItem>
          <SelectItem value="acst">Australian Central Standard Time (ACST)</SelectItem>
          <SelectItem value="awst">Australian Western Standard Time (AWST)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}