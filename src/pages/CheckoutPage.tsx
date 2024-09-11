import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutPage() {
    return (
        <div className=" px-10 md:px-20 pt-40 flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row items-start gap-3">
                <div className="flex flex-col sm:flex-row gap-10 w-[100%] lg:w-[60%]">
                    <div className="h-[200px] w-[250px]">
                        <img alt="game_pic" src="gamepass.jpg" />
                    </div>
                    <div>
                        <p className="subhead">Mobile Legends</p>
                        <p className="subtext1">Tencent Gaming</p>
                        <p className="subtext1">Get Mobile Legends Diamonds or the other passes instantly and at a very affordable price through UniPin now!</p>
                    </div>
                </div>
                <div className="bg-[#091115] flex flex-col gap-3 items-center p-4 w-[80%] lg:w-[40%] h-[200px] rounded-xl">
                <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="userID">UserID</Label>
                        <Input type="text" id="userid" className="w-[100%]" placeholder="UserID" />
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start gap-4">
                <div className="w-[100%] lg:w-[60%]">
                    <p className="subhead">Selected Items</p>
                    <div className="grid grid-cols-3 gap-3">
                    <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                    <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                    <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                    <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                    <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                    <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                    </div>
                </div>
                <div className="bg-[#091115] flex flex-col gap-3 items-center w-[100%] lg:w-[40%] h-fit rounded-xl p-4">
                    <div className="flex justify-between items-center flex-row w-[100%]">
                    <p className="font-PostJb text-[20px] text-[#C1C1C1]">Item Selected</p>
                    <p className="font-PostJb text-[24px] text-white">100 Diamond</p>
                    </div>
                    <div className="flex justify-between items-center flex-row w-[100%]">
                    <p className="font-PostJb text-[20px] text-[#C1C1C1]">Price</p>
                    <p className="font-PostJb text-[24px] text-white">Rs. 3000</p>
                    </div>
                    <Button className="w-[100%]">Purchase Now</Button>
                </div>
            </div>
        </div>
    )
}