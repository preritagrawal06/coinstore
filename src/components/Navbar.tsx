import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";


export default function Navbar(){
    return(
        <div className="flex flex-row items-center justify-between bg-none w-[100%] absolute top-1 px-6 ">
            <div className="h-[70px] w-[100px] bg-cover">
                <img alt="Logo" src="logo.png"/>
            </div>
            <div>
                <Button className="m-0"><PersonIcon className="mr-2 h-4 w-4"/>Login</Button>
            </div>
        </div>
    )
}