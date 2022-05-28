import { Link, Outlet } from "react-router-dom";
import Logo from "../komponen/identiti/Logo";

export default function Pengesahan () {
    return (
        <>
        <Logo />
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