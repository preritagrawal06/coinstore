import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout(){
    return(
        <div className="bg-[#0F1C23] font-PostR">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}