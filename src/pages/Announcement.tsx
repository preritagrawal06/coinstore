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
                        data.map((x:any)=>
                        <div className="flex flex-col gap-2 border dark:border-cyan-100 border-black p-2 rounded-md shadow-sm dark:shadow-slate-400 hover:shadow-md hover:shadow-black transition duration-300">
                            <p className="text-[20px]">{x.title}</p>
                            <p>{x.description}</p>
                        </div>)
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