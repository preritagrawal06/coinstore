import Button from "../components/Button";

export default function LandingPage() {
    return (
        <div className="h-screen font-JR bg-hero-pattern bg-blend-multiply bg-center bg-cover flex justify-center items-center flex-col px-6 static">
            <div className="absolute left-60 top-30 z-0 w-[450px] md:w-[600px] lg:w-[900px] xl:w-[1050px]">
                <svg xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}} viewBox="0 0 1010 554" fill="none" >
                    <path d="M1008 47V507C1008 531.853 987.853 552 963 552H850.033C844.319 552 838.658 550.912 833.352 548.794L738.63 510.991C732.853 508.685 726.688 507.5 720.467 507.5H530H336.84C331.769 507.5 326.729 508.287 321.9 509.833L196.881 549.857C192.446 551.277 187.817 552 183.16 552H47C22.1472 552 2 531.853 2 507V47C2 22.1472 22.1472 2 47 2H179.262C186.336 2 193.309 3.6674 199.618 6.86693L318.573 67.2004C325.442 70.6844 333.036 72.5 340.738 72.5H536.562H715.888C725.158 72.5 734.239 69.8701 742.074 64.9157L830.563 8.96517C837.759 4.41522 846.099 2 854.612 2H963C987.853 2 1008 22.1472 1008 47Z" stroke="#009492" stroke-width="4" />
                </svg>
            </div>
           <div className="flex z-10 items-center ">
           <div className='w-[600px] h-[566px]'>
                <img src="/hero1.png" alt="heroIcon2"/>
                </div>
           <div className="flex flex-col items-center">
            <div className="text-center">
                <p className="subtext">#No.1 website  for Game Pass</p>
                <p className="head1">Play More, Pay Less:</p>
                <p className="head1">Your Ultimate <span className="text-[#24FFF2]">Game Pass</span> Destination!</p>
            </div>
            <div className="z-10">
               <Button name='Explore More'/>
               <Button name='Browse Games'/>
            </div>
            </div>
                <div className='w-[600px] h-[566px]'>
                <img src="/hero2.png" alt="heroIcon2"/>
                </div>
           </div>
        </div>
    )
}