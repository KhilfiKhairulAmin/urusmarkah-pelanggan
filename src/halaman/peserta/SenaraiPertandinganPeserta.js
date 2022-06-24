import { Link } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import statusPertandingan from "../../util/statusPertandingan";

export default function SenaraiPertandinganPeserta () {

    const pertandinganDimasuki = useFetchProtected('http://localhost:5000/api/v1/peserta/pertandingan', {});

    const papar = (pertandinganDimasuki && pertandinganDimasuki.map((p) => {
        const { pertandingan } = p
        const { tentang, _id, nama, status } = pertandingan || 'Tidak Ditetapkan';
        const { tarikhPelaksanaan } = tentang || 'Tiada';
        return (
            <>
                <Link key={`${_id}`} to={`../${_id}`}><h2>{nama}</h2></Link>
                Tarikh Pelaksanaan: {tarikhPelaksanaan || 'Tidak Ditetapkan'}
                <br />
                Status: {statusPertandingan(status) || 'Status tidak sah'}
            </>
        )
    }))

    return (
        <>
            {(papar !== []) ? papar : 'Anda belum menyertai pertandingan'}
        </>
    )
}