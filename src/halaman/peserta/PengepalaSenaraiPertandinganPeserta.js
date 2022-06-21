import { Link, Outlet } from "react-router-dom";

export default function PengepalaSenaraiPertandinganPeserta () {

    return (
        <>
            <Link to='/markah/pertandingan'>Pertandingan Anda</Link><label> | </label> 
            <Link to='/markah/terkini'>Sertai Pertandingan</Link>
            <Outlet />
        </>
    )
}