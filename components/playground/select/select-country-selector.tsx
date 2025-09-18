"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
]

export default function SelectCountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  
  const getCountryInfo = (code: string) => {
    return countries.find(country => country.code === code)
  }

  return (
    <div className="w-[400px]">
      <Card>
        <CardHeader>
          <CardTitle>Country Selector</CardTitle>
          <CardDescription>
            Select your country for shipping and billing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country-select">Country/Region</Label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger id="country-select">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedCountry && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Selected Country</h4>
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {getCountryInfo(selectedCountry)?.flag}
                </span>
                <div>
                  <p className="font-medium">
                    {getCountryInfo(selectedCountry)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Country Code: {selectedCountry}
                  </p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-background rounded border">
                <p className="text-xs text-muted-foreground">
                  💡 Shipping rates and tax calculations will be based on this selection
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}