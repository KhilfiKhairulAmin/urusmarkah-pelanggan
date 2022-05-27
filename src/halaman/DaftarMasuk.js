import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function DaftarMasuk () {

    // Menyimpan maklumat borang
    const [ emel, setEmel ] = useState('');
    const [ nama, setNama ] = useState('');
    const [ kataLaluan, setKataLaluan ] = useState('');

    // Menyimpan keadaan borang
    const [ hantar, setHantar ] = useState(false);

    // Fungsi untuk routing
    const nav = useNavigate();

    const hantarBorang = (e) => {
        e.preventDefault();
        setHantar(true);
    }

    useEffect(() => {

        if (!hantar) return;

        const maklumatDaftarMasuk = {
            emel: emel,
            nama: nama,
            kata_laluan: kataLaluan
        };

        const daftarPengguna = async () => {
            // Memesan pendaftaran pengguna
            const data = await fetch('http://localhost:5000/pengesahan/daftar', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(maklumatDaftarMasuk)
            })

            // Pendaftaran gagal 
            if (data.status !== 201) {
                setHantar(false);
                return;
            }

            // Pendaftaran berjaya 
            // Mendapatkan kembali token & refresh token
            const tokenPengesahan = await data.json();

            // Menyimpan nilai token dan refresh token dalam Local Storage
            localStorage.setItem('token', tokenPengesahan.token);
            localStorage.setItem('refreshToken', tokenPengesahan.refreshToken);

            // Navigasi ke laman utama pengguna
            nav(`/pertandingan`);
        }

        daftarPengguna();

    }, [emel, kataLaluan, nama, hantar, nav])

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
                    Emel <input type='email' value={emel} onChange={(event) => setEmel(event.target.value)}></input><br />
                    Nama <input type='text' value={nama} onChange={(event) => setNama(event.target.value)}></input><br />
                    Kata laluan <input type='password' value={kataLaluan} onChange={(event) => setKataLaluan(event.target.value)}></input><br />
                    <input type='submit' value='Submit' style={{
                        alignSelf: 'flex-end'
                    }}/>
                </div>
            </form>
        </>
    )
}