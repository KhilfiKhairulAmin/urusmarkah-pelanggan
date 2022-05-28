import { Link } from "react-router-dom"

export default function Logo ({ to = '/' }) {
    return (
        <Link to={to}><label style={{ color: 'orangered' }}>Urusmarkah</label></Link>
    )
}