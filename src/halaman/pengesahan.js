import { Link, Outlet } from "react-router-dom";

export default function Pengesahan () {
    return (
        <>
        Pengesahan aplikasi
        <Outlet />
        <br></br>

        <Link to='/pengesahan/daftar_masuk'>
            Daftar Masuk
        </Link>
        <label> | </label>
        <Link to='/pengesahan/log_masuk'>
            Log Masuk
        </Link>
        </>
    )
}