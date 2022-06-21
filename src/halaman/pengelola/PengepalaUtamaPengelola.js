import { createContext } from "react";
import { Link, Outlet } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";
import ButangNav from "../../komponen/navigasi/butang/ButangNav";

export default function PengepalaUtama () {
    // const pertandingan = useFetchProtected('http://localhost:5000/api/v1/pertandingan', {});
    // const KonteksPertandingan = createContext();
    const KonteksPengelola = createContext();
    const pengelola = useFetchProtected('http://localhost:5000/api/v1/pengelola', {});

    return (
        <>
        <KonteksPengelola.Provider value={pengelola} >
            {/* <KonteksPertandingan.Provider value={pertandingan}> */}
            <span>
                <Logo to='/urusmarkah' />
                <label style={{ flexGrow: 1}} />
                
            </span>
            <ButangNav to='/pengelola' buttonText={pengelola.namaAkaun}></ButangNav>

            <Outlet />
        {/* </KonteksPertandingan.Provider> */}
        </KonteksPengelola.Provider>
        </>
    )
}