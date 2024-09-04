
export default function Button({name}:{name:string}) {
    return (
        <button type="button" className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-PostSB rounded-lg text-medium  text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2 px-2 py-2 md:px-5 md:py-2.5">
          {name}<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
        </button>
    )
}