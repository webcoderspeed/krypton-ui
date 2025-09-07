import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionMultiple() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes! This accordion allows multiple items to be open at the same time.
          You can expand as many sections as you need.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          The accordion is set to type=&quot;multiple&quot; which enables this behavior.
          Each item can be toggled independently.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What are the benefits?</AccordionTrigger>
        <AccordionContent>
          Multiple open items allow users to compare content across sections
          and maintain context while exploring different topics.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Any limitations?</AccordionTrigger>
        <AccordionContent>
          No significant limitations. Just be mindful of content length
          as multiple open items might make the page quite long.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}