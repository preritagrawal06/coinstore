import axios from "axios";
import { useState, useEffect } from "react";

const PaymentStatus = () => {
    const [loading, setLoading] = useState(false)
    const queryString = new URLSearchParams(window.location.search)
    const orderId = queryString.get('orderId')
    const [data, setData] = useState()
    useEffect(()=>{

        async function getStatus(){
            try {
                setLoading(true)
                const {data} = await axios.get(`https://coinstore-backend.onrender.com/api/payment/payment-status?orderId=${orderId}`)
                setData(data);
                console.log(data?.data);
                
            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false)
            }
        }

        getStatus()
    },[])
    return (
    <>
        <div className=" px-10 md:px-20 pt-40 flex flex-col gap-8 min-h-screen">
            <div className="border flex flex-col items-center justify-center">
                <p className="text-white text-xl">Payment Status</p>
                <p className="text-white">{
                    loading ? "Getting status": `Status: ${data ? data["data"]["status"] : "updating"}`
                }
                </p>
            </div>
        </div>
    </> 
    );
}
 
export default PaymentStatus;