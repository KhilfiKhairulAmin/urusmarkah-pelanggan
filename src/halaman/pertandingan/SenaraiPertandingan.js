import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import './Pertandingan.css'
import formatTarikh from "../../util/formatTarikh";
import statusPertandingan from "../../util/statusPertandingan";

export default function SenaraiPertandingan () {

    const pertandingan = useFetchProtected('http://localhost:5000/api/v1/pertandingan', {});

    return (
        <>
        <span style={{ display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'left'}}>
            <label />
            <Link className='w3-margin' to='cipta'>
                <button className='w3-button w3-hover-blue w3-deep-orange w3-round-medium w3-serif'>
                <FontAwesomeIcon icon={faPlusCircle} size='xl' style={{ marginRight: '6px'}} />
                    Anjur Pertandingan
                </button>
            </Link>
        </span>
        <div className='grid-container w3-margin w3-serif'>
        { (pertandingan && pertandingan.map((p) => (
            <div className='grid-item w3-center w3-round-jumbo w3-deep-orange w3-round-xlarge'>
                <Link to={p._id} style={{
                    textDecoration: 'none'
                }}><h2 className="w3-deep-orange w3-xxlarge" style={{
                    fontFamily: 'BlackJack'
                }}>{p.nama}</h2></Link>
                <label className="w3-medium w3-left w3-serif">
                    Dicipta pada: {formatTarikh(p.tarikhMasa.cipta)}
                    </label>
                    <br />
                <label className="w3-medium w3-left w3-serif"> Status: { statusPertandingan(p.status)}</label>

                <br />
            </div>
        ))) || 'Loading'}
        </div>
        </>
    )
}