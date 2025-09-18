"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Languages, Globe2 } from "lucide-react"

const languages = [
  // Popular Languages
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", region: "Popular", speakers: "1.5B" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", region: "Popular", speakers: "1.1B" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", region: "Popular", speakers: "600M" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", region: "Popular", speakers: "500M" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", region: "Popular", speakers: "280M" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", region: "Popular", speakers: "420M" },
  
  // European Languages
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", region: "European", speakers: "100M" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", region: "European", speakers: "65M" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", region: "European", speakers: "260M" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", region: "European", speakers: "150M" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱", region: "European", speakers: "24M" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪", region: "European", speakers: "10M" },
  
  // Asian Languages
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", region: "Asian", speakers: "125M" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", region: "Asian", speakers: "77M" },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭", region: "Asian", speakers: "60M" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳", region: "Asian", speakers: "95M" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩", region: "Asian", speakers: "270M" },
  
  // Other Languages
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", region: "Other", speakers: "80M" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱", region: "Other", speakers: "45M" },
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱", region: "Other", speakers: "9M" },
]

const translations = {
  en: {
    welcome: "Welcome to our application!",
    description: "This text changes based on your language selection.",
    button: "Get Started"
  },
  es: {
    welcome: "¡Bienvenido a nuestra aplicación!",
    description: "Este texto cambia según tu selección de idioma.",
    button: "Comenzar"
  },
  fr: {
    welcome: "Bienvenue dans notre application !",
    description: "Ce texte change en fonction de votre sélection de langue.",
    button: "Commencer"
  },
  de: {
    welcome: "Willkommen in unserer Anwendung!",
    description: "Dieser Text ändert sich je nach Ihrer Sprachauswahl.",
    button: "Loslegen"
  },
  zh: {
    welcome: "欢迎使用我们的应用程序！",
    description: "此文本根据您的语言选择而变化。",
    button: "开始使用"
  },
  ja: {
    welcome: "私たちのアプリケーションへようこそ！",
    description: "このテキストは言語選択に基づいて変更されます。",
    button: "始める"
  }
}

export default function SelectLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
  
  const getLanguageInfo = (code: string) => {
    return languages.find(lang => lang.code === code)
  }
  
  const getCurrentTranslation = () => {
    return translations[selectedLanguage as keyof typeof translations] || translations.en
  }
  
  const groupedLanguages = languages.reduce((acc, language) => {
    if (!acc[language.region]) {
      acc[language.region] = []
    }
    acc[language.region].push(language)
    return acc
  }, {} as Record<string, typeof languages>)

  return (
    <div className="w-[500px]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Language Selector
          </CardTitle>
          <CardDescription>
            Choose your preferred language for the interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {Object.entries(groupedLanguages).map(([region, languages]) => (
                <div key={region}>
                  <SelectGroup>
                    <SelectLabel>{region} Languages</SelectLabel>
                    {languages.map((language) => (
                      <SelectItem key={language.code} value={language.code}>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{language.flag}</span>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{language.name}</span>
                              <span className="text-sm text-muted-foreground">
                                ({language.speakers})
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {language.nativeName}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                </div>
              ))}
            </SelectContent>
          </Select>
          
          {selectedLanguage && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">
                    {getLanguageInfo(selectedLanguage)?.flag}
                  </span>
                  <div>
                    <h4 className="font-medium">
                      {getLanguageInfo(selectedLanguage)?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {getLanguageInfo(selectedLanguage)?.nativeName}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm font-medium">
                      {getLanguageInfo(selectedLanguage)?.speakers}
                    </p>
                    <p className="text-xs text-muted-foreground">speakers</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Language Code:</span>
                    <code className="px-2 py-1 bg-background rounded text-xs">
                      {selectedLanguage}
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                <h4 className="font-medium mb-2">Preview in Selected Language</h4>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    {getCurrentTranslation().welcome}
                  </h3>
                  <p className="text-muted-foreground">
                    {getCurrentTranslation().description}
                  </p>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
                    {getCurrentTranslation().button}
                  </button>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  🌍 Language preference saved! The interface will be displayed in {getLanguageInfo(selectedLanguage)?.name}.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}