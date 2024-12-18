import AccountSection from "@/components/AccountSection";
import GamePassSection from "../components/GamePassSection";
import HeroSection from "../components/HeroSection";
import AccessoriesSection from "@/components/AccessoriesSection";

export default function LandingPage() {
    return (
       <div>
        <HeroSection/>
        <GamePassSection/>
        <AccountSection/>
        <AccessoriesSection/>
        <div className="fixed bottom-5 left-5 md:bottom-10 md:left-10 z-10">
            <a href="https://api.whatsapp.com/send?phone=917217320257" target="_blank"><img src="/wp.svg" alt="" width="12px" height="12px"/></a>
        </div>
       </div>
    )
}