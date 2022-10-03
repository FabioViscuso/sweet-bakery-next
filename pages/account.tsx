// import hooks
import Router from "next/router";
import React, { useEffect, useRef } from "react";
import useUserAccount from "../lib/hooks/useUserAccount";

// import stores
import useLoginStore from "../lib/store/loginStore";
import useCartStore from "../lib/store/cartStore";

const Account = () => {
    const { user, usernameInputRef, emailInputRef, passwordInputRef, changeMail, changePassword, deleteUser } = useUserAccount()

    const isLogged = useLoginStore(state => state.isLogged);
    const resetCart = useCartStore(state => state.replaceCart);

    function clearCart() {
        localStorage.removeItem(`cartFor${user.username}`)
        resetCart([])
    }

    useEffect(() => {
        if (!isLogged) {
            Router.push('/');
        }
    }, [isLogged])

    return (
        <div className="flex flex-col min-h-screen max-w-4xl px-2 mx-auto py-4 pt-8">
            <h1 className="font-caveat text-6xl mb-10">Hello, {user.username}!</h1>
            <form onSubmit={changeMail} className="flex flex-col gap-5 items-center mb-8">
                <label htmlFor="changemail" className="text-gray-800 text-2xl font-indieflower leading-tight tracking-normal">Change email</label>
                <h3 className="font-indieflower text-xl mb-2">Current email: {user.email}</h3>
                <input type='email' id="changemail" name="changemail" ref={emailInputRef} minLength={8} className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="New email Here" />
                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 text-md">Submit</button>
            </form>
            <form onSubmit={changePassword} className="flex flex-col gap-5 items-center mb-8">
                <label htmlFor="changepassword" className="text-gray-800 text-2xl font-indieflower leading-tight tracking-normal">Change password</label>
                <input type='password' id="changepassword" name="changepassword" ref={passwordInputRef} minLength={8} className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="New Password Here" />
                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 text-md">Submit</button>
            </form>
            <h2 className="font-caveat text-4xl mt-10 mb-4">Other settings</h2>
            <button onClick={clearCart} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 mb-10 text-md">Clear Cart</button>
            <form onSubmit={deleteUser} className="flex flex-col gap-5 items-center">
                <label htmlFor="deleteaccount" className="text-gray-800 text-2xl font-indieflower leading-tight tracking-normal">Delete your account</label>
                <input type='text' id="deleteaccount" name="deleteaccount" minLength={6} ref={usernameInputRef} className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Retype your username" />
                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 text-md">Delete</button>
            </form>
        </div>
    )
}

export default Account;
