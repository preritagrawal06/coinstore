import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";


export default function SignUp(){

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [pwd,setPwd] = useState('')
    const [cnfPwd,setCnfPwd] = useState('')
    const [number,setNumber] = useState('')
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const navigate = useNavigate()
    const {toast} = useToast()

    async function authUser(e:any) {
        e.preventDefault()
        if(!name || !email || !pwd || !cnfPwd || !number ){
          toast({
            description: "Input field cannot be empty",
          })
          return 
        }
        if(number.length !== 10 ){
          toast({
            description: "Enter valid phone number",
          })
          return 
        }
        if(pwd !== cnfPwd){
          toast({
            description: "Password and Confirm Password not matching",
          })
          return
        }
        try {
          const {data} = await axios.post('https://coinstore-backend.onrender.com/api/user/signup', {
            username:name,
            email,
            password: pwd,
            phone:number,
            role: "BUYER",
          })
          if(data.success){
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            toast({
              description: "User created successfully",
            })
            navigate('/')
          } else{
            toast({
              description: data.message,
            })
            console.log(data);
          }
        } catch (error) {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          console.log(error);
          toast({
            description: "Internal Server Error",
          })
        }

    }
    function otpModal(e:any) {
      setOpen(true)
      e.preventDefault()
    }

    return(
<section className="bg-white font-PostJb">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1529154691717-3306083d869e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Shadow Company
            </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
        Embark on your ultimate gaming journey! Sign up now to unlock exclusive content, connect with players worldwide, and dive into endless adventures.
        </p>

        <form className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
              Name
            </label>

            <Input type="text" id="userid" className="w-[100%] text-black" onChange={(e)=>setName(e.target.value)}/>
          </div>

              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

            <Input type="text" id="userid" className="w-[100%] text-black" onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <div className="col-span-6">
            <label htmlFor="Phone Number" className="block text-sm font-medium text-gray-700"> Phone Number </label>

            <Input type="number" id="userid" className="w-[100%] text-black" onChange={(e)=>setNumber(e.target.value)} />
          </div>

          <div className="col-span-6">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <Input type="password" id="userid" className="w-[100%] text-black" onChange={(e)=>setPwd(e.target.value)} />
          </div>

          <div className="col-span-6 ">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <Input type="password" id="userid" className="w-[100%] text-black" onChange={(e)=>setCnfPwd(e.target.value)} />
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <Button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-lg font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              onClick={otpModal}
            >
              Create an account
            </Button>
            <Dialog open={open} onOpenChange={()=>setOpen(false)} >
                  <DialogContent style={{height:'fit-content'}}>
                    <DialogHeader>
                    <DialogTitle className="font-PostSB text-[20px]">
                    Mobile Phone Verification
                    </DialogTitle>
                    <DialogDescription className="font-PostSB text-[16px]">
                    Enter the 6-digit verification code that was sent to your phone number.
                    </DialogDescription>
                    </DialogHeader>
                  <InputOTP maxLength={6} onChange={(e)=>setValue(e)} pattern={REGEXP_ONLY_DIGITS}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <DialogFooter>
                    <Button  className="m-0 font-bold bg-cyan-600 hover:bg-cyan-800 text-white" >Submit</Button>
                  </DialogFooter>
                  </DialogContent>
                </Dialog>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <a href="/login" className="text-gray-700 underline">Log in</a>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>
    )
}