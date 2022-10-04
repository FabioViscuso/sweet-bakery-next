// Components import
import { GetServerSideProps } from "next";
import { ProductItem } from "../components/shop/ProductItem";
import env from "../lib/config";
import { CartItem } from "../lib/store/cartStore";

export default function Shop(props: any) {
    return (
        <div className="min-h-screen flex flex-col justify-start items-center overflow-x-hidden overflow-y-auto py-4 pt-32">
            <section className='flex flex-col justify-center items-center w-full'>
                <h2 className='text-4xl mb-8 font-indieflower'>{"You can't go wrong: they're all delicious"}</h2>
                <ul className='shop-grid gap-5 justify-between items-center w-full px-5'>
                    {
                        props.products.map((item: CartItem) =>
                            <ProductItem
                                key={item.id}
                                id={item.id}
                                imgUrl={item.imgUrl}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                            />
                        )
                    }
                </ul>
            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    const products = await env.prisma.products.findMany();
    console.log(products)
    env.prisma.$disconnect;

    return {
        props: {
            products: products.map(product => ({
                id: product.id,
                imgUrl: product.imgUrl,
                title: product.title,
                price: product.price,
                description: product.description,
                createdAt: product.createdAt.toISOString(),
                updatedAt: product.updatedAt.toISOString()
            }))
        }
    }
}
