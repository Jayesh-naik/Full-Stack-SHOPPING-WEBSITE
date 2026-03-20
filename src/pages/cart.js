import { useEffect, useState } from "react";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  if (!cart || cart.length === 0) {
    return <div className="text-center mt-20 text-2xl text-gray-600">🛒 Your cart is empty!</div>;
  }

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div className="p-10 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">Your Cart</h1>

      {cart.map(item => (
        <div key={item.id} className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-md mb-4">
          <div className="flex items-center gap-6">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
            <div>
              <div className="text-xl font-semibold text-blue-800">{item.title}</div>
              <div className="text-lg text-gray-600">${item.price}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="px-3 py-1 bg-blue-200 rounded-full hover:bg-blue-400"
            >–</button>

            <span className="text-lg font-bold">{item.quantity}</span>

            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="px-3 py-1 bg-blue-200 rounded-full hover:bg-blue-400"
            >+</button>
          </div>

          <div className="text-xl font-bold text-blue-900">
            ${(Number(item.price) * item.quantity).toFixed(2)}
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-10 text-3xl font-bold text-blue-900">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
};
