import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Facebook, Mail, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";


export default function ContactUs(){
    return(
        <section className="pt-20">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Get in Touch</h2>

        <p className="mt-4 text-gray font-PostSB">
        Thank you for visiting Shadow Games! Whether you’re here to ask about game passes, report a bug, or share feedback, we’d love to hear from you. Our team is dedicated to providing you with the best gaming experience and customer support.
        </p>

       <div className="mt-3 flex flex-col gap-3">
        <p className="font-PostSB text-[20px] flex flex-row gap-1"><Mail/> Email: shadowcompany@gmail.com</p>
        <p className="font-PostSB text-[20px] flex flex-row gap-1"><PhoneCall/> WhatsApp & Call: +91 72173 20257</p>
        <p className="text-[24px]">Social Links</p>
        <div className="flex flex-row gap-4">
            <Link to={'https://www.instagram.com/_.shadow.company._/profilecard/?igsh=MWcwa2psZGllajBpYQ=='} target="_blank">
                <InstagramLogoIcon height={20} width={20}/>
            </Link>
            <Link to={'https://www.facebook.com/share/VjM94P5FPoHAa3Lc/?mibextid=LQQJ4d'} target="_blank">
                <Facebook height={20} width={20}/>
            </Link>
        </div>
       </div>
      </div>
    </div>
  </div>
</section>
    )
}