import { useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export default function MaklumatPeserta () {

    const { peserta, pertandingan } = useParams();

    const { namaPenuh, namaAkaun, _id} = useFetchProtected(`http://localhost:5000/api/v1/pertandingan/${pertandingan}/peserta/${peserta}`, {})

    return (
        <>
            <h2>{namaPenuh}</h2>
            <h4>{namaAkaun}</h4>
            <h6>#{_id}</h6>
        </>
    )
}