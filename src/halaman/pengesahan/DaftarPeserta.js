import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import fetchLifecycle from '../../util/fetchLifecycle';
import Competition2 from '../../gambar/Competition 2.jpg'

export default function DaftarPeserta () {
    
    const [ emel, setEmel ] = useState('');
    const [ namaAkaun, setNamaAkaun ] = useState('');
    const [ namaPenuh, setNamaPenuh ] = useState('');
    const [ noKP, setNoKP ] = useState('');
    const [ katalaluan, setKatalaluan] = useState('');

    const [ hantar, setHantar ] = useState(false);

    const nav = useNavigate();

    const prahantar = (e) => {
        e.preventDefault();
        setHantar(true);
    }

    useEffect(() => {

        if (!hantar) return;

        const peserta = {
            emel,
            namaAkaun,
            namaPenuh,
            noKP,
            katalaluan
        }

        const hantarBorang = async () => {

            const maklumat = await fetchLifecycle(nav, 'http://localhost:5000/api/v1/peserta/daftar', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(peserta)
            });

            if (maklumat.status) {
                localStorage.setItem('session', maklumat.session)

                nav('/markah')

                return;
            }
            setHantar(false)

            return;
        }

        hantarBorang();
    });

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
                    }} className="w3-serif">Daftar Akaun</h2>

            <label className="w3-large w3-serif">Emel</label><br /><input className={input} type='email' value={emel} onChange={(e) => setEmel(e.target.value)} /><br />
            <label className="w3-large w3-serif">Nama Akaun</label><br /><input className={input} type='text' value={namaAkaun} onChange={(e) => setNamaAkaun(e.target.value)} /><br />
            <label className="w3-large w3-serif">Nama Penuh</label><br /><input className={input} type='text' value={namaPenuh} onChange={(e) => setNamaPenuh(e.target.value)} /><br />
            <label className="w3-large w3-serif">No. Kad Pengenalan</label><br /><input className={input} type='text' value={noKP} onChange={(e) => setNoKP(e.target.value)} /><br />
            <label className="w3-large w3-serif">Katalaluan</label><br /><input className={input} type='password' value={katalaluan} onChange={(e) => setKatalaluan(e.target.value)} /><br />
            <input className="w3-round w3-button w3-deep-orange w3-hover-green w3-serif" type='submit' value='Hantar' />
            <Link className="w3-serif" to={'/pengesahan/log_masuk_peserta'}>
               Log Masuk Akaun
            </Link>
            </form>
            </td>
            <td style={{
                maxWidth: '100%',
                maxHeight: '100%'
            }}>
                <img src={Competition2} alt='Gambar Hiasan' className='w3-image'></img>

            </td>
        </tr>
        </>
    )
}