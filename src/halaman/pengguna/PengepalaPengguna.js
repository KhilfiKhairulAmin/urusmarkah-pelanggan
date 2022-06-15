import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../komponen/identiti/Logo";

export default function PengepalaPengguna () {

    useEffect(() => {
        const dapatkanPertandigan = async () => {
            const res = await fetch('http://localhost:5000/api/v1/pengguna', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });


        }
    })

    return (
        <>
            <Logo to='/pertandingan' />
            <Outlet />
            
        </>
    )
}