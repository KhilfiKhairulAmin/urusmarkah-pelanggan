import { createContext, useContext, useEffect, useState } from "react";
import { Outlet,  } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";
import ButangNav from "../../komponen/navigasi/butang/ButangNav";

export default function PengepalaPertandingan () {

    const [pengguna] = useFetchProtected('http://localhost:5000/api/v1/pengguna', {})
    const KonteksPengguna = createContext()

    return (<>
    <KonteksPengguna.Provider value={pengguna} >
        <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Logo to='/urusmarkah' />
            <ButangNav to='./papan_pemuka' buttonText={pengguna.nama ?? 'Loading...'} />
        </span>
        <Outlet />
    </KonteksPengguna.Provider>
    </>)
}