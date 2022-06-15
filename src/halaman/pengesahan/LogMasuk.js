import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function LogMasuk () {

    // Menyimpan maklumat borang
    const [ emel, setEmel ] = useState('');
    const [ katalaluan, setKatalaluan ] = useState('');

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

        const pengelola = {
            emel,
            katalaluan
        }

        const logMasuk = async () => {
            // Memesan log masuk pengguna
            const log = await fetch( 'http://localhost:5000/api/v1/pengelola/log_masuk', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(pengelola)
            });

            const res = await log.json();
            
            // Log masuk tidak berjaya
            if (log.status >= 400) {
                const { nama, mesej } = res;
                setMesej(`${nama}: ${mesej}`);
                setHantar(false);
                return;
            }

            // Log masuk berjaya
            // Mendapatkan kembali token & refresh token
            const { token, refreshToken } = res;

            // Menyimpan nilai token dan refresh token dalam Local Storage
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);

            // Navigasi ke laman utama pengguna
            nav('/urusmarkah');
        }

        logMasuk();
        
    }, [emel, katalaluan, hantar, nav])

    return (
        <>
            <h2>Log Masuk</h2>
            <form onSubmit={hantarBorang}>

                { /* Borang Log Masuk */ }
                Emel <br /><input type='email' value={emel} onChange={(e) => setEmel(e.target.value)} /><br />
                Kata laluan <br /><input type='password' value={katalaluan} onChange={(e) => setKatalaluan(e.target.value)} /><br />
                <input type='submit' value='Hantar' /><br />
                {mesej}
            </form>
        </>
    )
}