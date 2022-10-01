// Import components
import { CartItemComponent } from "./CartItem"

// Import RootState and CartItemWithStats types
import useStore, { CartItemWithStats } from "../../store/Store"
import { useEffect } from "react";
interface Props {
    items: CartItemWithStats[]
}
export const Cart = (props: Props) => {
    const totalAmount = useStore(state => state.totalAmount);
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
        <div className="absolute -right-2 top-16 flex flex-col justify-between items-center md:w-max gap-5 py-5 px-2 rounded-md bg-[#e2c3c8] border-stone-600 border-2">
            <h2 className="text-4xl font-caveat">Your Shopping Cart</h2>
            <ul className="flex flex-col gap-5 w-full  max-h-96 overflow-auto">
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
    )
}
