import { useRef } from "react";
import useStore from "../store/Store";

export default function useUserAccount() {
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const user = useStore(store => store.currentUser);
    const login = useStore(store => store.loginUser);
    const logout = useStore(store => store.logoutUser)
    const setNotification = useStore(store => store.setNotificationContent);

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
                setNotification(false, data.message)
            }
        } else {
            setNotification(false, 'check the validity of email input')
        }
    }

    async function changePassword(event: React.FormEvent) {
        event.preventDefault()
        let passInputValue = passwordInputRef.current!.value
        if (passInputValue.length > 7) {
            const response = await fetch('api/users/changepsw', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user.username, newPassword: passInputValue, accessToken: user.accessToken })
            })

            if (response.ok) {
                passwordInputRef.current!.value = ''
            } else {
                const data = await response.json()
                setNotification(false, data.message)
            }
        } else {
            setNotification(false, 'check the validity of password input')
        }
    }

    async function deleteUser(event: React.FormEvent) {
        event.preventDefault()
        let usernameInputValue = usernameInputRef.current!.value
        if (usernameInputValue === user.username) {
            const response = await fetch('api/users/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: usernameInputValue, accessToken: user.accessToken })
            })

            if (response.ok) {
                usernameInputRef.current!.value = ''
                localStorage.removeItem(`cartFor${user.username}`)
                logout();
            } else {
                const data = await response.json()
                setNotification(false, data.message)
            }
        } else {
            setNotification(false, 'typed username is different from your username')
        }
    }
    return {
        user,
        usernameInputRef,
        emailInputRef,
        passwordInputRef,
        changeMail,
        changePassword,
        deleteUser
    }
}
