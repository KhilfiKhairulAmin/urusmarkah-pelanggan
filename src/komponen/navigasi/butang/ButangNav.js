import { Link } from "react-router-dom";

export default function ButangNav ({ to, buttonText, style }) {
    return (
        <Link to={to} >
            <button style={style}>{buttonText}</button>
        </Link>
    )
}