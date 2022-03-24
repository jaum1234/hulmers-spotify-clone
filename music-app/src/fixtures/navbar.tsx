import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai"
import { RiAccountCircleLine } from "react-icons/ri"
import { MdCreateNewFolder } from 'react-icons/md'


export const navbar = {
    items: [
        {
            id: 1,
            href: '/',
            label: 'Home',
            icon: <AiOutlineHome/>
        },
        {
            id: 2,
            href: '/search',
            label: 'search',
            icon: <AiOutlineSearch/>
        },
        {
            id: 3,
            href: '/profile',
            label: 'Profile',
            icon: <RiAccountCircleLine/>
        },
    ]
}