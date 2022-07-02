import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Competition from '../../gambar/Competition.webp'

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

    const input = "w3-input w3-border w3-round-xlarge w3-serif";

    return (
        <>
        <tr>
            <td style={{
                'width':'30%',
                'verticalAlign':'middle'
            }}>
            <form onSubmit={prahantar} className="w3-container w3-text-deep-orange w3-large">
            <h2 style={{
                fontWeight: 'bold',
                alignSelf: 'center'
            }} className="w3-serif">Log Masuk</h2>
                <label className="w3-large w3-serif">Emel</label><br /><input className={input} type='text' value={emel} onChange={(e) => setEmel(e.target.value)} />< br/>
                <label className="w3-large w3-serif">Katalaluan</label><br /><input className={input} type='password' value={katalaluan} onChange={(e) => setKatalaluan(e.target.value)} />< br/>
                <input className="w3-round w3-button w3-deep-orange w3-hover-green w3-serif" type='submit' value='Hantar' />
                <Link className="w3-serif" to={'/pengesahan/daftar_masuk_peserta'}>
                    Sudah mempunyai akaun?
                </Link>
            </form>
            </td>
            <td style={{
                maxWidth: '100%',
                maxHeight: '100%'
            }}>
                <img style={{
                    verticalAlign: 'middle'
                }} className="w3-image" width='10000px' src={Competition} alt='Gambar Hiasan'></img>
            </td>
        </tr>
        </>
    )
}