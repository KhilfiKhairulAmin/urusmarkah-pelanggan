import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import fetchLifecycle from '../../util/fetchLifecycle';

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

    return (
        <form onSubmit={prahantar}>
            Emel: <input type='email' value={emel} onChange={(e) => setEmel(e.target.value)} /><br />
            Nama Akaun: <input type='text' value={namaAkaun} onChange={(e) => setNamaAkaun(e.target.value)} /><br />
            Nama Penuh: <input type='text' value={namaPenuh} onChange={(e) => setNamaPenuh(e.target.value)} /><br />
            No. Kad Pengenalan: <input type='text' value={noKP} onChange={(e) => setNoKP(e.target.value)} /><br />
            Katalaluan: <input type='text' value={katalaluan} onChange={(e) => setKatalaluan(e.target.value)} /><br />
            <input type='submit' value='Hantar' />
        </form>
    )
}