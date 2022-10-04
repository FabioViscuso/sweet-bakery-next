// import hooks
import { useEffect } from "react";
import { createPortal } from "react-dom";

// Import components
import { CartItemComponent } from "./CartItem"

// Import stores
import useLoginStore from "../../lib/store/loginStore";
import useCartStore, { CartItemWithStats } from "../../lib/store/cartStore";
import useUIstore from "../../lib/store/UIstore";
interface Props {
    items: CartItemWithStats[]
}
export const Cart = (props: Props) => {
    const login = useLoginStore(state => state.loginUser);
    const totalAmount = useCartStore(state => state.totalAmount);
    const initCart = useCartStore(state => state.replaceCart);
    const hideCart = useUIstore(store => store.hideCart)

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
        <div onClick={() => hideCart()} className="fixed top-0 bottom-0 left-0 right-0 z-40 flex justify-end bg-slate-700 bg-opacity-70 backdrop-blur-sm">
            <div className="flex flex-col justify-between items-center w-full md:w-1/5 gap-5 py-5 px-2 md:rounded-l-md bg-[#e2c3c8]">
                <h2 className="text-4xl font-caveat">Your Shopping Cart</h2>
                <button onClick={() => hideCart()} className='bg-pink-200 rounded-md w-full p-2 self-stretch'>Close</button>
                <ul className="flex flex-col gap-5 mt-auto w-full  overflow-auto">
                    {
                        props.items.map((item, index: number) =>
                            <CartItemComponent
                                key={index}
                                id={item.id}
                                title={item.title}
                                imgUrl={item.imgUrl}
                                description={item.description}
                                quantity={item.quantity}
                                totalAmount={item.totalAmount}
                                price={item.price}
                            />
                        )
                    }
                </ul>
                <h4 className="font-caveat text-2xl">Total: {totalAmount}</h4>
                <button className='bg-pink-200 rounded-md w-full p-2 self-stretch'>Proceed to checkout</button>
            </div>
        </div>
    )
}

export const RenderedCart = (props: Props) => {
    return (
        <>
            {createPortal(<Cart items={props.items} />, document.getElementById('cartContainer') as HTMLElement)}
        </>
    )
}
