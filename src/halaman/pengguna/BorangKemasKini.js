import { useContext, useEffect, useState } from "react";
import { KonteksPengguna } from "./PengepalaPengguna";

export default function BorangKemaskini () {
    const pengguna = useContext(KonteksPengguna);

    const [ nama, setNama ] = useState(pengguna.nama);
    const [ kataLaluan, setKataLaluan ] = useState('');
    const [ kataLaluanUlangan, setKataLaluanUlangan ] = useState('');

    const [ hantar, setHantar ] = useState(false)

    const hantarBorang = (e) => {
        e.preventDefault();
        setHantar(true);
    }

    useEffect(() => {

    }, [])

    return (
        <>
        <form onSubmit={hantarBorang}>
            Nama: <input type='text' value={nama} onChange={(e) => setNama(e.value.target)}></input><br />
            Katalaluan baharu: <input type='text' value={kataLaluan} onChange={(e) => setKataLaluan(e.value.target)}></input><br />
            Katalaluan ulangan: <input type='text' value={kataLaluanUlangan} onChange={(e) => setKataLaluanUlangan(e.value.target)}></input><br />
            <input type='submit' value={'Kemaskini'}></input>
        </form>
        </>
    )
}