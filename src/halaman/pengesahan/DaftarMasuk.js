import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import GambarPapanSkor from '../../gambar/Profil.webp'

export default function DaftarMasuk () {

    // Menyimpan maklumat pengelola
    const [ emel, setEmel ] = useState('');
    const [ namaAkaun, setNamaAkaun ] = useState('');
    const [ namaPenuh, setNamaPenuh ] = useState('');
    const [ katalaluan, setKatalaluan ] = useState('');

    // Menyimpan keadaan borang
    const [ hantar, setHantar ] = useState(false);

    // Fungsi untuk routing
    const nav = useNavigate();

    // Persediaan menghantar borang
    const hantarBorang = (e) => {
        e.preventDefault();
        setHantar(true);
    }

    // Menghantar borang dan mengawal pergerakan aplikasi
    useEffect(() => { 

        if (!hantar) return;

        const pengelola = {
            emel,
            namaAkaun,
            namaPenuh,
            katalaluan
        };

        const daftarPengguna = async () => {

            // Mendaftarkan pengguna
            const daftar = await fetch('http://localhost:5000/api/v1/pengelola/daftar', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(pengelola)
            });

            const res = await daftar.json();

            // Pendaftaran gagal 
            if (daftar.status >= 400) {
                setHantar(false);
                return;
            }

            // Pendaftaran berjaya 
            // Mendapatkan kembali token & refresh token
            const { token, refreshToken } = res;

            // Menyimpan nilai token dan refresh token dalam Local Storage
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);

            // Navigasi ke laman utama pengguna
            nav(`/urusmarkah`);
        }

        daftarPengguna();

    }, [emel, katalaluan, namaAkaun, hantar, nav, namaPenuh])

    const input = "w3-input w3-border w3-round-xlarge";

    return (
        <>
        <tr>
            <td style={{
                width: '30%',
                verticalAlign: 'middle'
            }}>
            <form onSubmit={hantarBorang} className="w3-container w3-text-deep-orange w3-large">
                <div className="w3-serif">

                    <h2 style={{
                        fontWeight: 'bold',
                        alignSelf: 'center'
                    }} className="w3-serif">Daftar Akaun</h2>

                    { /* Borang Pendaftaran Pengelola */ }
                    {/* Emel mesti mempunyai huruf '@' */}
                    <label className="w3-large">Emel</label> <input className={input} type='email' value={emel} onChange={(e) => setEmel(e.target.value)}></input><br />
                    {/* Nama Akaun tidak boleh melebihi 40 huruf */}
                    <label className="w3-large">Nama Akaun</label> <input className={input} type='text' value={namaAkaun} onChange={(e) => setNamaAkaun(e.target.value)}></input><br />
                    {/* Nama Penuh tidak boleh melebihi 255 huruf */}
                    <label className="w3-large">Nama Penuh</label> <input className={input} type='text' value={namaPenuh} onChange={(e) => setNamaPenuh(e.target.value)} ></input><br />
                    {/* Katalaluan tidak boleh kosong */}
                    <label className="w3-large">Katalaluan</label> <input className={input} type='password' value={katalaluan} onChange={(e) => setKatalaluan(e.target.value)}></input><br />
                    <input className="w3-round w3-button w3-deep-orange w3-hover-green" type='submit' value='Hantar' style={{
                        alignSelf: 'flex-end'
                    }}/>

                    {/* Navigasi ke laman log masuk */}
                    <Link className="" to={'/pengesahan/log_masuk'}>
                        Sudah mempunyai akaun?
                    </Link>

                </div>
            </form>
            </td>
            <td>
                <img style={{
                    maxWidth: '100%',
                    maxHeight: '100%'
                }} src={GambarPapanSkor} alt='Gambar Papan Skor' className="w3-image"></img>
            </td>
        </tr>
        </>
    )
}