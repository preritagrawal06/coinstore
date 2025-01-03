import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import validatePhoneNumber from '../utils/validatePhone'

export default function SignIn() {

  const [credential, setCredential] = useState('')
  // const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const navigate = useNavigate()
  const { toast } = useToast()
  const queryString = new URLSearchParams(window.location.search)
  const redirectURL = queryString.get('redirect')

  async function validateUser(e: any) {
    e.preventDefault()
    if (!credential) {
      toast({
        description: "Input field cannot be empty",
      })
      return
    }

    if(!validatePhoneNumber(credential)){
      toast({
        description: "Please enter 10 digit phone number"
      })
    }

    try {
      const {data: otpVerification} = await axios.post('https://coinstore-backend.onrender.com/api/user/verifyOtp',{
        credential,
        otp: value
      })
      // console.log(otpVerification);
      
      if(otpVerification.success){
        toast({
          description: otpVerification.message
        })
        setOpen(false)
        // console.log(credential);
        const { data } = await axios.post('https://coinstore-backend.onrender.com/api/user/login', {
          phone: credential,
          // password,
          role: "BUYER",
        })
        if (data.success) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          toast({
            description: "Logged In successfully",
          })
          redirectURL ? navigate(`/checkout/${redirectURL}`) : navigate('/')
        } else {
          toast({
            description: data.message,
          })
          // console.log(data);
        }
      }else{
        toast({
          description: otpVerification.message
        })
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

  async function otpModal(e:any) {
    e.preventDefault()
    if (!credential) {
      toast({
        description: "Input field cannot be empty",
      })
      return
    }

    if(!validatePhoneNumber(credential)){
      toast({
        description: "Please enter 10 digit valid phone number"
      })
      return
    }
    try {
      const {data} = await axios.post('https://coinstore-backend.onrender.com/api/user/sendOtp',{
        credential
      })
      // console.log(data);
      toast({
        description: data.msg || data.message
      })
      setOpen(true)
    } catch (error) {
      toast({
        description: (error as Error).message
      })
      setOpen(false)
    }
  }

  useEffect(()=>{
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if(user || token){
      navigate('/')
    }
  },[])

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (isButtonDisabled && open) {
      // console.log("hi");
      
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(countdown);
            setIsButtonDisabled(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(countdown); // Cleanup interval on unmount
    }
  }, [isButtonDisabled, open]);

  const handleResendOTP = async () => {
    // Logic to resend the OTP
    // console.log("Resending OTP...");
    try {
      const {data} = await axios.post('https://coinstore-backend.onrender.com/api/user/resendOtp',{
        credential
      })
      // console.log(data);
      toast({
        description: data.msg
      })
      setIsButtonDisabled(true);
      setTimer(60); // Reset the timer
    } catch (error) {
      toast({
        description: (error as Error).message
      })
    }
  };

  return (
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
              Unlock endless adventures, explore realms unknown, and conquer challenges with every login.
            </p>

            <form className="mt-8 grid grid-cols-6 gap-6">


              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Phone </label>

                <Input type="text" id="userid" className="w-[100%] text-black" onChange={(e) => setCredential(e.target.value)} />
              </div>

              {/* <div className="col-span-6">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                <Input type="password" id="pass" className="w-[100%] text-black" onChange={(e) => setPassword(e.target.value)} />
              </div> */}


              <div className="col-span-6">
                <Button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-lg font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 w-full"
                  onClick={otpModal}
                >
                  Login with OTP
                </Button>
                <Dialog open={open} onOpenChange={()=>setOpen(false)} >
                  <DialogContent style={{height:'fit-content'}}>
                    <DialogHeader>
                    <DialogTitle className="font-PostSB text-[20px]">
                    Mobile Phone Verification
                    </DialogTitle>
                    <DialogDescription className="font-PostSB text-[16px]">
                      Enter the 6-digit verification code that was sent to your phone number.
                      The code is valid for 1 hour
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
                    <Button  className="m-0 font-bold bg-cyan-600 hover:bg-cyan-800 text-white" onClick={validateUser}>Submit</Button>
                    <Button onClick={handleResendOTP} disabled={isButtonDisabled} variant={'ghost'}>{isButtonDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}</Button>
                  </DialogFooter>
                  </DialogContent>
                </Dialog>
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  New User?
                  <a href="/signup" className="text-gray-700 underline">Sign Up</a>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}