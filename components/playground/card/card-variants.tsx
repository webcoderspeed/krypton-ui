import { Card, CardContent } from "@/components/ui/card"

export default function CardVariants() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">Default Card</h3>
          <p className="text-sm text-muted-foreground">
            This is a default card with standard styling.
          </p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">Card with Shadow</h3>
          <p className="text-sm text-muted-foreground">
            This card has enhanced shadow for more depth.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}