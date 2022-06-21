import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

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

    return (
        <>
            <form onSubmit={hantarBorang}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '1rem',
                    marginRight: '70%'
                }}>

                    <h3 style={{ alignSelf: 'center'}}>Daftar Akaun Baharu</h3>

                    { /* Borang Pendaftaran Pengelola */ }
                    Emel <input type='email' value={emel} onChange={(e) => setEmel(e.target.value)}></input><br />
                    Nama Akaun <input type='text' value={namaAkaun} onChange={(e) => setNamaAkaun(e.target.value)}></input><br />
                    Nama Penuh <input type='text' value={namaPenuh} onChange={(e) => setNamaPenuh(e.target.value)} ></input><br />
                    Katalaluan <input type='password' value={katalaluan} onChange={(e) => setKatalaluan(e.target.value)}></input><br />
                    <input type='submit' value='Submit' style={{
                        alignSelf: 'flex-end'
                    }}/>

                </div>
            </form>
        </>
    )
}