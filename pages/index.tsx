import type { NextPage } from 'next'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center px-2">
      <header className="h-screen flex flex-col justify-center">
        <h1 className="font-caveat text-8xl">Sweet Bakery</h1>
        <h2 className="font-indieflower text-3xl ml-24">The home of all your sweet needs</h2>
      </header>
      <section className="mb-20">
        <div className="flex md:flex-row flex-col max-w-4xl gap-10 items-center mb-20">
          <img className='w-60 h-60 rounded-full' src="https://cdn.shopify.com/s/files/1/1710/0225/products/3N1A5856_480x480.jpg?v=1648924338" alt="homepage-img2" />
          <div>
            <h3 className="font-caveat text-5xl mb-5">Top quality isn&apos;t enough</h3>
            <p className="font-indieflower text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem placeat error veritatis sed iure quas ex adipisci omnis. Corrupti animi sint inventore. Adipisci blanditiis recusandae illo inventore, vero cum minima.</p>
          </div>
        </div>
        <div className="flex md:flex-row flex-col-reverse max-w-4xl gap-10 items-center mb-20">
          <div>
            <h3 className="font-caveat text-5xl mb-5">Freshly made, for you</h3>
            <p className="font-indieflower text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque labore et praesentium! Assumenda, distinctio sunt fugiat ullam dolorum cum, quidem aspernatur sit fuga facere magnam repudiandae aperiam nisi vitae eos?</p>
          </div>
          <img className='w-60 h-60 rounded-full' src="https://th.bing.com/th/id/R.93615fdff3c855317446cd415b7c9ee4?rik=kKX0twgkg%2bkr1g&riu=http%3a%2f%2fpinchables.net%2fwp-content%2fuploads%2f2018%2f01%2fDSC_0765.jpg&ehk=6uewdZVTecQq7eU8ya9ifZpHRAsO2iaOGawrnVMN6ns%3d&risl=&pid=ImgRaw&r=0" alt="homepage-img1" />
        </div>
      </section>
      <section className="">
        <div className="flex md:flex-row flex-col max-w-4xl gap-10 items-center mb-20">
          <h3 className="font-caveat text-5xl mb-5" >From our store to your home in 1 day</h3>
          <p className="font-indieflower text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet doloremque distinctio recusandae. Iste odio, nesciunt in velit dolorem corrupti molestias possimus illum dolore magnam assumenda aliquid totam sed aperiam eum.</p>
        </div>
        <div className="flex md:flex-row flex-col max-w-4xl gap-10 items-center mb-20">
          <h3 className="font-caveat text-5xl mb-5" >Guaranteed satisfaction</h3>
          <p className="font-indieflower text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet doloremque distinctio recusandae. Iste odio, nesciunt in velit dolorem corrupti molestias possimus illum dolore magnam assumenda aliquid totam sed aperiam eum.</p>
        </div>

      </section>

    </div>
  )
}

export default Home
