import { useRef } from "react";
import useUIstore from "../store/UIstore";

export default function useSignup() {
    const setNotification = useUIstore(store => store.setNotificationContent);
    const hideSignupModal = useUIstore(store => store.hideSignupModal);

    const usernameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const signUpHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const username = usernameInput.current!.value;
        const email = emailInput.current!.value;
        const password = passwordInput.current!.value;

        if (username.length >= 6 && email.includes('@') && password.length >= 8) {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, email: email, password: password })
            });

            if (response.ok) {
                hideSignupModal()
                setNotification(true, `user ${username} registered, login to shop now!`);
            } else {
                const data = await response.json();
                setNotification(false, data.message);
            }
        } else {
            setNotification(false, 'please check your inputs');
        }
    }

    return {
        usernameInput,
        emailInput,
        passwordInput,
        signUpHandler,
        hideSignupModal
    }
}
