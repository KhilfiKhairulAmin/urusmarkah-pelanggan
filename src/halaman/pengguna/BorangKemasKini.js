import { useContext, useEffect, useState } from "react";
import { KonteksPengelola } from "./PengepalaPengelola";

export default function BorangKemaskini () {
    const pengelola = useContext(KonteksPengelola);

    const [ namaAkaun, setNamaAkaun ] = useState('');
    const [ namaPenuh, setNamaPenuh ] = useState('')
    const [ katalaluan, setKataLaluan ] = useState('');
    const [ katalaluanSemula, setKataLaluanUlangan ] = useState('');

    const [ hantar, setHantar ] = useState(false);
    
    const hantarBorang = (e) => {
        e.preventDefault();
        setHantar(true);

    }

    useEffect(() => {

        if (pengelola && !hantar) {
            setNamaAkaun(pengelola.namaAkaun || '')
            setNamaPenuh(pengelola.namaPenuh || '')
        }

        const hantarBorang = async () => {

            const pengelola = {
                namaAkaun,
                namaPenuh
            }

            const res = await fetch('http://localhost:5000/api/v1/pengelola/kemas_kini', {
                method: 'PUT',
                
            })
        }

    }, [hantar, namaAkaun, namaPenuh, pengelola])

    return (
        <>
        <form onSubmit={hantarBorang}>
            Nama Akaun: <input type='text' value={namaAkaun} onChange={(e) => setNamaAkaun(e.target.value)} /><br />
            Nama Penuh: <input type='text' value={namaPenuh} onChange={(e) => setNamaPenuh(e.target.value)} /><br />
            Katalaluan Baharu: <input type='text' value={katalaluan} onChange={(e) => setKataLaluan(e.target.value)} /><br />
            Katalaluan Semula: <input type='text' value={katalaluanSemula} onChange={(e) => setKataLaluanUlangan(e.target.value)} /><br />
            <input type='submit' value={'Kemaskini'} />
        </form>
        </>
    )
}