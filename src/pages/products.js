import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const Products = () => {

    const [products, setProducts] = useState();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))

    }, []);

    if (!products) {
        return <div>Loading...</div>;
    }

    return (<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8">

        {products.map((product) => (
            <div className="p-4 shadow-md rounded-2xl flex flex-col gap-2 justify-center items-center">
                <img src={product.image} alt={item.name} className="w-full h-48 object-contain mb-4"></img>
                <div>{product.title}</div>
                <div>{product.price}$</div>
                <Link to={`/products/${product.id}`}><button className="border shadow-md pb-2 pt-2 pl-8 pr-8 rounded-2xl transition duration-200 hover:scale-105 hover:shadow-lg">Buy</button></Link>               
            </div>
        ))}

    </div>
    );
}