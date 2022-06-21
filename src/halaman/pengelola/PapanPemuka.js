import { useContext } from "react";
import { KonteksPengelola } from "./PengepalaPengelola";

export default function PapanPemuka () {
    const pengelola = useContext(KonteksPengelola);
    
    return (
        <>
        <h2>{pengelola.namaAkaun}</h2>
        <h4>{pengelola.namaPenuh}</h4>
        <h6>#{pengelola._id}</h6>
        </>
    )

}