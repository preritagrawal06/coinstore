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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "./ui/dialog";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  const theme = window.localStorage.getItem("data-theme");
  const token = window.localStorage.getItem("token");
  const user = JSON.parse(window.localStorage.getItem("user")!);
  const [darkMode, setDarkMode] = useState(theme == "light" ? false : true);
  const [amount, setAmount] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [data, setData] = useState([])
  useScrollBehavior(drawerOpen);

  const { toast } = useToast()

  async function getData() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get('https://coinstore-backend.onrender.com/api/buyer/transactions/all', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setData(res.data.transaction)
    } catch (err: any) {
      toast({
        description: err.message
      })
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function logout() {
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

  const handleAddMoney = async () => {
    if (amount.length <= 0) return
    try {
      const { data } = await axios.post('https://coinstore-backend.onrender.com/api/payment/add-wallet', {
        amount
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      if (data.success) {
        window.location.href = data.data.paymentUrl
      }
    } catch (error) {
      console.log(error);

    }
  }

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
          <div className="flex flex-row gap-2 h-full">
            <Dialog>
              <DialogTrigger><Button className="m-0">{(user!.wallet as Number).toFixed(2)}</Button></DialogTrigger>
              <DialogContent>
                <DialogDescription>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-4">
                      <Label htmlFor="amount">
                        Amount
                      </Label>
                      <Input id="amount" className="col-span-3" onChange={(e) => { setAmount(e.target.value) }} />
                    </div>
                    <Button onClick={handleAddMoney}>Proceed</Button>
                    <Table className="w-full h-full overflow-x-scroll border border-gray-200 rounded-lg shadow ">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12" />
                          <TableHead className="w-[100px]">Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone Number</TableHead>
                          <TableHead>Game Name</TableHead>
                          <TableHead>Item Name</TableHead>
                          <TableHead>Transaction Date</TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>User ID</TableHead>
                          <TableHead>Payment Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data?.map((invoice: any, index: any) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{invoice['customerName']}</TableCell>
                            <TableCell>{invoice['customerEmail']}</TableCell>
                            <TableCell>{invoice['customerPhone']}</TableCell>
                            <TableCell>{invoice['game']}</TableCell>
                            <TableCell>{invoice['itemName']}</TableCell>
                            <TableCell>{new Date(invoice['transactionDate']).toLocaleDateString()}</TableCell>
                            <TableCell>{invoice['orderid']}</TableCell>
                            <TableCell>{invoice['userid']}</TableCell>
                            <TableCell>{invoice['paymentStatus']}</TableCell>
                            <TableCell className="text-right">{invoice['amount']}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
                      <DialogTrigger><Button className="m-0 w-20">{(user!.wallet as Number).toFixed(2)}</Button></DialogTrigger>
                      <DialogContent>
                        <DialogDescription>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-4">
                              <Label htmlFor="amount">
                                Amount
                              </Label>
                              <Input id="amount" className="col-span-3" onChange={(e) => { setAmount(e.target.value) }} />
                            </div>
                            <Button onClick={handleAddMoney}>Proceed</Button>
                            <Table className="w-full h-full overflow-x-scroll border border-gray-200 rounded-lg shadow ">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12" />
                          <TableHead className="w-[100px]">Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone Number</TableHead>
                          <TableHead>Game Name</TableHead>
                          <TableHead>Item Name</TableHead>
                          <TableHead>Transaction Date</TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>User ID</TableHead>
                          <TableHead>Payment Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data?.map((invoice: any, index: any) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{invoice['customerName']}</TableCell>
                            <TableCell>{invoice['customerEmail']}</TableCell>
                            <TableCell>{invoice['customerPhone']}</TableCell>
                            <TableCell>{invoice['game']}</TableCell>
                            <TableCell>{invoice['itemName']}</TableCell>
                            <TableCell>{new Date(invoice['transactionDate']).toLocaleDateString()}</TableCell>
                            <TableCell>{invoice['orderid']}</TableCell>
                            <TableCell>{invoice['userid']}</TableCell>
                            <TableCell>{invoice['paymentStatus']}</TableCell>
                            <TableCell className="text-right">{invoice['amount']}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
