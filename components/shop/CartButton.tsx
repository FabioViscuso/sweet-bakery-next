
import useStore from '../../store/Store';
import { Cart } from './Cart';

export const CartButton = () => {
    const totalItems = useStore((state) => state.totalQuantity)
    const isCartVisible = useStore(state => state.isCartVisible)
    const hideCart = useStore(state => state.hideCart)
    const showCart = useStore(state => state.hideCart)

    const toggleCartHandler = () => {
        if (isCartVisible) {
            hideCart()
        } else {
            showCart()
        }
    }



    return (
        <div className='relative'>
            <button className='flex flex-row gap-4 items-center font-indieflower text-2xl' onClick={toggleCartHandler}>
                <span className=''>My Cart</span>
                <span className='bg-pink-100 text-gray-900 w-10 h-10 rounded-full leading-10'>{totalItems}</span>
            </button>
            {isCartVisible && <Cart />}
        </div>
    );
};
