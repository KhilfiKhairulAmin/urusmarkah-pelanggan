import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export default function KeputusanPertandingan () {

    const { pertandingan: _idp } = useParams();
    const peserta = useFetchProtected(`http://localhost:5000/api/v1/urusmarkah/keputusan/${_idp}`, {});

    return (
        <>
        <div className="w3-margin">
        <table className="w3-table w3-striped w3-hoverable w3-border w3-border-light-gray w3">
                <tr className="w3-deep-orange">
                    <th style={{
                        width: '7%'
                    }}>Kedudukan</th>
                    <th className="">Peserta</th>
                    <th className="w3-center" style={{
                        width: '2%'
                    }}>Markah</th>
                </tr>
            {peserta && peserta.map((p, i) => {
                const { peserta, jumlah } = p;
                return (
                    <>
                    <tr>
                        <td className="w3-border-bottom w3-border-light-gray w3-center">{(i + 1 <= 3) ? <FontAwesomeIcon style={{
                            position: 'relative',
                            top: '10px'
                        }} icon={faMedal} size='2x' color={
                            (i + 1 === 1) ? '#FFD700' : (i + 1 === 2) ? '#C0C0C0' : '#CD7F32'
                        } /> : i + 1}</td>
                        <td className="w3-border-bottom w3-border-light-gray">
                        <label className="w3-large">{peserta.namaPenuh}</label>
                        <br />
                        <label className="w3-medium">{peserta.namaAkaun}</label>
                        </td>
                        <td className="w3-border-bottom w3-border-light-gray"><label className="w3-large">{jumlah.toFixed(0)}</label></td>         
                    </tr>
                    </>
                )
            })}
            </table>
        </div>
        </>
    )
}