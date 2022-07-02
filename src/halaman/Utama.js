import { Link, Outlet } from 'react-router-dom'
import Logo from '../komponen/identiti/Logo';
import './Utama.css';
import 'w3-css/w3.css';

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
    const butang = 'w3-hover-blue-gray w3-button w3-deep-orange w3-round w3-medium'

    return (
        <span className='Pengepala'>
            <Logo />
            <label></label>
            <Link style={{
                'marginRight':'4px'
            }} to={'/pengesahan/log_masuk'} >
            <button className={butang}>Log Masuk</button>
            </Link>
            <Link to={'/pengesahan/daftar_masuk'} >
            <button className={butang}>Daftar Akaun</button>
            </Link>
        </span>
    )
}
