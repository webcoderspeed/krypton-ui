import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function DrawerScrollable() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Scrollable Content</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Terms and Conditions</DrawerTitle>
          <DrawerDescription>
            Please read through our terms and conditions carefully.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto flex-1">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold mb-2">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground">
                By accessing and using this service, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">2. Use License</h3>
              <p className="text-muted-foreground">
                Permission is granted to temporarily download one copy of the materials on our 
                website for personal, non-commercial transitory viewing only. This is the grant 
                of a license, not a transfer of title.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">3. Disclaimer</h3>
              <p className="text-muted-foreground">
                The materials on our website are provided on an &apos;as is&apos; basis. We make no warranties, 
                expressed or implied, and hereby disclaim and negate all other warranties including 
                without limitation, implied warranties or conditions of merchantability.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">4. Limitations</h3>
              <p className="text-muted-foreground">
                In no event shall our company or its suppliers be liable for any damages (including, 
                without limitation, damages for loss of data or profit, or due to business interruption) 
                arising out of the use or inability to use the materials on our website.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">5. Privacy Policy</h3>
              <p className="text-muted-foreground">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, 
                and protect your information when you use our service. By using our service, you 
                agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold mb-2">6. Governing Law</h3>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with the laws 
                and you irrevocably submit to the exclusive jurisdiction of the courts in that state 
                or location.
              </p>
            </section>
          </div>
        </div>
        <DrawerFooter>
          <Button>I Agree</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}