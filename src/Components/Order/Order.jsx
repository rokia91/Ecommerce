import axios from 'axios'
import { useContext } from 'react';
import { cartContext } from '../../../context/CartContext';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';


export default function Order() {
    
    const {cartId , resetValues} = useContext(cartContext)
    const navigate = useNavigate()
    const formikObj =useFormik({
        initialValues:{
            details: "",
            phone: "",
            city: ""
            },
        onSubmit : createCasOrder
    })

   function createCasOrder(values){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
        shippingAddress: values
    },{
        headers:{
            token : localStorage.getItem('tkn')
        }
    })
    .then(function(resp){
        if(resp.data.status === 'success'){
            window.Swal.fire({
                title: "",
                text: "Order successfully created!",
                icon: "success",
                toast: true,
                position: "bottom-end",
                timer: 5000,
                showConfirmButton: false,
            });
            
            setTimeout(() => {
                navigate('/allorders') 
            }, 2000);

            resetValues();
        }
    })
    .catch(function(err){
        console.log('err', err);
    })
}

function checkout(cartId){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
      "shippingAddress":{
        "details": "details",
        "phone": "01010700999",
        "city": "Cairo"
        }
    },{
      headers:{
        token: localStorage.getItem('tkn')
      },
      params:{
        url: "http://localhost:5174"
      }
    }).then(({data})=>{
      location.href=data.session.url 

    })
  }

  return (
    <div id='hero' className='min-h-screen dark:bg-gray-900 flex items-center justify-center p-5'>
        <div className=' bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md'>
        <form onSubmit={formikObj.handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
            <input onChange={formikObj.handleChange} value={formikObj.values.details} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
            <input onChange={formikObj.handleChange} value={formikObj.values.phone} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
            <input onChange={formikObj.handleChange} value={formikObj.values.city} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <button type="submit" className="me-4 text-white bg-cyan-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3">pay cash</button>
       
       
       
        <button onClick={()=> checkout(cartId)} type="submit" className="text-white bg-cyan-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">pay online</button>
       
       
        </form>
        </div>
        

        

    </div>

  )
}
