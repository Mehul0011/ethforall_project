import Link from 'next/link'
import { AiFillHome } from 'react-icons/ai'
import { FaUpload, FaUser } from 'react-icons/fa'

export default function Sidebar() {
    return(
        <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2">
                <li>
                    <Link href="/" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <AiFillHome size={25}/>
                        <span class="ml-3">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaUpload size={25}/>
                        <span class="flex-1 ml-3 whitespace-nowrap">Mint NFT</span>
                    </Link>
                </li>
                <li>
                    <Link href="/" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaUser size={25}/>
                        <span class="flex-1 ml-3 whitespace-nowrap">My Channel</span>
                    </Link>
                </li>
            </ul>
        </div>
    </aside>
    )
}