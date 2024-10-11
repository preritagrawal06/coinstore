import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function AccountSection() {
    const data = [{
        ind: 1,
        name: 'BGMI',
        price: 1000,
        img_url: 'gamepass.jpg'
    },
    {
        ind: 2,
        name: 'BGMI2',
        price: 1000,
        img_url: 'gamepass.jpg'
    },
    {
        ind: 3,
        name: 'BGMI3',
        price: 1000,
        img_url: 'gamepass.jpg'
    },
    {
        ind: 4,
        name: 'BGMI4',
        price: 1000,
        img_url: 'gamepass.jpg'
    }, {
        ind: 5,
        name: 'BGMI5',
        price: 1000,
        img_url: 'gamepass.jpg'
    }, {
        ind: 6,
        name: 'BGMI6',
        price: 1000,
        img_url: 'gamepass.jpg'
    }
    ]
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
    return (
        <div className="flex flex-col gap-4 p-6">
            <p className="font-PostSB text-black dark:text-white text-[20px] md:text-[24px] lg:text-[30px]">#Most Popular Game Accounts</p>
            <Tabs defaultValue="BGMI" >
                <TabsList className="mb-4">
                    <TabsTrigger value="BGMI">BGMI</TabsTrigger>
                    <TabsTrigger value="MLBB">MLBB</TabsTrigger>
                </TabsList>
                <TabsContent value="BGMI">
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
                removeArrowOnDeviceType={["tablet", "mobile", "smdevice"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {data.map((x) => (
                    <ItemCard name={x.name} price={x.price} img={x.img_url} key={x.ind} />
                ))}
            </Carousel>
            <p className="text-black dark:text-[#24FFF2] text-[20px] text-right mt-4"><Link to={'#'}>View All</Link></p>
                </TabsContent>
                <TabsContent value="MLBB">
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
                removeArrowOnDeviceType={["tablet", "mobile", "smdevice"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {data.map((x) => (
                    <ItemCard name={x.name} price={x.price} img={x.img_url} key={x.ind} />
                ))}
            </Carousel>
            <p className="text-black dark:text-[#24FFF2] text-[20px] text-right mt-4"><Link to={'#'}>View All</Link></p>
                </TabsContent>
            </Tabs>

        </div>
    )
}