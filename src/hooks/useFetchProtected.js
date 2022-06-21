import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useFetchProtected ( url, init ) {

    const [ maklumatFetch, setMaklumatFetch ] = useState('');
    
    const nav = useNavigate();

    useEffect(() => {

        if (maklumatFetch) return;

        const fetchProtected = async () => {

            if (!localStorage.getItem('token') && localStorage.getItem('session')) {
                const reqInit = { ...init, headers: { authorization: `Bearer ${localStorage.getItem('session')}`}}

                const res = await fetch(url, reqInit);

                const maklumat = await res.json();

                console.log(maklumat);

                if (res.status === 200) {
                    setMaklumatFetch(maklumat);
                    return;
                }

                nav('/pengesahan/log_masuk_peserta');

                return;
            }

            const reqInit = { ...init, headers: { authorization: `Bearer ${localStorage.getItem('token')}`}}

            const res = await fetch(url, reqInit);

            const maklumat = await res.json();

            if (res.status >= 400 ) {

                const fetchToken = await fetch('http://localhost:5000/api/v1/pengelola/refresh_token', {
                method: 'GET',    
                headers: {
                        authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                    }
                });

                console.log(fetchToken)

                if (fetchToken.status >= 400) {
                    nav('/pengesahan/log_masuk');
                    return;
                }

                const { token, refreshToken } = await fetchToken.json();

                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);

                reqInit.headers.authorization = `Bearer ${token}`;
                

                const res = await fetch(url, reqInit);

                const data = await res.json();

                setMaklumatFetch(data);

                return;
            }

            setMaklumatFetch(maklumat);

        }

        fetchProtected();
    }, [init, maklumatFetch, nav, url]);

    return maklumatFetch;
}