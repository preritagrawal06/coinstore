import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import {  useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
    const data = [{
        ind: 1,
        name: 'Mobile Legends',
        org: 'Moonton',
        img_url: '/mlbb.png',
        sign: 'mlbb_global'
    },
    {
        ind: 2,
        name: 'PUBG Global',
        org: 'Krafton',
        img_url: '/pubg.jpg',
        sign: 'pubgm'
    },
    {
        ind: 3,
        name: 'Genshin Impact',
        org: 'MiHoYo',
        img_url: '/genshin.jpg',
        sign: 'genshin'
    },
    {
        ind: 4,
        name: 'Clash of Clans',
        org: 'Supercell',
        img_url: '/coc.jpg',
        sign: 'clashofclans'
    }, {
        ind: 5,
        name: 'Honkai:Star Rail',
        org: 'MiHoYo',
        img_url: '/honkai.jpg',
        sign: 'honkai_star_rail'
    },
    {
        ind: 6,
        name: 'Clash Royale',
        org: 'Supercell',
        img_url: '/cor.jpg',
        sign: 'clashroyale'
    },
    {
        ind: 7,
        name: 'Farlight',
        org: 'Lilith Games',
        img_url: '/farlight.jpg',
        sign: 'farlight84'
    },
    {
        ind: 8,
        name: 'Supersus',
        org: 'Lilith Games',
        img_url: '/supersus.jpg',
        sign: "super_sus"
    }
    ]

    const info = useParams()
    const gameinfo = data.find((x) => x.sign == info.code)
    const token = localStorage.getItem('token')
    const userInfo = JSON.parse(localStorage.getItem('user')!)
    // const [userInfo, setUserInfo] = useState({
    //     username: "",
    //     email: "",
    //     phone: ""
    // })
    const [passInfo, setPassInfo] = useState([])
    const [loading, setLoading] = useState(true)
    const [passImage, setPassImage] = useState('/coc.jpg')
    const [passName, setPassName] = useState('Gold')
    const [userId, setUserId] = useState('')
    const [serverId, setServerId] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const [ingameName, setIngameName] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)
    const [recentTxn, setRecentTxn] = useState(null)
    const navigate = useNavigate()
    const {toast} = useToast()

    async function handleWalletPayment() {
        // console.log(userInfo);

        try {
            if (!isVerified || userInfo.username.length <= 0 || userInfo.email.length <= 0 || userInfo.phone.length <= 0 || userId.length <= 0 || !selectedItem) return
            console.log(selectedItem);
            
            const { data } = await axios.post('https://coinstore-backend.onrender.com/api/buyer/wallet/topup', {
                userid: userId,
                amount: selectedItem!['amount'],
                serverid: serverId,
                name: userInfo.username,
                email: userInfo.email,
                phone: userInfo.phone,
                denom: selectedItem!['topupCode'],
                game: selectedItem!['gameCode'],
                provider: selectedItem!['provider'],
                topupId: selectedItem!['_id']
            },{
                headers:{
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(data);
            // if (data.success) {
            //     window.location.href = data.data.paymentUrl
            // }
            if(data.success && data.user){
                localStorage.setItem('user', JSON.stringify(data.user))
            }
            toast({
                description: data.message
            })
        } catch (error) {
            console.log(error);
            toast({
                description: (error as Error).message
            })
        }
    }
    
    async function handleUPIPayment() {
        // console.log(userInfo);
        if(!userInfo || !token){
            navigate(`/login?redirect=${info.code}`)
        }
        try {
            if (!isVerified || userInfo.username.length <= 0 || userInfo.email.length <= 0 || userInfo.phone.length <= 0 || userId.length <= 0 || !selectedItem) return
            console.log(selectedItem);
            
            const { data } = await axios.post('https://coinstore-backend.onrender.com/api/payment/initiate-payment', {
                gameId: userId,
                amount: selectedItem!['amount'],
                serverId: serverId,
                name: userInfo.username,
                email: userInfo.email,
                phone: userInfo.phone,
                itemName: selectedItem!['topupCode'],
                game: selectedItem!['gameCode'],
                agent: selectedItem!['provider'],
                topupId: selectedItem!['_id']
            })
            // console.log(data);
            if (data.success) {
                window.location.href = data.data.paymentUrl
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleVerification() {
        try {
            if (userId.length <= 0) return
            const { data } = await axios.post('https://coinstore-backend.onrender.com/api/topup/check-id', {
                game: info.code,
                userID: userId,
                serverID: serverId
            })

            if (data.valid === 'valid') {
                setIsVerified(true)
                setIngameName(data.name)
            }

        } catch (error) {
            console.log(error);
        }
    }

    function setGamePassImage() {
        let name = gameinfo?.sign
        if (name == 'mlbb_global') {
            setPassImage("/mlbblarge.png")
            setPassName('Diamonds')
        }
        else if (name == 'pubgm') {
            setPassImage("/pubgtoken.png")
            setPassName('UC')
        }
        else if (name == 'genshin') {
            setPassImage("/genshintoken.png")
            setPassName('Crystals')
        }
        else if (name == 'clashofclans') {
            setPassImage("/coccoin.png")
            setPassName('Gold')
        }
    }

    async function getData() {
        try {
            const result = await axios.post('https://coinstore-backend.onrender.com/api/topup/get-topup-list', {
                gamecode: info.code,
                game: gameinfo?.name
            })
            // let val: any = Object.entries(result?.data)
            // console.log(result.data);
            setPassInfo(result.data)
            setLoading(false)
            if(userInfo && token){
                const res = await axios.get('https://coinstore-backend.onrender.com/api/buyer/transactions/all', {
                    headers: {
                    authorization: `Bearer ${token}`
                    }
                })
                const recentTxns = res.data.transaction.filter((txn:any)=>{return txn.game === info.code})
                if(recentTxns.length !== 0) setRecentTxn(recentTxns[recentTxns.length-1])
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
        setGamePassImage()
        // console.log(passInfo);

    }, [])

    return (
        <div className=" px-10 md:px-20 pt-40 flex flex-col gap-8">
            {userInfo && token && recentTxn &&
                <Popup game={info.code} setUserId={setUserId} setServerId={setServerId} txn={recentTxn} setIsVerified={setIsVerified} setIngameName={setIngameName}/>
            }
            <div className="flex flex-col lg:flex-row items-start gap-3">
                <div className="flex flex-col sm:flex-row gap-10 w-[100%] lg:w-[60%]">
                    <div className="h-[200px] w-[250px]">
                        <img alt="game_pic" src={gameinfo ? gameinfo.img_url : 'gamepass.jpg'} />
                    </div>
                    <div>
                        <p className="subhead">{gameinfo ? gameinfo.name : 'Game_Name'}</p>
                        <p className="subtext1">{gameinfo ? gameinfo.org : 'Company_Name'}</p>
                        <p className="subtext1">Get {gameinfo ? gameinfo.name : 'Game_Name'} Diamonds or the other passes instantly and at a very affordable price through Shadow Company now!</p>
                    </div>
                </div>
                <div className="bg-[#e3dbdb] dark:bg-[#091115] flex flex-col gap-3 items-center p-4 w-[80%] lg:w-[40%] rounded-xl">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="userID">UserID</Label>
                        <Input type="text" id="userid" className="w-[100%]" value={userId} placeholder="UserID" onChange={(e) => { setUserId(e.target.value) }} />
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                        <Label htmlFor="email" >ServerID (If any)</Label>
                        <Input type="email" id="email" placeholder="Server ID ( If any )" value={serverId} onChange={(e) => { setServerId(e.target.value) }} />
                    </div>
                    <Button onClick={handleVerification} disabled={isVerified}>{isVerified ? "Verified" : "Verify"}</Button>
                    {
                        isVerified &&
                        <span><p className="text-[#54a5a0] dark:text-[#abf5f0]">{ingameName}</p></span>
                    }
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start gap-4">
                <div className="w-[100%] lg:w-[60%]">
                    <p className="subhead">Selected Items</p>
                    {
                        !loading &&
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-[400px] overflow-y-scroll overflow-x-hidden">
                            {
                                passInfo?.map((x, index) => {
                                    return (
                                        <div key={index} className={`flex flex-col gap-2 bg-[#e3dbdb] dark:bg-[#091115] p-2 rounded-md cursor-pointer ${selectedItem === x ? "border border-black dark:border-white" : ""}`} onClick={() => setSelectedItem(x)}>
                                            <div className="h-[40px] w-[50px]">
                                                <img alt="game_pic" src={passImage} />
                                            </div>
                                            <p className="subtext1">{x['description']} {passName}</p>
                                            <p className="subhead">₹{x['amount']}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    }
                    {
                        loading && (
                            <div className="grid grid-cols-3 gap-3">
                                <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                                <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                                <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                                <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                                <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                                <Skeleton className="h-[100px] w-[150px] rounded-xl" />
                            </div>
                        )
                    }
                </div>
                <div className="bg-[#e3dbdb] dark:bg-[#091115] flex flex-col gap-3 items-center w-[100%] lg:w-[40%] h-fit rounded-xl p-4">
                    <div className="flex justify-between items-center flex-row w-[100%]">
                        <p className="font-PostJb text-[20px] text-[#1b1a1a] dark:text-[#C1C1C1]">Item Selected</p>
                        <p className="font-PostJb text-[24px] text-black dark:text-white">{selectedItem ? selectedItem['description'] : 0} {passName}</p>
                    </div>
                    <div className="flex justify-between items-center flex-row w-[100%]">
                        <p className="font-PostJb text-[20px] text-[#1b1a1a] dark:text-[#C1C1C1]">Price</p>
                        <p className="font-PostJb text-[24px] text-black dark:text-white">₹{selectedItem ? selectedItem!['provider'] === 'elitedias' ? selectedItem!['amount'] : selectedItem!['amount'] : 0}</p>
                    </div>
                    {/* <div className="grid w-full  items-center gap-1.5">
                        <Label htmlFor="name">Full Name</Label>
                        <Input type="text" id="full-name" placeholder="Your full name" onChange={(e) => { setUserInfo({ ...userInfo, username: e.target.value }) }} />
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Your email address" onChange={(e) => { setUserInfo({ ...userInfo, email: e.target.value }) }} />
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                        <Label htmlFor="email">Phone</Label>
                        <Input type="text" id="phone" placeholder="Your contact number" onChange={(e) => { setUserInfo({ ...userInfo, phone: e.target.value }) }} />
                    </div>
                    <p className="text-gray-500">NOTE: None of these informations are stored. The data is used for payment only</p> */}
                    {
                        token && 
                        <>
                            <Button className="w-[100%]" onClick={handleWalletPayment} disabled={!isVerified}>{!isVerified ? "Verify your in-game ID first" : "Pay using wallet"}</Button>
                            <p>OR</p>
                        </>
                    }
                    <Button className="w-[100%]" onClick={handleUPIPayment} disabled={!isVerified}>{!isVerified ? "Verify your in-game ID first" : "Pay using UPI"}</Button>
                </div>
            </div>
        </div>
    )
}

// import { useEffect, useState } from "react";

const Popup = ({game, txn, setUserId, setServerId, setIsVerified, setIngameName}: {game: any, txn: any, setUserId: any, setServerId: any, setIsVerified: any, setIngameName: any}) => {
  const [isOpen, setIsOpen] = useState(false);
    const userId = txn.userid
    const serverId = txn.serverid
  useEffect(() => {
    // Show popup when the page loads
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOk = async() => {
    setServerId(serverId)
    setUserId(userId)
    setIsVerified(true);
    setIsOpen(false);
    try {
        if (userId.length <= 0) return
        const { data } = await axios.post('https://coinstore-backend.onrender.com/api/topup/check-id', {
            game: game,
            userID: userId,
            serverID: serverId
        })

        if (data.valid === 'valid') {
            setIsVerified(true)
            setIngameName(data.name)
        }

    } catch (error) {
        console.log(error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-[#e3dbdb] dark:bg-[#091115] rounded-lg shadow-lg p-6 w-[90%] sm:w-[400px]">
          <p className=" mb-4">
            userID: {userId}<br/>
            serverID: {serverId}
          </p>
          <h2 className="text-lg font-bold mb-4">Would you like to use this credentials!</h2>
          {/* <p className="text-gray-700 mb-4">
            This is a popup that appears when you land on the page.
          </p> */}
          <div className="flex gap-2">
            <Button
                onClick={handleOk}
                size="sm"
            >
                OK
            </Button>
            <Button
                onClick={closeModal}
                size="sm"
            >
                Close
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

// export default Popup;
