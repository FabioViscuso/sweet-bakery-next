import Router from "next/router";
import { useEffect } from "react";
import useStore from "../store/Store";

const Account = () => {

    /* Check if user is logged, if not push back to homepage */
    const isLogged = useStore(state => state.isLogged);
    const user = useStore(state => state.currentUser.username);
    const resetCart = useStore(state => state.replaceCart)

    function clearCart() {
        localStorage.removeItem(`cartFor${user}`)
        resetCart([])
    }

    useEffect(() => {
        if (!isLogged) {
            Router.push('/');
        }
    }, [isLogged])

    return (
        <div className="flex flex-col min-h-screen items-center px-2 py-4 pt-8">
            <h1 className="font-caveat text-6xl mb-10">Hello, {user}!</h1>
            <form className="flex flex-col gap-5 items-center mb-8">
                <label htmlFor="changemail" className="text-gray-800 text-xl font-indieflower leading-tight tracking-normal">Change email</label>
                <input type='password' id="changemail" name="changemail" minLength={8} className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="New email Here" />
                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 text-md">Submit</button>
            </form>
            <form className="flex flex-col gap-5 items-center mb-8">
                <label htmlFor="changepassword" className="text-gray-800 text-xl font-indieflower leading-tight tracking-normal">Change password</label>
                <input type='password' id="changepassword" name="changepassword" minLength={8} className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="New Password Here" />
                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 text-md">Submit</button>
            </form>
            <h2 className="font-caveat text-4xl mt-10 mb-4">Other settings</h2>
            <button onClick={clearCart} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 mb-4 text-md">Clear Cart</button>
            <form className="flex flex-col gap-5 items-center">
                <label htmlFor="deleteaccount" className="text-gray-800 text-xl font-indieflower leading-tight tracking-normal">Delete your account</label>
                <input type='password' id="deleteaccount" name="deleteaccount" minLength={8} className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Retype your username" />
                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 text-md">Delete</button>
            </form>
        </div>
    )
}

export default Account;
