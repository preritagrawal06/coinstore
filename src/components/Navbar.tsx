import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  useScrollBehavior,
} from "@/components/ui/drawer";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "./ui/dialog";

export default function Navbar() {
  const theme = window.localStorage.getItem("data-theme");
  const token = window.localStorage.getItem("token");
  const [darkMode, setDarkMode] = useState(theme == "light" ? false : true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useScrollBehavior(drawerOpen);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function logout(){
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
  }

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html")?.classList.add("dark");
      window.localStorage.setItem("data-theme", "dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
      window.localStorage.setItem("data-theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-row items-center justify-between bg-none w-[100%] absolute top-1 px-6 z-10 ">
      <div className="h-[70px] w-[100px] bg-cover bg-[#0F1822] dark:bg-inherit rounded-md">
        <a href="/">
          <img alt="Logo" src="/logo.png" />
        </a>
      </div>
      <div className="items-center gap-4 hidden sm:flex ">
        <a
          href={"/#topup"}
          className="font-PostSB text-[16px] md:text-[20px] text-[#54a5a0] dark:text-[#abf5f0] "
        >
          Topup
        </a>
        <a
          href={"/#account"}
          className="font-PostSB text-[16px] md:text-[20px] text-[#54a5a0] dark:text-[#abf5f0] "
        >
          Account
        </a>
        <a
          href={"/#merchandise"}
          className="font-PostSB text-[16px] md:text-[20px] text-[#54a5a0] dark:text-[#abf5f0] "
        >
          Merchandise
        </a>
        {token ? (
         <div className="flex flex-row gap-2">
           <Dialog>
            <DialogTrigger><Button className="m-0">0:00</Button></DialogTrigger>
            <DialogContent>
                <DialogDescription>
                <div className="grid gap-4 py-4">
          <div className="grid gap-4">
            <Label htmlFor="amount">
              Amount
            </Label>
            <Input id="amount" className="col-span-3" />
          </div>
          <Button>Proceed</Button>
          </div>
                </DialogDescription>
            </DialogContent>
          </Dialog>
          <Button className="m-0 font-bold" variant={"primary"} onClick={logout}>
            <a href="/">Logout</a>
          </Button>
         </div>
        ) : (
          <Button className="m-0 font-bold" variant={"primary"}>
            <a href="/login">Login</a>
          </Button>
        )}
        <Switch
          className="data-[state=checked]:bg-[#ffbf00] data-[state=unchecked]:bg-[#123456]"
          checkedIcon={<Moon />}
          uncheckedIcon={<Sun />}
          lightTheme={darkMode}
          onCheckedChange={toggleDarkMode}
        />
      </div>
      <div className="block sm:hidden">
        <Drawer
          direction="right"
          open={drawerOpen}
          onOpenChange={() => setDrawerOpen(false)}
        >
          <Button
            onClick={() => setDrawerOpen(true)}
            className="bg-inherit hover:bg-inherit "
          >
            <HamburgerMenuIcon color="white" fontSize={"50px"} />
          </Button>
          <DrawerContent className="justify-start">
            <DrawerHeader>
              <DrawerTitle>
                <Switch
                  className="data-[state=checked]:bg-[#ffbf00] data-[state=unchecked]:bg-[#123456]"
                  checkedIcon={<Moon />}
                  uncheckedIcon={<Sun />}
                  lightTheme={darkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </DrawerTitle>
              <DrawerDescription className="flex flex-col gap-4">
                {token ? (
                  <div className="flex flex-col gap-2 items-center">
                  <Dialog>
                   <DialogTrigger><Button className="m-0 w-20">0:00</Button></DialogTrigger>
                   <DialogContent>
                       <DialogDescription>
                       <div className="grid gap-4 py-4">
                 <div className="grid gap-4">
                   <Label htmlFor="amount">
                     Amount
                   </Label>
                   <Input id="amount" className="col-span-3" />
                 </div>
                 <Button>Proceed</Button>
                 </div>
                       </DialogDescription>
                   </DialogContent>
                 </Dialog>
                 <Button className="m-0 font-bold w-20" onClick={logout}>
                   <a href="/">Logout</a>
                 </Button>
                </div>
                ) : (
                  <Button className="m-0 font-bold">
                    <a href="/login">Login</a>
                  </Button>
                )}
                <a
                  onClick={() => setDrawerOpen(false)}
                  href={"/#topup"}
                  className="font-PostSB text-[16px] md:text-[20px] text-white dark:text-[#abf5f0] "
                >
                  Topup
                </a>
                <a
                  onClick={() => setDrawerOpen(false)}
                  href={"/#account"}
                  className="font-PostSB text-[16px] md:text-[20px] text-white dark:text-[#abf5f0] "
                >
                  Account
                </a>
                <a
                  onClick={() => setDrawerOpen(false)}
                  href={"/#merchandise"}
                  className="font-PostSB text-[16px] md:text-[20px] text-white dark:text-[#abf5f0] "
                >
                  Merchandise
                </a>
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
