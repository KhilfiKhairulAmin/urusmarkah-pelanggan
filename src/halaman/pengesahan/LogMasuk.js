import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function LogMasuk () {

    // Menyimpan maklumat borang
    const [ emel, setEmel ] = useState('');
    const [ kataLaluan, setKataLaluan ] = useState('');

    // Menyimpan keadaan borang
    const [ hantar, setHantar ] = useState(false);
    
    // Meyediakan respons kepada pengguna
    const [ mesej, setMesej ] = useState('');

    // Fungsi untuk routing
    const nav = useNavigate();

    const hantarBorang = (e) => {
        e.preventDefault();
        setHantar(true);
    }

    useEffect(() => {

        if(!hantar) return;

        const maklumatLogMasuk = {
            emel: emel,
            kata_laluan: kataLaluan
        }

        const logMasuk = async () => {
            // Memesan log masuk pengguna
            const res = await fetch( 'http://localhost:5000/api/v1/pengguna/log_masuk', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(maklumatLogMasuk)
            });
            
            // Log masuk tidak berjaya
            if (res.status >= 400) {
                setMesej("Emel atau kata laluan anda tidak benar");
                setHantar(false);
                return;
            }

            // Log masuk berjaya
            // Mendapatkan kembali token & refresh token
            const tokenPengesahan = await res.json();

            // Menyimpan nilai token dan refresh token dalam Local Storage
            localStorage.setItem('token', tokenPengesahan.token);
            localStorage.setItem('refreshToken', tokenPengesahan.refreshToken);

            // Navigasi ke laman utama pengguna
            nav('/pertandingan');
        }

        logMasuk();
        
    }, [emel, kataLaluan, hantar, nav])

    // Menvigasi ke laman utama jika pengguna telah log masuk
    if (localStorage.getItem('token')) {
        nav('/pengesahan');
        return;
    }
    
    return (
        <>
            <h2>Log Masuk</h2>
            <form onSubmit={hantarBorang}>
                Emel<br /><input type='email' value={emel} onChange={(event) => setEmel(event.target.value)} /><br />
                Kata laluan<br /><input type='password' value={kataLaluan} onChange={(event) => setKataLaluan(event.target.value)} /><br />
                <input type='submit' value='Hantar' /><br />
                {mesej}
            </form>
        </>
    )
}