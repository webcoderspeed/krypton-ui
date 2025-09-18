"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FormData {
  country: string
  state: string
  city: string
  category: string
}

interface FormErrors {
  country?: string
  state?: string
  category?: string
}

export default function MultipleSelectsForm() {
  const [formData, setFormData] = useState<FormData>({
    country: "",
    state: "",
    city: "",
    category: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" }
  ]

  const states: Record<string, { value: string; label: string }[]> = {
    us: [
      { value: "ca", label: "California" },
      { value: "ny", label: "New York" },
      { value: "tx", label: "Texas" }
    ],
    ca: [
      { value: "on", label: "Ontario" },
      { value: "bc", label: "British Columbia" },
      { value: "qc", label: "Quebec" }
    ],
    uk: [
      { value: "en", label: "England" },
      { value: "sc", label: "Scotland" },
      { value: "wa", label: "Wales" }
    ]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: FormErrors = {}
    
    if (!formData.country) newErrors.country = "Country is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.category) newErrors.category = "Category is required"
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Location & Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Select 
              value={formData.country} 
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, country: value, state: "", city: "" }))
                setErrors(prev => ({ ...prev, country: "" }))
              }}
            >
              <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State/Province *</Label>
            <Select 
              value={formData.state} 
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, state: value, city: "" }))
                setErrors(prev => ({ ...prev, state: "" }))
              }}
              disabled={!formData.country}
            >
              <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {formData.country && states[formData.country]?.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-sm text-red-500">{errors.state}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select 
              value={formData.city} 
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, city: value }))
              }}
              disabled={!formData.state}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="city1">City 1</SelectItem>
                <SelectItem value="city2">City 2</SelectItem>
                <SelectItem value="city3">City 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, category: value }))
                setErrors(prev => ({ ...prev, category: "" }))
              }}
            >
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}