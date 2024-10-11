
export default function Footer(){
    return(
        <div className="flex justify-between gap-10 items-start flex-col lg:flex-row text-black dark:text-white p-8">
            <div className="flex flex-col gap-4 w-[100%] md:w-[50%] ">
            <div className="h-[70px] w-[100px] bg-cover bg-[#0F1822] dark:bg-inherit rounded-md">
                <img alt="Logo" src="/logo.png"/>
            </div>
            <p className="font-PostR text-[16px] sm:text-[18px] md:text-[20px] ">Learn more about our mission to provide gamers with the best game passes and exclusive offers. Our platform is dedicated to delivering unbeatable deals and the latest passes for your favorite games.</p>
            </div>
            <div className="flex flex-row gap-16 h-[100%] w-[100%] md:w-[30%]">
                <div>
                    <p className="font-PostSB text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px]">Customer Support</p>
                    <p className="text-[14px] sm:text-[16px] md:text-[20px]">Contact Us</p>
                    <p className="text-[14px] sm:text-[16px] md:text-[20px]">FAQ</p>
                    <p className="text-[14px] sm:text-[16px] md:text-[20px]">Privacy Policy</p>
                </div>
                <div>
                    <p className="font-PostSB text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px]">Quick Links</p>
                    <p className="text-[14px] sm:text-[16px] md:text-[20px]">Home</p>
                    <p className="text-[14px] sm:text-[16px] md:text-[20px]">Popular Games</p>
                    <p className="text-[14px] sm:text-[16px] md:text-[20px]">Accesories</p>
                </div>
            </div>
        </div>
    )
}