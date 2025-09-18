"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Thermometer } from "lucide-react";

export default function SliderTemperature() {
  const [temperature, setTemperature] = useState([22]);

  const getTemperatureColor = (temp: number) => {
    if (temp < 16) return "text-blue-500";
    if (temp < 20) return "text-cyan-500";
    if (temp < 24) return "text-green-500";
    if (temp < 28) return "text-yellow-500";
    return "text-red-500";
  };

  const getTemperatureLabel = (temp: number) => {
    if (temp < 16) return "Cold";
    if (temp < 20) return "Cool";
    if (temp < 24) return "Comfortable";
    if (temp < 28) return "Warm";
    return "Hot";
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Thermostat Control</label>
        <div className="flex items-center space-x-3">
          <Thermometer className={`h-4 w-4 ${getTemperatureColor(temperature[0])}`} />
          <Slider
            value={temperature}
            onValueChange={setTemperature}
            max={35}
            min={10}
            step={1}
            className="flex-1"
          />
        </div>
        <div className="text-center space-y-1">
          <div className={`text-2xl font-bold ${getTemperatureColor(temperature[0])}`}>
            {temperature[0]}°C
          </div>
          <div className="text-sm text-muted-foreground">
            {getTemperatureLabel(temperature[0])}
          </div>
        </div>
      </div>
    </div>
  );
}