import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchLifecycle from "../../util/fetchLifecycle";
import { KonteksPeserta } from "./PengepalaUtamaPeserta";

export default function KemasKiniPeserta () {

    const peserta = useContext(KonteksPeserta);

    const [ namaAkaun, setNamaAkaun ] = useState('');
    const [ namaPenuh, setNamaPenuh ] = useState('');
    const [ noKP, setNoKP ] = useState('');
    const [ katalaluanLama, setKatalaluanLama ] = useState('');
    const [ katalaluanBaharu, setKatalaluanBaharu ] = useState('');

    const [ hantar, setHantar ] = useState(false);

    const nav = useNavigate();

    const hantarBorang = (e) => {
        e.preventDefault();
        setHantar(true);
    }

    useEffect(() => {

        if (!(namaPenuh || namaAkaun || noKP)) {
            setNamaAkaun(peserta.namaAkaun);
            setNamaPenuh(peserta.namaPenuh)
            setNoKP(peserta.noKP)
        }

        if (!hantar) return;

        const kemaskini = {
            namaAkaun,
            namaPenuh,
            noKP,
            katalaluanLama: katalaluanLama,
            katalaluanBaharu: katalaluanBaharu
        }

        const kemaskiniPengguna = async () => {

            // 
            const maklumat = await fetchLifecycle(nav, 'http://localhost:5000/api/v1/peserta/kemas_kini', {
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

            peserta.namaAkaun = maklumat.namaAkaun;
            peserta.namaPenuh = maklumat.namaPenuh;
            peserta.noKP = maklumat.noKP;

            nav('/peserta/papan_pemuka');
        }

        kemaskiniPengguna();

    }, [hantar, katalaluanBaharu, katalaluanLama, namaAkaun, namaPenuh, nav, noKP, peserta])

    return (
        <>
        <form onSubmit={hantarBorang} className='w3-margin w3-container w3-text-deep-orange w3-serif w3-large'>
            Nama Akaun: <input className="w3-input w3-light-gray" type='text' value={namaAkaun} onChange={(e) => setNamaAkaun(e.target.value)} /><br />
            Nama Penuh: <input type='text' className="w3-input w3-light-gray" value={namaPenuh} onChange={(e) => setNamaPenuh(e.target.value)} /><br />
            No. Kad Pengenalan: <input type='text' className="w3-input w3-light-gray" value={noKP} onChange={(e) => setNoKP(e.target.value)} /><br />
            Katalaluan Lama: <input type='text' className="w3-input w3-light-gray" value={katalaluanLama} onChange={(e) => setKatalaluanLama(e.target.value)} /><br />
            Katalaluan Baharu: <input type='text' className="w3-input w3-light-gray" value={katalaluanBaharu} onChange={(e) => setKatalaluanBaharu(e.target.value)} /><br />
            <input className="w3-button w3-hover-amber w3-deep-orange w3-round-large w3-margin-bottom w3-margin-right" type='submit' value={'Kemaskini'} />
        </form>
        </>
    )
}