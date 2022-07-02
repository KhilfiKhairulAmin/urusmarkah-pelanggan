import { useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export default function MaklumatPeserta () {

    const { peserta, pertandingan } = useParams();

    const { namaPenuh, namaAkaun, _id} = useFetchProtected(`http://localhost:5000/api/v1/pertandingan/${pertandingan}/peserta/${peserta}`, {})

    return (
        <>
        <div className="w3-margin">
            <h2 className="w3-serif w3-text-deep-orange">{namaPenuh}</h2>
            <h4 className="w3-serif w3-text-deep-orange">{namaAkaun}</h4>
            <h6 className="w3-serif w3-text-deep-orange">#{_id}</h6>
        </div>
        </>
    )
}