// import stores
import useLoginStore from "../../lib/store/loginStore";
import useCartStore, { CartItem } from "../../lib/store/cartStore";
import useUIstore from "../../lib/store/UIstore";
import { useEffect } from "react";

export const ProductItem = (props: CartItem) => {
    const user = useLoginStore(store => store.currentUser);
    const items = useCartStore(store => store.items);
    const addItem = useCartStore(store => store.addToCart);
    const showNotification = useUIstore(store => store.setNotificationContent);

    const addToCartHandler = () => {
        if (useLoginStore.getState().isLogged) {
            const newCartItem = {
                id: props.id,
                imgUrl: props.imgUrl,
                title: props.title,
                description: props.description,
                price: props.price,
            }
            addItem(newCartItem);
        } else {
            showNotification(false, 'Hello! Please login to start shopping');
        }
    }

    useEffect(() => {
        localStorage.setItem(`cartFor${user.username}`, JSON.stringify(items));
    }, [items, user.username])

    return (
        <li className='flex flex-row flex-wrap rounded-md bg-slate-100 w-full max-w-sm font-indieflower'>
            <img className='w-full h-40 object-cover rounded-tl-md rounded-tr-md' src={props.imgUrl} alt="" />
            <div className='py-4 px-4'>
                <header>
                    <h3 className='text-3xl'>{props.title}</h3>
                    <div className='text-2xl'>$ {props.price.toFixed(2)}</div>
                </header>
                <p className='text-xl'>{props.description}</p>
            </div>
            <button className='bg-pink-200 rounded-b-md w-full p-2 self-stretch' onClick={addToCartHandler}>Add to Cart</button>
        </li>
    );
};
