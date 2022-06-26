import { useContext } from "react";
import { KonteksPengelola } from "./PengepalaPengelola";

export default function PapanPemuka () {
    const pengelola = useContext(KonteksPengelola);

    const { namaAkaun, namaPenuh, _id, emel } = pengelola
    
    return (
        <>
        <div className="w3-margin">
            <h2 style={{
                fontWeight: 'bolder'
            }} className="w3-serif w3-text-deep-orange">{namaAkaun}</h2>
            <h6 className="w3-serif w3-text-deep-orange">#{_id}</h6>
            <h4 className="w3-serif w3-text-deep-orange">{emel}</h4>
            <h3 className="w3-serif w3-text-deep-orange">{namaPenuh}</h3>
        </div>
        </>
    )

}