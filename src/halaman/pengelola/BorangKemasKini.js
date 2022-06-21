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
        <form onSubmit={hantarBorang}>
            Nama Akaun: <input type='text' value={namaAkaun} onChange={(e) => setNamaAkaun(e.target.value)} /><br />
            Nama Penuh: <input type='text' value={namaPenuh} onChange={(e) => setNamaPenuh(e.target.value)} /><br />
            Katalaluan Lama: <input type='text' value={katalaluanLama} onChange={(e) => setKatalaluanLama(e.target.value)} /><br />
            Katalaluan Baharu: <input type='text' value={katalaluanBaharu} onChange={(e) => setKatalaluanBaharu(e.target.value)} /><br />
            <input type='submit' value={'Kemaskini'} />
        </form>
        </>
    )
}