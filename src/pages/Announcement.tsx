import axios from "axios"
import { useEffect, useState } from "react"

export default function Announcement(){

    const [data,setData] = useState([])
    async function getInfo(){
       await axios.get('https://coinstore-backend.onrender.com/api/buyer/get-announcement').then((res)=> setData(res.data.data))
    }

    useEffect(()=>{
        getInfo()
    },[])
    return(
        <div className="px-2 md:px-5 pt-20 min-h-screen">
            {
                data.length>0 ? 
                <div className="flex flex-col gap-4">
                    {
                        data.map((x:any,index)=>{
                            const time = new Date(x.createdAt)
                            const day = time.getDate()
                            const month = time.getMonth()
                            const year = time.getFullYear()
                            return(
                                <div className="flex flex-col gap-2 border dark:border-cyan-100 border-black p-2 shadow-sm dark:shadow-slate-400 hover:shadow-md hover:shadow-black transition duration-300" key={index}>
                            <div className="flex flex-row justify-between items-center">
                            <p className="text-[20px] md:text-[24px] font-bold">{x.title}</p>
                            <p>{`${day}-${month+1}-${year}`}</p>
                            </div>
                            <p className="text-[16px] md:text-[20px]">{x.description}</p>
                        </div>
                            )
                        })
                    }
                </div>
                :
                <div>
                    No Announcement is Available
                </div>
            }
        </div>
    )
}