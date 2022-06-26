import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export default function SenaraiPeserta () {
    
    const { pertandingan } = useParams();

    const peserta = useFetchProtected(`http://localhost:5000/api/v1/pertandingan/${pertandingan}/peserta`)

    return (
        <>
        <table className="w3-table-all w3-margin w3-serif w3-large">
            <tr className="w3-deep-orange">
                <th>Bil.</th>
                <th>Akaun</th>
                <th>Nama Penuh</th>
                <th>Emel</th>
            </tr>
            { peserta && peserta.map((p, i) => {
            const { peserta } = p;
            return (

                <tr>
                    <td>{i+1}</td>
                    <td><Link to={`../${peserta._id}`}>{peserta.namaAkaun}</Link></td>
                    <td>{peserta.namaPenuh}</td>
                    <td>{peserta.emel}</td>
                </tr>

                )
            })}
        </table>
        </>
    )
}

