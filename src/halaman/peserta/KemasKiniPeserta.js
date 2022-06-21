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
        <form onSubmit={hantarBorang}>
            Nama Akaun: <input type='text' value={namaAkaun} onChange={(e) => setNamaAkaun(e.target.value)} /><br />
            Nama Penuh: <input type='text' value={namaPenuh} onChange={(e) => setNamaPenuh(e.target.value)} /><br />
            No. Kad Pengenalan: <input type='text' value={noKP} onChange={(e) => setNoKP(e.target.value)} /><br />
            Katalaluan Lama: <input type='text' value={katalaluanLama} onChange={(e) => setKatalaluanLama(e.target.value)} /><br />
            Katalaluan Baharu: <input type='text' value={katalaluanBaharu} onChange={(e) => setKatalaluanBaharu(e.target.value)} /><br />
            <input type='submit' value={'Kemaskini'} />
        </form>
        </>
    )
}