import { Link, Outlet } from 'react-router-dom'
import Logo from '../komponen/identiti/Logo';
import ButangNav from '../komponen/navigasi/butang/ButangNav';
import './Utama.css'

// Tetapkan struktur halaman utama di sini
export default function Utama () {
    return (
        <>
            <Pengepala />
            <Outlet />
        </>
    )
}

// Komponen pengepala digunakan untuk tujuan navigasi
function Pengepala () {
    return (
        <span className='Pengepala'>
            <Logo />
            <label></label>
            <ButangNav to='/pengesahan/log_masuk' buttonText='Log Masuk' />
            <ButangNav to='/pengesahan/daftar_masuk' buttonText='Daftar Masuk' />
        </span>
    )
}