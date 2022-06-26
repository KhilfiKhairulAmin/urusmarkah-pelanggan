import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext } from "react";
import { Link, Outlet } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";

export const KonteksPeserta = createContext();

export default function PengepalaUtamaPeserta (props) {
    
    const peserta = useFetchProtected('http://localhost:5000/api/v1/peserta', {});
    

    return (
        <>
        <KonteksPeserta.Provider value={peserta}>
        <span className="Pengepala" style={{
                flexGrow: 1
            }}>
                <Logo to='/markah/pertandingan' />
                <label />
                <Link className="w3-large w3-serif w3-margin-right" to='/peserta/papan_pemuka'><FontAwesomeIcon color="#ff5722" icon={faCircleUser} size='2xl' /> {peserta.namaAkaun}</Link>
        </span>
        {props.children}
        <Outlet />
        </KonteksPeserta.Provider>
        </>
    )
}