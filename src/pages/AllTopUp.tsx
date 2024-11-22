import PassCard from "@/components/PassCard"


export default function AllTopUpPage(){
    const data = [{
        ind: 1,
        name: 'Mobile Legends',
        org: 'Moonton',
        img_url: 'mlbb.png',
        sign:'mlbb_global'
    },
    {
        ind: 2,
        name: 'PUBG Global',
        org: 'Krafton',
        img_url: 'pubg.jpg',
        sign:'pubgm'
    },
    {
        ind: 3,
        name: 'Genshin Impact',
        org: 'MiHoYo',
        img_url: 'genshin.jpg',
        sign:'genshin'
    },
    {
        ind: 4,
        name: 'Clash of Clans',
        org: 'Supercell',
        img_url: 'coc.jpg',
        sign:'clashofclans'
    }, {
        ind: 5,
        name: 'Honkai:Star Rail',
        org: 'MiHoYo',
        img_url: 'honkai.jpg',
        sign:'honkai_star_rail'
    }, 
    {
        ind: 6,
        name: 'Clash Royale',
        org: 'Supercell',
        img_url: 'cor.jpg',
        sign:'clashroyale'
    }, 
    {
        ind: 7,
        name: 'Farlight 84',
        org: 'Lilith Games',
        img_url: 'farlight.jpg',
        sign:'farlight84'
    },
    {
        ind: 8,
        name: 'Supersus',
        org: 'Lilith Games',
        img_url: 'supersus.jpg',
        sign:"super_sus"
    }
    ]
    return(
        <div className="flex flex-row flex-wrap justify-center gap-4 px-2 md:px-5 pt-20">
            {
                data?.map((x)=>(
                    <PassCard name={x.name} org={x.org} img={x.img_url} key={x.ind} sign={x.sign!} />
                ))
            }
        </div>
    )
}