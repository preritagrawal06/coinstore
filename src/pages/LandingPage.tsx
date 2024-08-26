
export default function LandingPage() {
    return (
        <div className="h-screen font-JR bg-hero-pattern bg-center bg-cover flex justify-center items-left flex-col px-6">
            <div>
                <p className="subtext">#No.1 website  for Game Pass</p>
                <p className="head1">Play More, Pay Less:</p>
                <p className="head1">Your Ultimate <span className="text-[#45F882]">Game Pass</span> Destination!</p>
            </div>
            <div>
                <button type="button" className="text-center inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 text-xl">Explore More <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg></button>
                <button type="button" className="text-center inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 text-xl">Browse Games <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg></button>
            </div>
        </div>
    )
}