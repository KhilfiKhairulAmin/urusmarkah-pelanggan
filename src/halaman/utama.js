import { Outlet } from 'react-router-dom'
import Pengepala from '../navigasi/butang/pengepala'

export default function Utama () {
    return (
        <>
            <Pengepala />
            <Outlet />
        </>
    )
}