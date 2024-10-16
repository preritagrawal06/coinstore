import axios from "axios";
import { useState, useEffect } from "react";

const PaymentStatus = () => {
    const [loading, setLoading] = useState(false)
    const queryString = new URLSearchParams(window.location.search)
    const orderId = queryString.get('orderId')
    const [status, setStatus] = useState()
    const [success,setSuccess] = useState(false)
    useEffect(()=>{
        async function getStatus(){
            try {
                setLoading(true)
                const {data} = await axios.get(`https://coinstore-backend.onrender.com/api/payment/payment-status?orderId=${orderId}`)
                console.log(data);
                setStatus(data);
                if(data.success && data.data.status === "success"){
                    setSuccess(true)
                    const orderDetails = orderId?.split("_")
                    const userId = orderDetails![0]
                    const game = orderDetails![1]
                    const denom  = orderDetails![2]
                    const transactionTime = orderDetails![3]
                    const serverId = orderDetails!.length === 5 ? orderDetails![4] : undefined

                    try {
                        const {data: txnData} = await axios.post('https://coinstore-backend.onrender.com/api/topup/create-topup-order',{
                            userid: userId,
                            game,
                            serverid: serverId,
                            denom: denom,
                            transactionTime
                        })
                        console.log(txnData);
                        
                    } catch (error) {
                        console.log(error);
                    }
                }
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
                    status && loading ? "Getting status": `Status: ${status ? status["data"]["status"] : "OrderID not found"}`
                }
                </p>
                {
                    success? 
                    <div>
                        {
                            status && status["data"]["status"] === "success"?
                            <>
                                <p className="text-[20px] font-PostSB">Your Transaction will be completed soon</p>
                                <p className="">Don't leave this page</p>
                            </>
                            :
                            <>
                                <p className="text-[20px] font-PostSB">Your Transaction is failed.</p>
                                <p className="">Please contact if any issues</p>
                            </>

                        }
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