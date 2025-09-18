import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function DrawerSimple() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Simple Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Simple Drawer</DrawerTitle>
          <DrawerDescription>
            A minimal drawer with just a title and description.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-8">
          <DrawerClose asChild>
            <Button className="w-full">Close</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}