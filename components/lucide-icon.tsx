import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

type LucideIconName = keyof typeof LucideIcons;

interface LucideIconProps extends LucideProps {
  name: LucideIconName;
}

const LucideIcon = ({ name, ...props }: LucideIconProps) => {
  const Icon = LucideIcons[name] as React.FC<LucideProps>;
  if (!Icon) {
    console.warn(`Lucide icon "${name}" not found`);
    return null;
  }
  return <Icon {...props} />;
};

export default LucideIcon;
export type { LucideIconProps };
