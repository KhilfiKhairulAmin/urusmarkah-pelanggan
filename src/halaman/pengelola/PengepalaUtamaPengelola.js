import { createContext } from "react";
import { Link, Outlet } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './Pengelola.css';

export default function PengepalaUtama () {
    // const pertandingan = useFetchProtected('http://localhost:5000/api/v1/pertandingan', {});
    // const KonteksPertandingan = createContext();
    const KonteksPengelola = createContext();
    const pengelola = useFetchProtected('http://localhost:5000/api/v1/pengelola', {});

    return (
        <>
        <KonteksPengelola.Provider value={pengelola} >
            {/* <KonteksPertandingan.Provider value={pertandingan}> */}
            <span className="Pengepala" style={{
                flexGrow: 1
            }}>
                <Logo to='/urusmarkah' />
                <label />
                <Link className="w3-large w3-serif w3-margin-right" to='/pengelola'><FontAwesomeIcon color="#ff5722" icon={faCircleUser} size='2xl' /> {pengelola.namaAkaun}</Link>
            </span>

            <Outlet />
        {/* </KonteksPertandingan.Provider> */}
        </KonteksPengelola.Provider>
        </>
    )
}