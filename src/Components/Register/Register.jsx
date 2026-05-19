import axios from 'axios'
import {  useFormik } from 'formik'
import { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';



export default function Register() {
    const [errorMessage, seterrorMessage] = useState(null)
    const [isSucess, setisSuccess] = useState(false)
    const [isClicked, setisClicked] = useState(false)
    const navigate = useNavigate()
    
    
    let user={
        name:'',
        email:'',
        password:'',
        rePassword:'',
        phone:''
    }

    async function registerUser(values){
        setisClicked(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
        .then(function(){
            setisSuccess(true)
            setisClicked(false)
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        }).catch(function(x){
            seterrorMessage(x.response.data.message)
            setisClicked(false)
            setTimeout(() => {
                seterrorMessage(null)
            }, 2000);
        })
        
    }

    
    const registerFormik = useFormik({
        initialValues:user,
        onSubmit: registerUser,
        validate:function(allData){
            const errors ={}
            const nameRegex =/^[A-Z][a-z]{2,20}$/
            const phoneRegex =/^(20)?01[0125][0-9]{8}$/
            if(!nameRegex.test(allData.name)){
                errors.name="Name must start with a capital letter and be between 5 and 9 letters"
            }
            if(!phoneRegex.test(allData.phone)){
                errors.phone="phone must be egyptiaon"
            }
            if(allData.email.includes('@')==false || allData.email.includes('.')== false){
                errors.email="invalid email"
            }
            if(allData.password.length < 6 || allData.password.length > 12){
                errors.password="password must be from 6 to 12"
            }
            if(allData.rePassword !== allData.password){
                errors.rePassword="password and re pass not match"
            }
            return errors
        }
    },)


  return (
       <div id='hero' className=' min-h-screen dark:bg-gray-900 flex items-center justify-center p-5'>
         <div className=' bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md'>
        {isSucess ? <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-green-900 dark:text-green-400 dark:border-green-800" role="alert">
        <span className="sr-only">Info</span>
            <span>Congratulations!!</span>
        </div> : ''}

        {errorMessage ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
        <span className="sr-only">Info</span>
            {errorMessage}
        </div> : ''}
        <h2 className='text-center dark:text-white bg-cyan-600 p-3 rounded-md m-5 text-white'>Register Now</h2>
        <form className="max-w-md mx-auto " onSubmit={registerFormik.handleSubmit}>
  
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" value={registerFormik.values.name} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User name</label>
      {registerFormik.errors.name && registerFormik.touched.name ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
  
  <span className="sr-only">Info</span>
  <div>
        {registerFormik.errors.name }
  </div>
</div> : '' }

  </div>
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" value={registerFormik.values.email}  onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
     {registerFormik.errors.email && registerFormik.touched.email ?  <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
  
  <span className="sr-only">Info</span>
  <div>
  {registerFormik.errors.email}
  </div>
</div> : ""}
  </div>
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" value={registerFormik.values.password} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      {registerFormik.errors.password && registerFormik.touched.password ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
  
  <span className="sr-only">Info</span>
  <div>
  {registerFormik.errors.password }
  </div>
</div> : ""}
  </div>

  
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" value={registerFormik.values.rePassword} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
     {registerFormik.errors.rePassword && registerFormik.touched.rePassword ?  <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
  
  <span className="sr-only">Info</span>
  <div>
  {registerFormik.errors.rePassword }
  </div>
</div> : ''}
  </div>
  
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" value={registerFormik.values.phone} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
      { registerFormik.errors.phone && registerFormik.touched.phone ?  <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
  
  <span className="sr-only">Info</span>
  <div>
  {registerFormik.errors.phone }
  </div>
</div> : ""}
  </div>
  
  
  <button type="submit" className="text-white bg-cyan-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800">
    { !isClicked ? 'Submit' : <Oval
  visible={true}
  height="30"
  width="30"
  color="#4fa94d"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />}
 </button>
</form>
    </div>
       </div>
  )
}
