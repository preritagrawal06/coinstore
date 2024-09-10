import AccountSection from "@/components/AccountSection";
import GamePassSection from "../components/GamePassSection";
import HeroSection from "../components/HeroSection";
import AccessoriesSection from "@/components/AccessoriesSection";
import Footer from "@/components/Footer";

export default function LandingPage() {
    return (
       <div className="bg-[#0F1C23] font-PostR ">
        <HeroSection/>
        <GamePassSection/>
        <AccountSection/>
        <AccessoriesSection/>
        <Footer/>
       </div>
    )
}