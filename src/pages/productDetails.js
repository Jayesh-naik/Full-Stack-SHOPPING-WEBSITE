import { useParams, useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProductDetails = () => {

  const { id } = useParams();
  const [product, setProduct] = useState();
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json()).then(data => setProduct(data));

  }, []);

  if (!product) return <div>Loading...</div>

  const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  
};

  return (
    <div className="bg-blue-50  flex h-90 mt-40 ml-40 mr-40 justify-center items-center shadow-lg rounded-2xl">
      <img src={product.image} className="w-full h-72 object-contain mb-4"></img>
      <div className="p-8 flex flex-col gap-4">
        <div className="text-2xl text-blue-800">{product.title}</div>
        <div className="max-w-6xl">{product.description}</div>
        <div className="font-bold text-3xl text-blue-900">{product.price}$</div>
<button 
  onClick={() => {
    addToCart();
    navigate('/cart'); // navigate AFTER adding
  }}
  className="transition duration-200 rounded-2xl border border-blue-950 p-2 text-xl hover:bg-blue-900 hover:text-blue-50 hover:scale-105"
>
  Add To Cart
</button>
      </div>
    </div>
  );
};
