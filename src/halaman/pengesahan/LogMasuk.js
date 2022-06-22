import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import GambarCatur from '../../gambar/Pertandingan Promo Pengesahan.jpeg'

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
                const { ralat, mesej } = res;
                setMesej(`${ralat}: ${mesej}`);
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
        
    }, [emel, katalaluan, hantar, nav]);

    const input = "w3-input w3-border w3-round-xlarge";

    return (
        <>
            <tr>
                <td style={{
                    'width':'30%',
                    'verticalAlign':'middle'
                }}>
                <form onSubmit={hantarBorang} className="w3-container w3-text-deep-orange w3-large">
                    <h2 className="w3-serif" style={{
                        'fontWeight':'bold'
                    }}>Log Masuk<label style={{
                        fontFamily: 'BlackJack'
                    }}></label></h2>
                    <div className="w3-serif">
                    { /* Borang Log Masuk */ }
                    <label className="w3-large">Emel: </label><br /><input className={input} type='email' value={emel} onChange={(e) => setEmel(e.target.value)} /><br />
                    <label className="w3-large">Katalaluan: </label><br /><input className={input} type='password' value={katalaluan} onChange={(e) => setKatalaluan(e.target.value)} /><br />
                    <input className="w3-round w3-button w3-deep-orange w3-hover-green" type='submit' value='Hantar' />
                    <label> </label>
                    <Link className="" to={'/pengesahan/daftar_masuk'}>
                        Daftar Akaun Baharu
                    </Link>
                    <br />
                    {mesej}
                    </div>
                </form>
                </td>
                <td style={{
                    maxWidth: '100%',
                    maxHeight: '100%'
                }}>
                    <img src={GambarCatur} alt='Pertandingan Catur' style={{
                        verticalAlign: 'middle'
                    }} className='w3-image' />
                </td>
            </tr>
        </>
    )
}