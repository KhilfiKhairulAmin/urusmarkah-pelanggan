import { Link } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import formatTarikh from "../../util/formatTarikh";

export default function SenaraiPertandinganTerkini () {

    const pertandinganTerkini = useFetchProtected('http://localhost:5000/api/v1/peserta/pertandingan_terkini', {});

    const papar = (pertandinganTerkini && pertandinganTerkini.map((p) => {
        const { tarikhPelaksanaan } = p.tentang || 'Tidak Ditetapkan';

        return (
            <>
            <div className="w3-border-bottom w3-border-gray">
            <Link style={{ textDecoration: 'none' }} to={`../${p._id}`}><h2 style={{ fontFamily: 'BlackJack'}} className="w3-text-deep-orange">{p.nama}</h2></Link>
            Tarikh Pelaksanaan: {formatTarikh(tarikhPelaksanaan) || 'Tidak Ditetapkan'}
            <br />
            Bil Peserta: {p.bilPeserta || 0}
            </div>
            </>
        )
    }))

    return (
        <>
            {(papar !== []) ? papar : 'Tiada pertandingan terkini'}
        </>
    )
}