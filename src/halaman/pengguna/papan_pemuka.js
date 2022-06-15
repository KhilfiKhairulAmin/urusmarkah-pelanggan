import { useContext, useEffect, useState } from "react";
import useFetchProtected from "../../hooks/useFetchProtected";
import 


export default function PapanMaklumat () {
    const [maklumat, setMaklumat] = useState(useContext());
    
    useEffect(() => {
        // Mendapatkan maklumat nama dan emel
        setMaklumat()
    })

    return (
        <>
            Nama: {maklumat.nama}
            <br />
            Emel: {maklumat.emel}
        </>
    )
}