import Router from "next/router";
import { useEffect } from "react";
import useStore from "../store/Store";

const Account = () => {

    /* Check if user is logged, if not push back to homepage */
    const isLogged = useStore(state => state.isLogged)
    useEffect(() => {
        if (!isLogged) {
            Router.push('/');
        }
    }, [isLogged])

    return (
        <div className="flex flex-col min-h-screen items-center px-2">
            <h1 className="font-caveat text-4xl mb-10">Hello, {'username'}</h1>
            <form className="flex flex-col gap-5 items-center">
                <label htmlFor="changepassword" className="text-gray-800 text-xl font-indieflower leading-tight tracking-normal">Change password</label>
                <input type='password' id="changepassword" name="changepassword" minLength={6} className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="New Password Here" />
                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 text-md">Submit</button>
            </form>
        </div>
    )
}

export default Account;
