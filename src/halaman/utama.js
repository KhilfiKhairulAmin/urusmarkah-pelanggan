import { Link, Outlet } from 'react-router-dom'
import ButangNav from '../komponen/navigasi/butang/ButangNav';
import './Utama.css'
import logo from '../gambar/Logo Urusmarkah.png'

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
            <Link to='/'><label style={{ color: 'orangered' }}>urusmarkah</label></Link>
            {/* <Link to='/'><img height={50} src={logo} alt={'Logo Urusmarkah'}></img></Link> */}
            <label></label>
            <ButangNav to='/pengesahan/log_masuk' buttonText='Log Masuk' />
            <ButangNav to='/pengesahan/daftar_masuk' buttonText='Daftar Masuk' />
        </span>
    )
}