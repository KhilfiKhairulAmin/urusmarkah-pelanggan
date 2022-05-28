import { useEffect, useState } from "react";
import { Outlet,  } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";
import ButangNav from "../../komponen/navigasi/butang/ButangNav";

export default function PengepalaPertandingan () {

    const [maklumatFetch] = useFetchProtected('http://localhost:5000/api/v1/pengguna', {});

    return (<>
        <span style={{ display: 'flex', flexDirection: 'row' }}>
            <Logo to='/urusmarkah' />
            <ButangNav to='./papan_pemuka' buttonText={maklumatFetch.nama ?? 'Loading...'} />
        </span>
        <Outlet />
    </>)
}