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

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items))
    }, [items])

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
