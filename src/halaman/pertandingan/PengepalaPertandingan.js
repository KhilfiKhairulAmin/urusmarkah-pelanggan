import { createContext, useEffect, useState } from "react";
import { Outlet,  } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";
import ButangNav from "../../komponen/navigasi/butang/ButangNav";

export default function PengepalaPertandingan () {
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
                <ButangNav to='/pengelola' buttonText={pengelola.namaAkaun || 'Loading...'} />
            </span>
            <Outlet />
        {/* </KonteksPertandingan.Provider> */}
        </KonteksPengelola.Provider>
        </>
    )
}