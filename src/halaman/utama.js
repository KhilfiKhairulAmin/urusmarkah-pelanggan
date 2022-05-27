import { Outlet } from 'react-router-dom'
import { Link } from "react-router-dom";
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
            <label style={{ flexGrow: '1'}}></label>
            <Link to='/log_masuk'>
                <button>Log Masuk</button>
            </Link>
            <Link to='/daftar_masuk'>
                <button>Daftar Masuk</button>
            </Link>
        </span>
    )
}