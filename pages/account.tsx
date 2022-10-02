import Router from "next/router";
import React, { useEffect, useRef } from "react";
import useStore from "../store/Store";

const Account = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passInputRef = useRef<HTMLInputElement>(null);
    const isLogged = useStore(state => state.isLogged);
    const user = useStore(state => state.currentUser);
    const login = useStore(state => state.loginUser)
    const resetCart = useStore(state => state.replaceCart);

    function clearCart() {
        localStorage.removeItem(`cartFor${user}`)
        resetCart([])
    }

    async function changeMail(event: React.FormEvent) {
        event.preventDefault()
        let emailInputValue = emailInputRef.current!.value
        if (emailInputValue.length > 7 && emailInputValue.includes('@')) {
            const response = await fetch('api/users/changemail', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user.username, newEmail: emailInputValue, accessToken: user.accessToken })
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                login(data.username, data.email, data.accessToken)
                localStorage.setItem('currentUser', JSON.stringify({ username: data.username, email: data.email, accessoToken: data.accessToken }))
                emailInputRef.current!.value = ''
            } else {
                const data = await response.json()
                alert(data.message)
            }
        } else {
            alert('check the validity of email input')
        }
    }

    async function changePassword(event: React.FormEvent) {
        event.preventDefault()
        let passInputValue = passInputRef.current!.value
        if (passInputValue.length > 7) {
            const response = await fetch('api/users/changepsw', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user.username, newPassword: passInputValue, accessToken: user.accessToken })
            })

            if (response.ok) {
                passInputRef.current!.value = ''
            } else {
                const data = await response.json()
                alert(data.message)
            }
        } else {
            alert('check the validity of password input')
        }
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
                <input type='password' id="changepassword" name="changepassword" ref={passInputRef} minLength={8} className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="New Password Here" />
                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 text-md">Submit</button>
            </form>
            <h2 className="font-caveat text-4xl mt-10 mb-4">Other settings</h2>
            <button onClick={clearCart} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 mb-10 text-md">Clear Cart</button>
            <form className="flex flex-col gap-5 items-center">
                <label htmlFor="deleteaccount" className="text-gray-800 text-2xl font-indieflower leading-tight tracking-normal">Delete your account</label>
                <input type='password' id="deleteaccount" name="deleteaccount" minLength={8} className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Retype your username" />
                <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 px-8 py-2 text-md">Delete</button>
            </form>
        </div>
    )
}

export default Account;
