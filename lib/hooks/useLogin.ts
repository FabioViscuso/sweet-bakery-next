import { useRef } from "react";
import useLoginStore from "../store/loginStore";
import useUIstore from "../store/UIstore";

export default function useLogin() {
    const login = useLoginStore(store => store.loginUser);

    const hideLoginModal = useUIstore(store => store.hideLoginModal);
    const setNotification = useUIstore(store => store.setNotificationContent);

    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const loginHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const username = usernameInput.current!.value;
        const password = passwordInput.current!.value;

        if (username.length >= 6 && password.length >= 8) {
            const response = await fetch('api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            })
            if (response.ok) {
                const data = await response.json()
                login(data.username, data.email, data.accessToken)
                hideLoginModal()
                localStorage.setItem('currentUser', JSON.stringify({ username: data.username, email: data.email, accessToken: data.accessToken }))
                setNotification(true, 'You logged in!')
            } else {
                const error = await response.json()
                setNotification(false, error.message)
            }
        } else {
            setNotification(false, 'check your inputs')
        }
    }

    return {
        usernameInput,
        passwordInput,
        loginHandler,
        hideLoginModal
    }
}
