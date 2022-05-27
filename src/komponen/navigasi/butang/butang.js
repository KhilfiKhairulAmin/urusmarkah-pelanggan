export default function ButangNav ({link, teks, ...props}) {
    return (
        <>
            <button onClick={() => window.location.href = link}>{teks}</button>
        </>
    )
}