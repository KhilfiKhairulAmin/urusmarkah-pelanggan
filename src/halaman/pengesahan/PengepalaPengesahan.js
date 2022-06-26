import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../komponen/identiti/Logo";

export default function PengepalaPengesahan () {

    const nav = useNavigate();
    const { pathname} = useLocation();

    // Pengendali URL
    let logMasuk;
    let daftarMasuk;
    let tukar, teks, teksS;

    if (pathname === '/pengesahan/log_masuk' || pathname === '/pengesahan/daftar_masuk') {
        logMasuk = '/pengesahan/log_masuk';
        daftarMasuk = '/pengesahan/daftar_masuk';

        if (pathname === '/pengesahan/log_masuk') tukar = '/pengesahan/log_masuk_peserta'
        else tukar = '/pengesahan/daftar_masuk_peserta'

        teksS = 'Pengelola';
        teks = 'Peserta'
    }
    else {
        logMasuk = '/pengesahan/log_masuk_peserta';
        daftarMasuk = '/pengesahan/daftar_masuk_peserta';

        if (pathname === '/pengesahan/log_masuk_peserta') tukar = '/pengesahan/log_masuk'
        else tukar = '/pengesahan/daftar_masuk'

        teksS = 'Peserta'
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
                    nav('/markah/pertandingan');
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

    const butang = 'w3-hover-blue-gray w3-button w3-deep-orange w3-round w3-medium'

    return (
        <>
        <span className="Pengepala" style={{
            'borderBottom':'0px',
            flexGrow: 1
        }}>
        <Logo jenis={teksS} />
        <label></label>
        <div >
        {/* <Link style={{
            marginRight: '4px'
        }}  to={daftarMasuk}>
            <button className={butang}>Daftar Masuk</button>
        </Link>
        <Link style={{
            marginRight: '4px'
        }} to={logMasuk}>
            <button className={butang}>Log Masuk</button>
        </Link> */}
        <Link style={{
            marginRight: '4px'
        }} to={tukar}>
            <button className={butang}>Ke Akaun {teks}</button>
        </Link>
        </div>
        </span>
        <br />
        <Outlet />
        <br></br>
        </>
    )
}