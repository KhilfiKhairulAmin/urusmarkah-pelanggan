import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function LogMasuk () {

    const [ emel, setEmel ] = useState('');
    const [ kataLaluan, setKataLaluan ] = useState('');
    const [ sudahHantar, setSudahHantar ] = useState(false)
    const [ mesej, setMesej ] = useState("");
    const navigate = useNavigate();

    const hantar = (e) => {
        e.preventDefault();
        setSudahHantar(true);
    }

    useEffect(() => {

        if(!sudahHantar) return;

        const maklumat_pengguna = {
            emel: emel,
            kata_laluan: kataLaluan
        }

        const logMasuk = async () => {
            const res = await fetch('http://localhost:5000/pengesahan/log_masuk', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(maklumat_pengguna)
            });
            
            if (res.status !== 200) {
                setMesej("Emel atau kata laluan anda tidak benar");
                setSudahHantar(false);
                return;
            }

            const credentials = await res.json();

            localStorage.setItem('token', credentials.token);
            localStorage.setItem('refreshToken', credentials.refreshToken);

            navigate('/pertandingan')
        }

        logMasuk();
        
    }, [emel, kataLaluan, sudahHantar, navigate])

    return (
        <>
            <h2>Log Masuk</h2>
            <form onSubmit={hantar}>
                Emel<br /><input type='email' value={emel} onChange={(event) => setEmel(event.target.value)} /><br />
                Kata laluan<br /><input type='password' value={kataLaluan} onChange={(event) => setKataLaluan(event.target.value)} /><br />
                <input type='submit' value='Hantar' /><br />
                {mesej}
            </form>
        </>
    )
}