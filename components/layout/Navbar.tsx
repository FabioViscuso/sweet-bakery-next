// import core dependencies
import Link from 'next/link';
import { useRouter } from 'next/router';

// useLogin custom hook
import useStore from '../../store/Store';
import { CartButton } from "../shop/CartButton";

// Import modals
import { LoginModal } from "../modals/Login";
import { SignUpModal } from "../modals/SignUp";

export const Navbar = () => {
    // recall the useLogin custom hook
    const router = useRouter()
    const isLogged = useStore(state => state.isLogged)
    const isLoginModalOpen = useStore(state => state.isLoginModalOpen)
    const isSignupModalOpen = useStore(state => state.isSignupModalOpen)
    const showLoginModal = useStore(state => state.showLoginModal)
    const showSignupModal = useStore(state => state.showSignupModal)
    const logout = useStore(state => state.logoutUser)


    return (
        <nav className="flex flex-row justify-between items-center px-2 md:px-10 h-24 sticky top-0 left-0 right-0 z-100 bg-[#e2c3c8]">
            <Link href='/'><img className="w-20 h-20 rounded-full border-2 border-red-200" src={process.env.PUBLIC_URL + 'images/bakery-logo.png'} alt="nav-logo" /></Link>
            <div className="flex flex-row items-center gap-6">
                {!isLogged && <button onClick={showLoginModal} className="font-indieflower text-2xl">Log In</button>}
                {isLogged && <button onClick={logout} className="font-indieflower text-2xl">Log Out</button>}
                {!isLogged && <button onClick={showSignupModal} className="font-indieflower text-2xl">Sign Up</button>}
                {(isLogged && router.pathname !== 'shop') && <Link href='/shop'><button className="font-indieflower text-2xl">Shop</button></Link>}
                {(isLogged && router.pathname !== 'account') && <Link href='account'><button className="font-indieflower text-2xl">Account</button></Link>}
                {isLogged && <CartButton />}
            </div>
            {isLoginModalOpen && <LoginModal />}
            {isSignupModalOpen && <SignUpModal />}
        </nav>
    )
}
