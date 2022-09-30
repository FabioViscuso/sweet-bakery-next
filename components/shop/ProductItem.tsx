// import store
import useStore, { CartItem } from "../../store/Store";

export const ProductItem = (props: CartItem) => {
    const addItem = useStore(state => state.addToCart)

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
            <button className='bg-pink-200 rounded-md w-full p-2 self-stretch' onClick={() => addItem}>Add to Cart</button>
        </li>
    );
};
