import { signOut } from "next-auth/react";
import { FC } from "react";
import { User } from "lucide-react";

interface AccountMenuProps {
    visible?: boolean;
}

const Account: FC<AccountMenuProps> = ({ visible}) => {

    if (!visible) return null;
        
    return (
      <div className='bg-black w-56 absolute top-14 rounded-md right-0 py-5 flex-col border-2 border-gray-800'>
        <div className='flex flex-col gap-3'>
           <div className='px-3 group/item flex flex-row items-center w-full'>
            <User size={24} className='text-white fill-white' />
            <p className="flex flex-row items-center gap-3 ml-2 text-white text-sm hover:underline cursor-pointer">User name</p>
           </div>
        </div>
      </div>
    );
}

export default Account;