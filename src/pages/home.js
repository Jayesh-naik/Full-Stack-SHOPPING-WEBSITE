import { Link } from "react-router-dom";
import shoppingIllustration from "../assets/shopping.png";

export const Home = () => {
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col md:flex-row justify-center items-center px-6 md:px-20 py-10 gap-10">

               
                <div className="flex flex-col gap-6 max-w-xl text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight">
                        Welcome to <span className="text-blue-600">My-Store</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        Discover the latest trends and timeless classics in one place.
                        Shop confidently with high-quality products, smooth navigation,
                        and secure checkout — all designed for your convenience.
                    </p>

                    <div className="flex justify-center md:justify-start gap-4">
                        <Link to='/products'>
                            <button className="bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-2xl shadow-md hover:bg-blue-800 hover:scale-105 transition-all duration-200">
                                🛒 Shop Now
                            </button>
                        </Link>
                    </div>
                </div>

                
                <div className="flex justify-center">
                    <img
                        src={shoppingIllustration}
                        alt="Shopping illustration"
                        className="w-full md:w-[450px] lg:w-[500px] object-contain hover:scale-105 transition-all duration-300 rounded-2xl"
                    />
                </div>
            </div>
            <section id="explore" className="bg-white py-16 px-6 md:px-20">
                <h2 className="text-4xl font-bold text-blue-900 text-center mb-10">
                    Why Shop With Us?
                </h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition">
                        <p className="text-5xl mb-4">⚡</p>
                        <h3 className="text-2xl font-semibold mb-2 text-blue-800">Fast Delivery</h3>
                        <p className="text-gray-600">Get your products quickly with our express shipping.</p>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition">
                        <p className="text-5xl mb-4">💳</p>
                        <h3 className="text-2xl font-semibold mb-2 text-blue-800">Secure Payment</h3>
                        <p className="text-gray-600">All transactions are encrypted and 100% safe.</p>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition">
                        <p className="text-5xl mb-4">⭐</p>
                        <h3 className="text-2xl font-semibold mb-2 text-blue-800">Top Rated Products</h3>
                        <p className="text-gray-600">Curated selection with customer satisfaction in mind.</p>
                    </div>
                </div>
            </section>
        </div>


    );
};
