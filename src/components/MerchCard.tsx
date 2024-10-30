import { Button } from "./ui/button"

interface CardVariable{
    name:string,
    price:number,
    img:string
}

export default function MerchCard({name,price,img}:CardVariable){
    return(
        <div className="text-black dark:text-white border bg-white dark:bg-[#091115] w-fit">
            <div className="w-[300px] sm:w-[300px] md:w-[350px] h-auto">
            <img src={img} alt="game_icon" style={{borderRadius:'15px 15px 0px 0px'}}/>
            </div>
            <div className="flex justify-between items-end p-3">
                <div className="flex flex-col items-start">
                <p className="subhead">{name}</p>
                <p className="subtext1">Rs. {price}</p>
                </div>
                <Button variant={'ghost'} size={'xs'}>Buy now</Button>
            </div>
        </div>
    )
}