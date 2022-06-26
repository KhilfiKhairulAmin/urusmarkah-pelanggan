import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchLifecycle from "../../util/fetchLifecycle";
import { KonteksPengelola } from "./PengepalaPengelola";

export default function BorangKemaskini () {
    const pengelola = useContext(KonteksPengelola);

    const [ namaAkaun, setNamaAkaun ] = useState('');
    const [ namaPenuh, setNamaPenuh ] = useState('')
    const [ katalaluanLama, setKatalaluanLama ] = useState('');
    const [ katalaluanBaharu, setKatalaluanBaharu ] = useState('');

    const [ hantar, setHantar ] = useState(false);

    const nav = useNavigate();
    // const fetchProtected = useFetchProtected;
    
    const hantarBorang = (e) => {
        e.preventDefault();
        setHantar(true);
    }

    useEffect(() => {

        if (!(namaPenuh || namaAkaun)) {
            setNamaAkaun(pengelola.namaAkaun);
            setNamaPenuh(pengelola.namaPenuh)
        }

        if (!hantar) return;

        const kemaskini = {
            namaAkaun,
            namaPenuh,
            katalaluanLama: katalaluanLama,
            katalaluanBaharu: katalaluanBaharu
        }

        const kemaskiniPengguna = async () => {

            // 
            const maklumat = await fetchLifecycle(nav, 'http://localhost:5000/api/v1/pengelola/kemas_kini', {
                method: 'PUT',
                body: JSON.stringify(kemaskini),
                headers: {
                    'Content-Type':'application/json'
                }
            });

            if (!maklumat.status) {
                setHantar(false);
                return;
            }

            pengelola.namaAkaun = maklumat.namaAkaun;
            pengelola.namaPenuh = maklumat.namaPenuh;

            nav('/pengelola');
        }

        kemaskiniPengguna();

    }, [hantar, katalaluanBaharu, katalaluanLama, namaAkaun, namaPenuh, nav, pengelola])

    return (
        <>
        <form onSubmit={hantarBorang} className='w3-margin w3-container w3-text-deep-orange w3-serif w3-large'>
            Nama Akaun: <input className="w3-input w3-light-gray" type='text' value={namaAkaun} onChange={(e) => setNamaAkaun(e.target.value)} /><br />
            Nama Pengelola: <input className="w3-input w3-light-gray" type='text' value={namaPenuh} onChange={(e) => setNamaPenuh(e.target.value)} /><br />
            Katalaluan Lama: <input className="w3-input w3-light-gray" type='password' value={katalaluanLama} onChange={(e) => setKatalaluanLama(e.target.value)} /><br />
            Katalaluan Baharu: <input className="w3-input w3-light-gray" type='password' value={katalaluanBaharu} onChange={(e) => setKatalaluanBaharu(e.target.value)} /><br />
            <input className="w3-button w3-hover-amber w3-deep-orange w3-round-large w3-margin-bottom w3-margin-right" type='submit' value={'Kemaskini'} />
        </form>
        </>
    )
}