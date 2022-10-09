import { useContext } from "react";
import formatTarikh from "../../util/formatTarikh";
import { KonteksPeserta } from "./PengepalaUtamaPeserta";

export default function PapanPemukaPeserta () {

    const { namaPenuh, namaAkaun, _id, tarikhMasaDaftar} = useContext(KonteksPeserta) || 'Loading';

    return (
        <>
            <div className="w3-margin">
                <h2 style={{
                    fontWeight: 'bolder'
                }} className="w3-serif w3-text-deep-orange">{namaAkaun}</h2>
                <h6 className="w3-serif w3-text-deep-orange">#{_id}</h6>
                <h3 className="w3-serif w3-text-deep-orange">{namaPenuh}</h3>
                <h5>Tarikh Pendaftaran: {formatTarikh(tarikhMasaDaftar)}</h5>
            </div>
        </>
    )
}