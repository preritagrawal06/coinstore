import axios from "axios";
import { useState, useEffect } from "react";

const PaymentStatus = () => {
    const [loading, setLoading] = useState(false)
    const queryString = new URLSearchParams(window.location.search)
    const orderId = queryString.get('orderId')
    const [status, setStatus] = useState()
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        async function getStatus() {
            try {
                setLoading(true)
                const { data } = await axios.get(`https://coinstore-backend.onrender.com/api/payment/payment-status?orderId=${orderId}`)
                console.log(data);
                setStatus(data);
                if (data.success && data.data.status === "success") {
                    setSuccess(true)
                    if(data.data.paymentNote === 'wallet'){
                        try {
                            const {data: txnData} = await axios.post('https://coinstore-backend.onrender.com/api/buyer/wallet/add',{
                                paymentData: data.data
                            },{
                                headers:{
                                    authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            })
                            console.log(txnData);
    
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    else{
                        const orderDetails = orderId?.split("-")
                        const userId = orderDetails![0]
                        const game = orderDetails![1]
                        const denom = orderDetails![2]
                        // const transactionTime = orderDetails![3]
                        const serverId = orderDetails!.length === 5 ? orderDetails![4] : undefined
    
                        try {
                            const {data: txnData} = await axios.post('https://coinstore-backend.onrender.com/api/topup/create-topup-order',{
                                userid: userId,
                                game,
                                serverid: serverId,
                                denom: denom,
                                paymentData: data.data
                            })
                            console.log(txnData);
    
                        } catch (error) {
                            console.log(error);
                        }
                    }

                    }
            } catch (error) {
                console.log(error);
                setSuccess(false)
            } finally {
                setLoading(false)
            }
        }

        getStatus()
    }, [])

    const formatDate = (dt: string)=>{
        const date = new Date(dt)
        return date.toLocaleString('en-US')
    }

    return (
        <>
            <div className=" px-10 md:px-20 pt-40 flex flex-col gap-8 min-h-screen justify-center items-center">
                <div className="flex flex-col items-center justify-center border-2 border-black dark:border-white text-center w-full md:w-[80%] lg:w-[50%] p-4" >
                    <p className="text-black dark:text-white text-xl">Payment Status</p>
                    {
                        loading ?
                            <div>Getting status</div>
                            :
                            status ?
                                <div className="flex flex-col w-full">
                                    <div className="flex w-full justify-between">
                                        <p>Status</p>
                                        <p>{status['data']['status']}</p>
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <p>OrderID</p>
                                        <p>{status['data']['orderId']}</p>
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <p>Username</p>
                                        <p>{status['data']['customerName']}</p>
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <p>character ID</p>
                                        <p>{(status['data']['orderId'] as string).split("-")[0]}</p>
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <p>Amount</p>
                                        <p>{status['data']['amount']}</p>
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <p>Issued</p>
                                        <p>{formatDate(status['data']['createdAt'])}</p>
                                    </div>
                                </div>
                                :
                                <p>OrderID not found</p>
                    }
                    {
                        success ?
                            <div>
                                {
                                    status && status["data"]["status"] === "success" ?
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
                            </div> :
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