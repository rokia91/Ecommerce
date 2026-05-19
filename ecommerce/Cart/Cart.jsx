import { useContext } from 'react';
import { cartContext } from '../../context/CartContext';
import LoaderScreen from './../../src/Components/LoaderScreen/LoaderScreen';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
  const { totalCartPrice, products, updateCount, removeItemFeomCart, clearCart , cartId } = useContext(cartContext);

  async function handleChangeCount(id, newCount) {
    const res = await updateCount(id, newCount);
    window.Swal.fire({
      title: res ? "Success!" : "Error!",
      text: res ? "Item updated successfully!" : "Failed to update item!",
      icon: res ? "success" : "error",
      toast: true,
      position: "bottom-end",
      timer: 5000,
      showConfirmButton: false,
    });
  }

  async function handleDelete(id) {
    const isSuccess = await removeItemFeomCart(id);
    window.Swal.fire({
      title: isSuccess ? "Success!" : "Error!",
      text: isSuccess ? "Item removed successfully!" : "Failed to remove item!",
      icon: isSuccess ? "success" : "error",
      toast: true,
      position: "bottom-end",
      timer: 5000,
      showConfirmButton: false,
    });
  }

  async function handleClearCart() {
    const isSuccess = await clearCart();
    window.Swal.fire({
      title: "",
      text: "Cart is empty",
      icon: "success",
      toast: true,
      position: "bottom-end",
      timer: 5000,
      showConfirmButton: false,
    });
  }

  if (!products) return <LoaderScreen />;

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-5">🛒 Shopping Cart</h1>

      {products?.length === 0 ? (
        <div className="text-center py-10">
          <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="Empty Cart" className="w-40 mx-auto mb-4" />
          <h2 className="text-xl text-gray-600 dark:text-gray-300">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-5">Start shopping now and add some amazing products!</p>
          <Link to="/" className="bg-cyan-700 text-white p-3 rounded-md shadow-md hover:bg-green-500 transition-all">Go to Shop</Link>
        </div>
      ) : ( 
        <>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Cart Price: <span className="text-cyan-600 dark:text-cyan-400">{totalCartPrice} EGP</span></h2>
          <button onClick={handleClearCart} className="bg-red-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-600 transition-all mt-3">Clear the Cart</button>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Quantity</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-4">
                      <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full rounded-md" alt={product.product.title} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.product.title}</td>
                    <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleChangeCount(product.product._id, product.count - 1)}><i className="fas fa-minus fa-2x p-1 text-lg  flex items-center justify-center text-dark-500 border border-green-500 rounded-full  hover:bg-cyan-600 active:bg-green-700 transition-all"></i>
                      </button>

                      <input
                        type="number"
                        value={product.count}
                        className="w-14 h-10 text-center border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        readOnly
                      />

                      <button
                        onClick={() => handleChangeCount(product.product._id, product.count + 1)}><i className="fas fa-plus fa-2x p-1 text-lg  flex items-center justify-center text-dark-500 border border-green-500 rounded-full  hover:bg-cyan-600 active:bg-green-700 transition-all"></i>
                      </button>
                      
                    </div>
                  </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.price} EGP</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(product.product._id)} className="text-red-600 dark:text-red-500 hover:underline">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link to="/order">
            <button className="bg-cyan-700 text-white text-lg font-semibold py-2 px-5 w-full mt-5 rounded-md shadow-md hover:bg-green-500 transition-all">Proceed to Checkout</button>
          </Link>

        </>
      )}
    </div>
  );
}
