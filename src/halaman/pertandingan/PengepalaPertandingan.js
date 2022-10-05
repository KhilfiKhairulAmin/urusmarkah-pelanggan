import { createContext } from "react";
import { Link, Outlet, useMatch, useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export const KonteksPertandingan = createContext();

export default function PengepalaPertandingan () {

    const { pertandingan: _id } = useParams();
    const url = '/urusmarkah/:pertandingan'
    const papanPemuka = useMatch(url);
    const peserta = useMatch(url + '/peserta')
    const tentang = useMatch(url + '/tentang')
    const urusmarkah = useMatch(url + '/urusmarkah')
    const keputusan = useMatch(url + '/keputusan')

    const pertandingan = useFetchProtected(`http://localhost:5000/api/v1/pertandingan/${_id}`);

    const butang = 'w3-margin-left w3-button w3-hover-light-grey w3-round-xlarge'
    const butangCondition = 'w3-margin-left w3-button w3-deep-orange w3-hover-deep-orange w3-round-xlarge'

    return (
        <>
        <br />
        <KonteksPertandingan.Provider value={pertandingan} >

            <Link to={''}><button className={((papanPemuka) ? butangCondition : butang)} >Papan Pemuka</button></Link>
            <Link to={'peserta'}><button className={((peserta) ? butangCondition : butang)}>Peserta</button></Link>
            { (pertandingan.status === 2) ? <></> : <Link to={'tentang'}><button className={((tentang) ? butangCondition : butang)}>Konfigurasi</button></Link>}
            { (pertandingan.status === 1) ? <Link to={'urusmarkah'}><button className={((urusmarkah) ? butangCondition : butang)}>Urusmarkah</button></Link> : <></>}
            { (pertandingan.status === 2) ? <Link to={'keputusan'}><button className={((keputusan) ? butangCondition : butang)}>Keputusan</button></Link> : <></>}
            <br /><Outlet />
        </KonteksPertandingan.Provider>
        </>
    )
}