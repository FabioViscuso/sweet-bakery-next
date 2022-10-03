// Import createPortal
import React from "react";
import { createPortal } from "react-dom";

// import useLogin hook
import useLogin from "../../lib/useLogin";

const Login = () => {

    const { usernameInput, passwordInput, loginHandler, hideLoginModal } = useLogin()

    return (
        <div className="py-12 bg-gray-700 bg-opacity-50 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
            <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                <form onSubmit={loginHandler} className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <h1 className="text-gray-800 text-6xl font-caveat tracking-normal leading-tight mb-4">Log In</h1>

                    {/* USERNAME FIELD */}
                    <label htmlFor="loginusername" className="text-gray-800 text-lg font-indieflower leading-tight tracking-normal">Username</label>
                    <input type="text" id="loginusername" name="loginusername" autoFocus ref={usernameInput} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="" />

                    {/* PASSWORD FIELD */}
                    <label htmlFor="loginpassword" className="text-gray-800 text-lg font-indieflower leading-tight tracking-normal">Password</label>
                    <div className="relative mb-5 mt-2">
                        <input type='password' id="loginpassword" name="loginpassword" ref={passwordInput} className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="" />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex items-center justify-start w-full">
                        <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 text-md">Submit</button>
                        <button type="button" onClick={hideLoginModal} className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:bg-gray-300 border rounded px-8 py-2 text-md">Cancel</button>
                    </div>

                    {/* CLOSE BUTTON */}
                    <button onClick={hideLoginModal} className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}

export const LoginModal = () => {
    return (
        <>
            {createPortal(<Login />, document.getElementById('loginModal') as HTMLElement)}
        </>
    )
}
