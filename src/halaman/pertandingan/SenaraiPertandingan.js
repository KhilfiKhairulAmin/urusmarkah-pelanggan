import { Link } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export default function SenaraiPertandingan () {

    const pertandingan = useFetchProtected('http://localhost:5000/api/v1/pertandingan', {});

    return (
        <>
        <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
            <Link to='cipta'><button>Anjur Pertandingan</button></Link>
        </span>
        { (pertandingan && pertandingan.map((p) => (
            <>
            <Link to={p._id}><h2>{p.nama}</h2></Link>
            Dibuat pada: {p.tarikhMasa.cipta}
            <br />
            </>
        ))) || 'Loading'}
        </>
    )
}