import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"


interface CardVariable{
    name:string,
    org:string,
    img:string
}

export default function PassCard({name,org,img}:CardVariable){
    const navigate = useNavigate()
    return(
        <div className="bg-[#091115] rounded-[15px] w-fit">
            <div className="w-[300px] sm:w-[300px] md:w-[350px] h-auto">
            <img src={img} alt="game_icon" style={{borderRadius:'15px 15px 0px 0px'}}/>
            </div>
            <div className="flex justify-between items-end p-3">
                <div>
                <p className="subhead">{name}</p>
                <p className="subtext1">{org}</p>
                </div>
                <Button variant={'primary'} size={'xs'} onClick={()=>navigate('/checkout')}>Top Up</Button>
            </div>
        </div>
    )
}