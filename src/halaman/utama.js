import { Outlet } from 'react-router-dom'
import ButangNav from '../komponen/navigasi/butang/ButangNav';
import './Utama.css'

export default function Utama () {
    return (
        <>
            <Pengepala />
            <Outlet />
        </>
    )
}

function Pengepala () {
    return (
        <span className='Pengepala'>
            <label>Urusmarkah</label>
            <label></label>
            <ButangNav to='/pengesahan/log_masuk' buttonText='Log Masuk' />
            <ButangNav to='/pengesahan/daftar_masuk' buttonText='Daftar Masuk' />
        </span>
    )
}