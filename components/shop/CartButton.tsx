import { useEffect } from 'react';
import useStore from '../../store/Store';
import { Cart } from './Cart';

export const CartButton = () => {
    const items = useStore((state) => state.items)
    const totalItems = useStore((state) => state.totalQuantity)
    const isCartVisible = useStore(state => state.isCartVisible)
    const showCart = useStore(state => state.showCart)
    const hideCart = useStore(state => state.hideCart)

    function toggleCartHandler() {
        if (isCartVisible) {
            console.log(isCartVisible)
            hideCart()
        } else {
            showCart()
        }
    }

    const login = useStore(state => state.loginUser);
    const initCart = useStore(state => state.replaceCart);

    useEffect(() => {
        // try to fetch the stored user
        const storedUser: { username: string, accessToken: string } = JSON.parse(localStorage.getItem('currentUser') as string);
        // if present, log automatically
        if (storedUser && typeof storedUser !== 'undefined') {
            login(storedUser.username, storedUser.accessToken)
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
            {isCartVisible && <Cart items={items} />}
        </div>
    );
};
