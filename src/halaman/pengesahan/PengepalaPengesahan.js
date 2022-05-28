import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../komponen/identiti/Logo";

export default function PengepalaPengesahan () {

    const nav = useNavigate();

    useEffect(() => {
        const ujiPengesahan = async () => {
            // Mendapatkan refresh token
            const token = localStorage.getItem('token');

            // Menvigasi ke laman utama jika pengguna telah log masuk
            if (!token) return;
            
            const res = await fetch('http://localhost:5000/api/v1/pengguna/validasi', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (res.status >= 400) {
                return;
            }
            
            nav('/urusmarkah');
        }

        ujiPengesahan();
    }, [nav]);

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