import { Link } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export default function SenaraiPertandinganTerkini () {

    const pertandinganTerkini = useFetchProtected('http://localhost:5000/api/v1/peserta/pertandingan_terkini', {});

    console.log(pertandinganTerkini)

    const papar = (pertandinganTerkini && pertandinganTerkini.map((p) => {
        const { tarikhPelaksanaan } = p.tentang || 'Tidak Ditetapkan';

        return (
            <>
                <Link to={`../${p._id}`}><h2>{p.nama}</h2></Link>
                Tarikh Pelaksanaan: {tarikhPelaksanaan || 'Tidak Ditetapkan'}
                <br />
                Bil Peserta: {p.bilPeserta || 0}
            </>
        )
    }))

    return (
        <>
            {(papar !== []) ? papar : 'Tiada pertandingan terkini'}
        </>
    )
}