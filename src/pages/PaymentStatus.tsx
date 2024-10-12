import axios from "axios";
import { useState, useEffect } from "react";

const PaymentStatus = () => {
    const [loading, setLoading] = useState(false)
    const queryString = new URLSearchParams(window.location.search)
    const orderId = queryString.get('orderId')
    const [data, setData] = useState()
    const [success,setSuccess] = useState(false)
    useEffect(()=>{

        async function getStatus(){
            try {
                setLoading(true)
                const {data} = await axios.get(`https://coinstore-backend.onrender.com/api/payment/payment-status?orderId=${orderId}`)
                setData(data);
                setSuccess(true)   
            } catch (error) {
                console.log(error);
                setSuccess(false)
            } finally{
                setLoading(false)
            }
        }

        getStatus()
    },[])
    return (
    <>
        <div className=" px-10 md:px-20 pt-40 flex flex-col gap-8 min-h-screen justify-center items-center">
            <div className="flex flex-col items-center justify-center border-2 border-black dark:border-white text-center w-full md:w-[80%] lg:w-[50%]" >
                <p className="text-black dark:text-white text-xl">Payment Status</p>
                <p className="text-black dark:text-white ">{
                    data && loading ? "Getting status": `Status: ${data ? data["data"]["status"] : "updating"}`
                }
                </p>
                {
                    success? 
                    <div>
                        <p className="text-[20px] font-PostSB">Your Transaction will be completed soon</p>
                        <p className="">Don't leave this page</p>
                    </div>: 
                    <div>
                         <p className="text-[20px] font-PostSB">Order ID Not found</p>
                    </div>
                }
            </div>
        </div>
    </> 
    );
}
 
export default PaymentStatus;