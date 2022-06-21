import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../komponen/identiti/Logo";

export default function PengepalaPengesahan () {

    const nav = useNavigate();
    const { pathname} = useLocation();

    // Pengendali URL
    let logMasuk;
    let daftarMasuk;
    let tukar, teks;

    if (pathname === '/pengesahan/log_masuk' || pathname === '/pengesahan/daftar_masuk') {
        logMasuk = '/pengesahan/log_masuk';
        daftarMasuk = '/pengesahan/daftar_masuk';
        tukar = '/pengesahan/daftar_masuk_peserta'
        teks = 'Peserta'
    }
    else {
        logMasuk = '/pengesahan/log_masuk_peserta';
        daftarMasuk = '/pengesahan/daftar_masuk_peserta';
        tukar = '/pengesahan/daftar_masuk'
        teks = 'Pengelola'
    }

    useEffect(() => {
        const ujiPengesahan = async () => {
            // Mendapatkan refresh token
            const token = localStorage.getItem('token');

            // Menvigasi ke laman utama jika pengguna telah log masuk
            if (!token) {
                const session = localStorage.getItem('session');

                if (!session) return;

                const res = await fetch('http://localhost:5000/api/v1/peserta', {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${session}`
                    }
                });

                if (res.status === 200) {
                    nav('/markah');
                }

                return;
            };
            
            const res = await fetch('http://localhost:5000/api/v1/pengelola', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                nav('/urusmarkah');
            }

            return;
        }

        ujiPengesahan();
    }, [nav]);

    return (
        <>
        <span className="Pengepala" style={{
            'borderBottom':'0px'
        }}>
            <Logo />
        </span>
        <Outlet />
        <br></br>

        <Link to={daftarMasuk}>
            Daftar Masuk
        </Link>
        <label> | </label>
        <Link to={logMasuk}>
            Log Masuk
        </Link>
        <br />
        <Link to={tukar}>Akaun {teks}</Link>
        </>
    )
}