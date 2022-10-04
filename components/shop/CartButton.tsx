// import hooks
import { useEffect } from 'react';

// import stores
import useLoginStore from '../../lib/store/loginStore';
import useUIstore from '../../lib/store/UIstore';
import useCartStore from '../../lib/store/cartStore';

// import components
import { RenderedCart } from './Cart';

export const CartButton = () => {
    const items = useCartStore((state) => state.items)
    const totalItems = useCartStore((state) => state.totalQuantity)
    const isCartVisible = useUIstore(state => state.isCartVisible)
    const showCart = useUIstore(state => state.showCart)
    const hideCart = useUIstore(state => state.hideCart)

    function toggleCartHandler() {
        if (isCartVisible) {
            console.log(isCartVisible)
            hideCart()
        } else {
            showCart()
        }
    }

    const login = useLoginStore(state => state.loginUser);
    const initCart = useCartStore(state => state.replaceCart);

    useEffect(() => {
        // try to fetch the stored user
        const storedUser: { username: string, email: string, accessToken: string } = JSON.parse(localStorage.getItem('currentUser') as string);
        // if present, log automatically
        if (storedUser && typeof storedUser !== 'undefined') {
            login(storedUser.username, storedUser.email, storedUser.accessToken)

            // try to fetch the stored cart
            const localCart = JSON.parse(localStorage.getItem(`cartFor${storedUser.username}`) as string)
            // if present, put it as the actual cart in the store
            if (localCart && localCart.length > 0) {
                initCart(localCart)
            }
        }
    }, [login, initCart])

    return (
        <div className='relative'>
            <button className='flex flex-row gap-4 items-center font-indieflower text-2xl' onClick={toggleCartHandler}>
                <span className=''>My Cart</span>
                <span className='bg-pink-100 text-gray-900 w-10 h-10 rounded-full leading-10'>{totalItems}</span>
            </button>
            {isCartVisible && <RenderedCart items={items} />}
        </div>
    );
};
