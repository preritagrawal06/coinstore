import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Moon } from "lucide-react"
import { Sun } from "lucide-react"
import { useState } from "react";


export default function Navbar(){
    const [lightTheme,setLightTheme] = useState(true)

    function changeTheme(){
        setLightTheme(!lightTheme)
    }
    return(
        <div className="flex flex-row items-center justify-between bg-none w-[100%] absolute top-1 px-6 ">
            <div className="h-[70px] w-[100px] bg-cover">
                <img alt="Logo" src="/logo.png"/>
            </div>
            <div className="flex items-center gap-4">
                <Button className="m-0"><PersonIcon className="mr-2 h-4 w-4"/>Login</Button>
                <Switch className="data-[state=checked]:bg-[#ffbf00] data-[state=unchecked]:bg-[#123456]"
                        checkedIcon={<Moon  />}  
                         uncheckedIcon={<Sun />}
                         lightTheme={lightTheme}
                         onCheckedChange={changeTheme}
                         />
            </div>
        </div>
    )
}