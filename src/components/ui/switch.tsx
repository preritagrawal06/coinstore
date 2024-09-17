import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"


import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    checkedIcon: React.ReactElement;   
    uncheckedIcon: React.ReactElement;
    lightTheme:boolean;
  }
>(({ className,checkedIcon, uncheckedIcon,lightTheme, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-9 w-[4rem] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    {
      lightTheme?<SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none flex h-7 w-8 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0 items-center justify-center data-[state=checked]:bg"
      )}
    >
      {checkedIcon}
    </SwitchPrimitives.Thumb>:
    <SwitchPrimitives.Thumb
    className={cn(
      "pointer-events-none flex h-7 w-8 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0 items-center justify-center data-[state=checked]:bg"
    )}
  >
    {uncheckedIcon}
  </SwitchPrimitives.Thumb>
    }
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
