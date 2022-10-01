// import core dependencies
import Link from 'next/link';
import { useRouter } from 'next/router';

// import store
import useStore from '../../store/Store';

// import components
import { CartButton } from "../shop/CartButton";
import { LoginModal } from "../modals/Login";
import { SignUpModal } from "../modals/SignUp";

// import assets
import topbarIcon from '../../public/images/bakery-logo.png'
import Image from 'next/image';

export const Navbar = () => {
    const router = useRouter()
    const isLogged = useStore(state => state.isLogged)
    const isLoginModalOpen = useStore(state => state.isLoginModalOpen)
    const isSignupModalOpen = useStore(state => state.isSignupModalOpen)
    const showLoginModal = useStore(state => state.showLoginModal)
    const showSignupModal = useStore(state => state.showSignupModal)
    const logout = useStore(state => state.logoutUser)

    return (
        <nav className="flex flex-row justify-between items-center px-2 md:px-10 h-24 sticky top-0 left-0 right-0 z-100 bg-[#e2c3c8]">
            <Link href='/'><Image width={80} height={80} className="rounded-full border-2 border-red-200 cursor-pointer" src={topbarIcon} alt="nav-logo" /></Link>
            <div className="flex flex-row items-center gap-6">
                {!isLogged && <button onClick={showLoginModal} className="font-indieflower text-2xl">Log In</button>}
                {isLogged && <button onClick={logout} className="font-indieflower text-2xl">Log Out</button>}
                {!isLogged && <button onClick={showSignupModal} className="font-indieflower text-2xl">Sign Up</button>}
                {router.pathname !== '/shop' && <Link href='/shop'><button className="font-indieflower text-2xl">Shop</button></Link>}
                {(isLogged && router.pathname !== '/account') && <Link href='account'><button className="font-indieflower text-2xl">Account</button></Link>}
                {isLogged && <CartButton />}
            </div>
            {isLoginModalOpen && <LoginModal />}
            {isSignupModalOpen && <SignUpModal />}
        </nav>
    )
}
