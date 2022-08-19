import { Link, useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import fetchLifecycle from '../../util/fetchLifecycle'

export default function SenaraiPeserta () {
    
    const { pertandingan } = useParams();
    const nav = useNavigate()

    const peserta = useFetchProtected(`http://localhost:5000/api/v1/pertandingan/${pertandingan}/peserta`)

    return (
        <>
        <input className="w3-margin" accept=".json" type={'file'} onChange={(e) => {

            const hantarPeserta = async (text) => {
                console.log(text)
                const res = await fetchLifecycle(nav, `http://localhost:5000/api/v1/pertandingan/${pertandingan}/cipta`, {
                    method: 'POST',
                    body: text,
                    headers: {
                        'Content-Type':'application/json'
                    }
                });

                alert(res.mesej)
                new Location().reload()
            }

            e.preventDefault();
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                console.log(text)

                hantarPeserta(text);
            }
            reader.readAsText(e.target.files[0]);
        }} />
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

