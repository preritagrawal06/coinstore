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
       </div>
    )
}