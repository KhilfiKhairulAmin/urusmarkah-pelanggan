import { Outlet, Route, Routes } from "react-router-dom";
import LogMasuk from "../halaman/LogMasuk";

export default function NavigasiPengesahan () {
    <>
    <Routes>
        <Route path="/" element={<PaparanHalaman />} >
            <Route exact path="log_masuk" element={<LogMasuk />} />
            
        </Route>
    </Routes>
    </>
}

function PaparanHalaman () {
    return (
        <>
        <div>
        <Outlet />
        </div>

        </>
    )
}