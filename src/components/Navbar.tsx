// import { PersonIcon } from "@radix-ui/react-icons";
// import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Moon } from "lucide-react"
import { Sun } from "lucide-react"
import { useEffect, useState } from "react";




export default function Navbar(){

    const [darkMode,setDarkMode] = useState(false);

    function toggleDarkMode(){
        setDarkMode(!darkMode)
    }

    useEffect(()=>{
        if(darkMode){
            document.querySelector('html')?.classList.add('dark')
            window.localStorage.setItem('data-theme','dark')
        }
        else{
            document.querySelector('html')?.classList.remove('dark')
            window.localStorage.setItem('data-theme','light')
        };
    },[darkMode])
    
    return(
        <div className="flex flex-row items-center justify-between bg-none w-[100%] absolute top-1 px-6 z-10 ">
            <div className="h-[70px] w-[100px] bg-cover bg-[#0F1822] dark:bg-inherit rounded-md">
                <a href="/"><img alt="Logo" src="/logo.png"/></a>
            </div>
            <div className="flex items-center gap-4">
                {/* <Button className="m-0"><PersonIcon className="mr-2 h-4 w-4"/>Login</Button> */}
                <a href={'/#topup'} className="font-PostSB text-[20px] text-white dark:text-[#abf5f0] ">Topup</a>
            
                <a href={'/#account'} className="font-PostSB text-[20px] text-white dark:text-[#abf5f0] ">Account</a>
                <a href={'/#merchandise'} className="font-PostSB text-[20px] text-white dark:text-[#abf5f0] ">Merchandise</a>
                <Switch className="data-[state=checked]:bg-[#ffbf00] data-[state=unchecked]:bg-[#123456]"
                        checkedIcon={<Moon  />}  
                         uncheckedIcon={<Sun />}
                         lightTheme={darkMode}
                         onCheckedChange={toggleDarkMode}
                         />
            </div>
        </div>
    )
}