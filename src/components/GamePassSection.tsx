import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PassCard from "./PassCard";
import { Link } from "react-router-dom";

export default function GamePassSection() {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        midtablet: {
            breakpoint: { max: 1024, min: 900 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 900, min: 600 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 600, min: 464 },
            items: 1
        },
        smdevice: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }

    const data = [{
        ind: 1,
        name: 'Mobile Legends',
        org: 'Moonton',
        img_url: 'mlbb.png',
        sign:'mlbb'
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
    return (
        <div className="flex flex-col gap-4 text-center p-6">
            <p className="font-PostSB text-black dark:text-white text-[20px] md:text-[24px] lg:text-[30px]">#Trending Game Passes</p>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile","smdevice"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {data.map((x) => (
                    <PassCard name={x.name} org={x.org} img={x.img_url} key={x.ind} sign={x.sign!} />
                ))}
            </Carousel>
            <p className="text-black dark:text-[#24FFF2] text-[20px] text-right"><Link to={'#'}>View All</Link></p>
        </div>
    )
}