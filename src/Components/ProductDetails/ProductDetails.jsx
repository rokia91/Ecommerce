import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import LoaderScreen from './../LoaderScreen/LoaderScreen';
import { cartContext } from '../../../context/CartContext';
import {useContext } from 'react'

export default function ProductDetails() {
    const {id} =useParams()
    const {addProoductToCart}=useContext(cartContext)
    function getProductDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const {data , isError, isLoading}=useQuery({
        queryKey:['productDetails' , id],
        queryFn: getProductDetails
    })


    async function handleAddToCart(){
        const res =await addProoductToCart(id)
        if(res){          
            window.Swal.fire({
                title: "Success!",
                text: "Item added successfully!",
                icon: "success",
                toast: true,
                position: "bottom-end",
                timer: 5000,
                showConfirmButton: false,
              });
            console.log("yes");
 
        }else{
            window.Swal.fire({
                title: "Error!",
                text: "Failed to add item!",
                icon: "error",
                toast: true,
                position: "bottom-end", 
                timer: 5000,
                showConfirmButton: false,
              });
            
            console.log("no");
            
            
        }
    }


    const productDtailsObj = data?.data.data
    if(isLoading){
        return <LoaderScreen/>
    }
    if(isError){
        return <h1>No Product Found !</h1>
    }

  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-screen flex items-center">
  <div className="container mx-auto p-5">
    <div className="grid sm:grid-cols-4 gap-5 items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="col-span-1">
        <img
          src={productDtailsObj.imageCover}
          alt={productDtailsObj.title}
          className="w-full rounded-lg shadow-md"
        />
      </div>

      <div className="col-span-3 space-y-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{productDtailsObj.title}</h1>
        <p className="text-gray-700 dark:text-gray-300">{productDtailsObj.description}</p>
        <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Price: ${productDtailsObj.price}</h5>
        <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Quantity: {productDtailsObj.quantity}</h5>

        <button
          onClick={handleAddToCart}
          className="bg-cyan-700 hover:bg-green-500 text-white py-2 w-full rounded-lg shadow-md transition-all duration-300"
        >
          + Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>

  )
}