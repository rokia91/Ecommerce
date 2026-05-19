import axios from 'axios'
import React, { createContext, useContext , useState ,useEffect} from 'react'
import { authContext } from './AuthContext'


export const cartContext=createContext()

export default function CartContextProvider({ children }) {
    const {usertoken}=useContext(authContext)

    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [totalCartPrice, settotalCartPrice] = useState(0)
    const [products, setproducts] = useState(null)
    const [cartId, setCartId] = useState(null)

    function resetValues(){
        settotalCartPrice(0)
        setproducts(null)
        setCartId(null)
        getUserCart()
    }
    console.log('cartid',cartId)
    console.log('usertoken',usertoken)

    

    function getUserCart(){
        axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{token: usertoken}
        })
        .then(function(resp){
            setnumOfCartItems(resp.data.numOfCartItems)
            settotalCartPrice(resp.data.data.totalCartPrice)
            setproducts(resp.data.data.products)
            setCartId(resp.data.cartId)
            
        })
        .catch(function(err){
            console.log(err);
            
        })

    }

    async function updateCount(id,newCount){
        const res =await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            "count": newCount
        },
        {
            headers:{
                token: usertoken
            }
        }
    )
    .then(function(resp){
        setnumOfCartItems(resp.data.numOfCartItems)
        settotalCartPrice(resp.data.data.totalCartPrice)
        setproducts(resp.data.data.products)
        return true
    })
    .catch(function(err){
        console.log('err',err)
        return false
    })
    return res
    }


    async function addProoductToCart(id){
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId: id,
        },
        {
            headers: {token: usertoken}
        })
        .then(function(res){
            setCartId(res.data.cartId)

            getUserCart()

            return true
            
        })
        .catch(function(err){
            console.log('err',err);
            return false
            
        })
        return res
    }
   
   
    async function removeItemFeomCart(id){
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
            headers:{token: usertoken}
        })
        .then(function(resp){
            setnumOfCartItems(resp.data.numOfCartItems)
            settotalCartPrice(resp.data.data.totalCartPrice)
            setproducts(resp.data.data.products)
            return true
            
        }).catch(function(err){
            console.log('err',err);
            return false
        })
        return res
    }

    async function clearCart() {
        const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart' ,{
            headers:{token: usertoken}
        })
        .then(function(resp){
            setnumOfCartItems('0')
            settotalCartPrice('0')
            setproducts(null)
            console.log(resp.data);
            
            return true
            
        }).catch(function(err){
            console.log('err',err);
            return false
        })
        return res
    }
    
    

    useEffect(() => {
      if(usertoken){
        getUserCart()
      }
    }, [usertoken])
    

  return (
    <cartContext.Provider value={{
        addProoductToCart,
        numOfCartItems,
        totalCartPrice,
        products,
        updateCount,
        removeItemFeomCart,
        clearCart,
        cartId,
        resetValues
    }}>
        {children}
        </cartContext.Provider>
  )
}
