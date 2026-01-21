'use client';

import Input from '../components/Input'
import { useState, useCallback } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Auth = () => {
   const router = useRouter();
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [variant, setVariant] = useState('login');

   const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
   },[])

   const login = useCallback(async() => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        console.log('Login error:', result.error);
        return;
      } 
      
      if (result?.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (error: any) {
      console.log('Login error:', error);
    }
   }, [email, password, router])
   
   const register = useCallback(async() => {
      try {
        const response = await axios.post('/api/register', {
          email,
          username,
          password,
        });
        
        if (response.status === 200) {
          // Тіркелгеннен кейін автоматикалық кіру
          const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
          });
          
          if (result?.ok) {
            setVariant('login');
            setEmail('');
            setPassword('');
            setUsername('');
            router.push('/');
            router.refresh();
          }
        }
      }catch (error: any) {
        console.log('Register error:', error);
      }
   }, [email, username, password, router])

    return(
      <div className="relative w-full h-screen bg-black">
        <div className="bg-black w-full h-full">
           <nav className='px-12 py-5'>
             <h2 className='text-4xl text-red-500 font-bold'>NETFLIX</h2>
           </nav>

           <div className='flex justify-center'> 
              <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md w-full rounded-lg'>
                <h2 className='text-white text-4xl mb-8 font-semibold'>{variant === 'login' ? 'Sign in' : 'Register'}</h2>
                <div className='flex flex-col gap-4'>
                   {variant === 'register' && (
                     <Input 
                      id="username"
                      label="Username"
                      type="username"
                      onChange={(e: any) => setUsername(e.target.value)}
                      value={username}
                   />
                   )}
                   
                   <Input 
                    id="email"
                    label="Email"
                    type="email"
                    onChange={(e: any) => setEmail(e.target.value)}
                    value={email}
                    autoComplete="off"
                   />
                   <Input 
                    id="password"
                    label="Password"
                    type="password"
                    onChange={(e: any) => setPassword(e.target.value)}
                    value={password}
                    autoComplete="new-password"
                   />
                </div>

                <button onClick={variant === 'login' ? login : register} className='bg-red-600 text-white py-3 text-sm font-medium w-full rounded-md hover:bg-red-700 mt-6'>
                  {variant === 'login' ? 'login' : 'Sign up'}
                </button>

                <div className='flex flex-row items-center justify-center gap-4 mt-6'>
                  <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
                    <FcGoogle size={20} />
                  </div>
                  <div className='w-10 h-10 bg-white text-black rounded-full flex items-center justify-center'>
                    <FaGithub size={20} />
                  </div>
                </div>

                <p className='text-neutral-500 mt-12 pl-4'>
                 {variant === 'login' ? 'First time using Netflix?' : 'Already have an account'}
                  <span 
                  onClick={toggleVariant} 
                  className='text-white ml-1 hover:underline cursor-pointer '>
                     {variant === 'login' ? 'Create an account' : 'login'}
                  </span>
                </p>
              </div>
           </div>
        </div>
      </div>
    );
}

export default Auth;