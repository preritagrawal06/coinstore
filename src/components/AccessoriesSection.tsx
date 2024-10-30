import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";
import MerchCard from "./MerchCard";

export default function AccessoriesSection(){
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
        name: 'Outlaw To The End',
        price: 1000,
        img_url: 'https://www.redwolf.in/image/cache/catalog/t-shirts/dtg/redwolf-outlaw-to-the-end-t-shirt-india-600x800.jpg?m=1727939910'
    },
    {
        ind: 2,
        name: 'Duck Hunt',
        price: 1000,
        img_url: 'https://www.redwolf.in/image/cache/catalog/t-shirts/dtg/duck-hunt-t-shirt-india-600x800.jpg?m=1727939900'
    },
    {
        ind: 3,
        name: 'COD Logo',
        price: 1000,
        img_url: 'https://www.redwolf.in/image/cache/catalog/t-shirts/dtg/redwolf-cod-logo-t-shirt-india-600x800.jpg?m=1727939910'
    },
    {
        ind: 4,
        name: 'Social Distancing',
        price: 1000,
        img_url: 'https://www.redwolf.in/image/cache/catalog/t-shirts/dtg/redwolf-social-distancing-t-shirt-india-600x800.jpg?m=1727939910'
    }, {
        ind: 5,
        name: 'Get A Life',
        price: 1000,
        img_url: 'https://www.redwolf.in/image/cache/catalog/t-shirts/dtg/redwolf-mario-get-a-life-t-shirt-india-600x800.jpg?m=1727939910'
    }, {
        ind: 6,
        name: 'Cheat Code',
        price: 1000,
        img_url: 'https://www.redwolf.in/image/cache/catalog/t-shirts/dtg/redwolf-contra-cheat-code-t-shirt-india-600x800.jpg?m=1727939910'
    }
    ]
    return(
        <div className="flex flex-col gap-4 text-center p-6 relative" id="merchandise">
            <p className="font-PostSB text-black dark:text-white text-[20px] md:text-[24px] lg:text-[30px]">#Our Merchandise</p>
            <div className="backdrop-blur-sm bg-white/30 absolute z-10 h-[90%] top-[10%] w-[90%] sm:w-[94%] md:w-[95%] lg:w-[98%] text-[32px] font-PostSB m-auto">
              <p className="text-center mt-20 text-[#150707]"> Coming Soon</p>
            </div>
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
                className="z-0"
            >
                {data.map((x) => (
                    <MerchCard name={x.name} price={x.price} img={x.img_url} key={x.ind} />
                ))}
            </Carousel>
            <p className="text-black dark:text-[#24FFF2] text-[20px] text-right"><Link to={'#'}>View All</Link></p>
        </div>
    )
}