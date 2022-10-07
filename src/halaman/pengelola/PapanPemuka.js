import { useContext } from "react";
import { KonteksPengelola } from "./PengepalaPengelola";
import formatTarikh from "../../util/formatTarikh"

export default function PapanPemuka () {
    const pengelola = useContext(KonteksPengelola);

    const { namaAkaun, namaPenuh, _id, emel, tarikhMasa } = pengelola
    const { daftar, logMasukTerakhir } = tarikhMasa || "";

    return (
        <>
        <div className="w3-margin">
            <h2 style={{
                fontWeight: 'bolder'
            }} className="w3-serif w3-text-deep-orange">{namaAkaun}</h2>
            <h6 className="w3-serif w3-text-deep-orange">#{_id}</h6>
            <h4 className="w3-serif w3-text-deep-orange">{emel}</h4>
            <h3 className="w3-serif w3-text-deep-orange">{namaPenuh}</h3>
            <h5>Tarikh daftar: {formatTarikh(daftar)}</h5>
            <h5>Log masuk terakhir: {formatTarikh(logMasukTerakhir)}</h5>
        </div>
        </>
    )

}