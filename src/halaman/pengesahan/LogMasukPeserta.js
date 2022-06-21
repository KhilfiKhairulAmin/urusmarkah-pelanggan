import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogMasukPeserta () {

    const [ emel, setEmel ] = useState('');
    const [ katalaluan, setKatalaluan ] = useState('');

    const [ hantar, setHantar ] = useState(false);

    const nav = useNavigate()

    const prahantar = (e) => {
        e.preventDefault();
        setHantar(true);
    }

    useEffect(() => {

        if (!hantar) return;

        const logMasuk = {
            emel,
            katalaluan
        }

        const hantarBorang = async () => {

            const res = await fetch('http://localhost:5000/api/v1/peserta/log_masuk', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(logMasuk)
            });

            const maklumat = await res.json();

            if (res.status === 200) {
                localStorage.setItem('session', maklumat.session);
                nav('/markah/pertandingan');
            }

            setHantar(false);
            return;

        }

        hantarBorang();
    }, [emel, hantar, katalaluan, nav])
    return (
        <>
            <form onSubmit={prahantar}>
                Emel: <input type='text' value={emel} onChange={(e) => setEmel(e.target.value)} />< br/>
                Katalaluan: <input type='password' value={katalaluan} onChange={(e) => setKatalaluan(e.target.value)} />< br/>
                <input type='submit' value='Hantar' />
            </form>
        </>
    )
}