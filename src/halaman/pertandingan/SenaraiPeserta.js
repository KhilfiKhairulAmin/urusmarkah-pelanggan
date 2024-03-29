import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import fetchLifecycle from '../../util/fetchLifecycle'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function SenaraiPeserta () {
    
    const { pertandingan: id_pertandingan } = useParams();
    const nav = useNavigate()

    let peserta = useFetchProtected(`http://localhost:5000/api/v1/pertandingan/${id_pertandingan}/peserta`)
    const pertandingan = useFetchProtected(`http://localhost:5000/api/v1/pertandingan/${id_pertandingan}`)

    async function hapusPeserta (pertandingan_id, peserta_id)  {
        const res = await fetchLifecycle(nav, `http://localhost:5000/api/v1/pertandingan/${pertandingan_id}/peserta/${peserta_id}/hapus`, {
            method: 'DELETE'
        });

        if (!res.status) alert('Peserta tidak berjaya dihapuskan');

        window.location.reload();
    }

    return (
        <>
        { pertandingan.status === 0 &&(<><div className="w3-margin"><button onClick={(e) => document.getElementById("upload").click()}>Muat Naik Peserta (Fail JSON)</button><input id="upload" style={{ display: 'none'}} className="w3-margin" accept=".json" type={'file'} onChange={(e) => {

            const hantarPeserta = async (text) => {
                const res = await fetchLifecycle(nav, `http://localhost:5000/api/v1/pertandingan/${id_pertandingan}/cipta`, {
                    method: 'POST',
                    body: text,
                    headers: {
                        'Content-Type':'application/json'
                    }
                });

                alert(res.mesej)
                window.location.reload();
            }

            e.preventDefault();
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;

                hantarPeserta(text);
            }
            reader.readAsText(e.target.files[0]);
        }} /></div></>)}
        <table className="w3-table-all w3-margin w3-serif w3-large">
            <tbody>
            <tr className="w3-deep-orange">
                <th>Bil.</th>
                <th>Akaun</th>
                <th>Nama Penuh</th>
                <th>Emel</th>
                <th></th>
            </tr>
            { peserta && peserta.map((p, i) => {
            const { peserta } = p;
            return (

                <tr key={i}>
                    <td>{i+1}</td>
                    <td><Link to={`../${peserta._id}`}>{peserta.namaAkaun}</Link></td>
                    <td>{peserta.namaPenuh}</td>
                    <td>{peserta.emel}</td>
                    <td><button onClick={(e) => {hapusPeserta(id_pertandingan, peserta._id)}}><FontAwesomeIcon icon={faTrash} color='red' /></button></td>
                </tr>
                )
            })}
            </tbody>
        </table>
        </>
    )
}

