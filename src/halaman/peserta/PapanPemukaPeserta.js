import { useContext } from "react";
import { KonteksPeserta } from "./PengepalaUtamaPeserta";

export default function PapanPemukaPeserta () {

    const { namaPenuh, namaAkaun, _id} = useContext(KonteksPeserta) || 'Loading';

    return (
        <>
            <h2>{namaPenuh}</h2>
            <h4>{namaAkaun}</h4>
            <h6>#{_id}</h6>

        </>
    )
}