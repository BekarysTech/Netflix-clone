import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import Navbar from './components/Navbar';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

  return (
    <div className="min-h-screen bg-black">

      <Navbar />
       {/* <h1 className='text-4xl text-green-500' >Netflix Clone</h1>
        <p className='text-white text-xl mt-4'>Logined: {session.user?.name}</p>
        <SignOutButton /> */}
    </div>
  );
}
