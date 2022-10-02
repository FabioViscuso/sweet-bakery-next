// Hooks import


// Components import
import { Products } from "../components/shop/Products"

const Shop = () => {
    return (
        <div className="min-h-screen flex flex-col justify-start items-center overflow-x-hidden overflow-y-auto py-4 pt-8">
            <Products />
        </div>
    )
}

export default Shop;
