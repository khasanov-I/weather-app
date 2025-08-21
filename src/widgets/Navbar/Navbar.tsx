import {Link, useLocation} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import './Navbar.css'
import { useStores } from '../../store/rootStore'

export const Navbar = observer(() => {
    const {userStore} = useStores()
    const location = useLocation()
    const links = [
        {
            href: '/',
            content: "На главную"
        },
        {
            href: '/weather',
            content: "Погода по городам"
        },
        {
            href: '/profile',
            content: "Профиль",
            authOnly: true
        },
    ]

    return <div className='navbar'>
        <div className='tabs'>
            {links.map(e => e.authOnly && !userStore.authorized ? undefined : <Link reloadDocument style={location.pathname === e.href ? {backgroundColor: "rgb(240, 240, 240)"} : undefined} 
                key={e.content} className='tab' to={e.href}>{e.content}</Link>)}
        </div>
        {!userStore.authorized ? <div className='tabs'>
            <Link reloadDocument style={location.pathname === '/login' ? {backgroundColor: "rgb(240, 240, 240)"} : undefined} className='tab' to='/login'>Авторизация</Link>
        </div> : undefined}
        {userStore.authorized ? <div className='tabs'><button className='logout-button' onClick={() => userStore.logout()}>Выйти</button></div> : undefined}
    </div>
})