import Link from 'next/link'
import { AiFillHome } from 'react-icons/ai'
import { FaUpload, FaUser } from 'react-icons/fa'
import { useRouter } from "next/router";


const Sidebar = () => {
    const router = useRouter();

    const sidebarItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <AiFillHome size={25} />,
        },
        {
            name: "Stream Now",
            href: "/livestream",
            icon: <FaUpload size={25} />,
        },
        {
            name: "My Channel",
            href: "/",
            icon: <FaUser size={25} />
        }
    ];
    return (
        <aside id="logo-sidebar" class="fixed top-0 left-0 z-0 w-64 h-screen pt-16 transition-transform -translate-x-full sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 pt-4 mt-1 overflow-y-auto bg-backgroundPaper dark:bg-gray-800">
                {sidebarItems.map((item) => item.href === router.pathname ? (
                    <div key={item.href} className="flex cursor-pointer duration-200 tracking-wider font-medium font-display ease-out items-center px-4 py-2   w-full text-violet-100  gap-3">
                        {item.icon}
                        {item.name}
                    </div>
                ) : <Link href={item.href} key={item.href}>
                    <div className="flex duration-200 font-medium tracking-wider group font-display ease-out items-center px-4 py-2  w-full text-slate-500 hover:bg-gray-800 hover:text-violet-100  gap-3">
                        {item.icon}
                        {item.name}
                    </div>
                </Link>)}
            </div>
        </aside>
    )
}

export default Sidebar;