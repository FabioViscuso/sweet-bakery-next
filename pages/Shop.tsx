// Hooks import
import { useEffect } from "react";
import useStore, { CartItemWithStats } from "../store/Store";

// Components import
import { Products } from "../components/shop/Products"

// initialize a flag that signals the first render
let isFirstRender = true

const Shop = () => {
    const cart = useStore(state => state.items)
    function retrieveCartData() {
        console.log('retrive placeholder')
    }
    function sendCartData(cart: CartItemWithStats[]) {
        console.log('send placeholder' + cart)
    }

    useEffect(() => {
        retrieveCartData()
    }, [])

    useEffect(() => {
        // this code prevents overriding the remote DB with empty data on startup
        if (isFirstRender === true) {
            isFirstRender = false
            return;
        }
        sendCartData(cart)
    }, [cart])

    return (
        <div className="flex flex-col justify-start items-center overflow-x-hidden overflow-y-auto py-4 pt-8">
            <Products />
        </div>
    )
}

export default Shop;
