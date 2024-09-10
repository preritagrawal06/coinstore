import AccountSection from "@/components/AccountSection";
import GamePassSection from "../components/GamePassSection";
import HeroSection from "../components/HeroSection";
import AccessoriesSection from "@/components/AccessoriesSection";

export default function LandingPage() {
    return (
       <div className="bg-[#0F1C23] font-PostR ">
        <HeroSection/>
        <GamePassSection/>
        <AccountSection/>
        <AccessoriesSection/>
       </div>
    )
}