import { Link, Outlet } from "react-router-dom";
import PengepalaUtamaPeserta from "./PengepalaUtamaPeserta";

export default function PengepalaPeserta () {
    return (
        <>
            <Link to='/peserta/papan_pemuka'>Profil</Link> | <Link to='/peserta/kemas_kini'>Kemas Kini</Link> | <Link to='/peserta/log_keluar_peserta'>Log Keluar</Link>
            <br />
            <Outlet />
        </>
    )
}