import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export default function SenaraiPeserta () {
    
    const { pertandingan } = useParams();

    const peserta = useFetchProtected(`http://localhost:5000/api/v1/pertandingan/${pertandingan}/peserta`)

    return (
        <>
            { peserta && peserta.map((p, i) => {
            const { peserta } = p;
            return (
                <>{i+1}. <Link to={`../${peserta._id}`}><label>{peserta.namaPenuh}</label></Link><br />{peserta.namaAkaun}<br /></>
                )
            })}
        </>
    )
}

