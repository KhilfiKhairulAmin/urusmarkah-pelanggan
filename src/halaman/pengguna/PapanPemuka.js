import { useContext } from "react";
import { KonteksPengguna } from "./PengepalaPengguna";

export default function PapanPemuka () {
    const [maklumat] = useContext(KonteksPengguna);
    
    return (
        <>
        <h2>{maklumat.nama}</h2>
        <h5>#{maklumat._id}</h5>
        </>
    )

}