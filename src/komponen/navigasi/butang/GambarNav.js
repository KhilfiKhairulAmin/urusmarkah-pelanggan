import { Link } from "react-router-dom";

export default function GambarNav ({ src, alt, to, style }) {
    return (
        <Link to={to}>
            <img src={src} alt={alt}></img>
        </Link>
    )
}