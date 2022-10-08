import { Link } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import formatTarikh from "../../util/formatTarikh";
import statusPertandingan from "../../util/statusPertandingan";

export default function SenaraiPertandinganPeserta () {

    const pertandinganDimasuki = useFetchProtected('http://localhost:5000/api/v1/peserta/pertandingan', {});

    const papar = (pertandinganDimasuki && pertandinganDimasuki.map((p) => {
        const { pertandingan } = p
        const { tentang, _id, nama, status } = pertandingan || 'Tidak Ditetapkan';
        const { tarikhPelaksanaan } = tentang || 'Tiada';
        return (
            <>
            <div className=" w3-padding-bottom w3-border-bottom w3-border-gray">
            <Link style={{ textDecoration: 'none' }} key={`${_id}`} to={`../${_id}`}><h2 style={{ fontFamily: 'BlackJack' }} className="w3-text-deep-orange">{nama}</h2></Link>
                Tarikh Pelaksanaan: {formatTarikh(tarikhPelaksanaan) || 'Tidak Ditetapkan'}
                <br />
                Status: {statusPertandingan(status) || 'Status tidak sah'}
            </div>
            </>
        )
    }))

    return (
        <>
            {(papar !== []) ? papar : 'Anda belum menyertai pertandingan'}
        </>
    )
}