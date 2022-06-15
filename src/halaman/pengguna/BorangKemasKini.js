import { useContext, useEffect, useState } from "react";
import { KonteksPengelola } from "./PengepalaPengelola";

export default function BorangKemaskini () {
    const [pengguna] = useContext(KonteksPengelola);

    const [ nama, setNama ] = useState(pengguna.nama ?? " ");
    const [ kataLaluan, setKataLaluan ] = useState('');
    const [ kataLaluanUlangan, setKataLaluanUlangan ] = useState('');

    const [ hantar, setHantar ] = useState(false);
    
    const hantarBorang = (e) => {
        e.preventDefault();
        setHantar(true);
    }

    useEffect(() => {

        setNama(pengguna.nama ?? " ")

    }, [hantar, pengguna.nama])

    return (
        <>
        <form onSubmit={hantarBorang}>
            Nama: <input type='text' value={nama} onChange={(e) => setNama(e.target.value)} /><br />
            Katalaluan baharu: <input type='text' value={kataLaluan} onChange={(e) => setKataLaluan(e.target.value)} /><br />
            Katalaluan ulangan: <input type='text' value={kataLaluanUlangan} onChange={(e) => setKataLaluanUlangan(e.target.value)} /><br />
            <input type='submit' value={'Kemaskini'} />
        </form>
        </>
    )
}