// import core dependencies
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// import store
import useLoginStore from '../../lib/store/loginStore';
import useUIstore from '../../lib/store/UIstore';

// import components
import { CartButton } from "../shop/CartButton";
import { LoginModal } from "../modals/Login";
import { SignUpModal } from "../modals/SignUp";

// import assets
import topbarIcon from '../../public/images/bakery-logo.png';

export const Navbar = () => {
    const router = useRouter()
    const isLogged = useLoginStore(state => state.isLogged)
    const isLoginModalOpen = useUIstore(state => state.isLoginModalOpen)
    const isSignupModalOpen = useUIstore(state => state.isSignupModalOpen)
    const showLoginModal = useUIstore(state => state.showLoginModal)
    const showSignupModal = useUIstore(state => state.showSignupModal)
    const logout = useLoginStore(state => state.logoutUser)

    return (
        <nav className="flex flex-row justify-between items-center px-2 md:px-10 h-24 sticky top-0 left-0 right-0 z-100 bg-[#e2c3c8] bg-opacity-70 backdrop-blur-sm">
            <Image width={60} height={60} className="border-2 border-red-200 cursor-pointer" src={topbarIcon} alt="nav-logo" />
            <div className="flex flex-row items-center gap-6">
                {router.pathname !== '/' && <Link href='/'><button className="font-indieflower text-2xl">Home</button></Link>}
                {router.pathname !== '/shop' && <Link href='/shop'><button className="font-indieflower text-2xl">Shop</button></Link>}
                {(isLogged && router.pathname !== '/account') && <Link href='account'><button className="font-indieflower text-2xl">Account</button></Link>}
                {!isLogged && <button onClick={showLoginModal} className="font-indieflower text-2xl">Log In</button>}
                {isLogged && <button onClick={logout} className="font-indieflower text-2xl">Log Out</button>}
                {!isLogged && <button onClick={showSignupModal} className="font-indieflower text-2xl">Sign Up</button>}
                {isLogged && <CartButton />}
            </div>
            {isLoginModalOpen && <LoginModal />}
            {isSignupModalOpen && <SignUpModal />}
        </nav>
    )
}
