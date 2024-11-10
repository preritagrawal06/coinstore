import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function SignUp() {
  return (
    <section className="bg-white font-PostJb">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1529154691717-3306083d869e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to CoinStore
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
              quibusdam aperiam voluptatum.
            </p>

            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <Input type="text" id="userid" className="w-[100%] text-black" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>

                <Input type="text" id="userid" className="w-[100%] text-black" />
              </div>

              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                <Input type="text" id="userid" className="w-[100%] text-black" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                <Input type="text" id="userid" className="w-[100%] text-black" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                  Password Confirmation
                </label>

                <Input type="text" id="userid" className="w-[100%] text-black" />
              </div>
              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                  and
                  <a href="#" className="text-gray-700 underline">privacy policy</a>.
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-lg font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create an account
                </Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="#" className="text-gray-700 underline">Log in</a>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}