export default async function fetchLifecycle (nav, url, init) {

    try {
        const to = '/pengesahan/log_masuk'

        // Phase 1 - Fetch
        const Init = { ...init };

        if (!Init.headers) {
            Init.headers = {}
        }

        if (!localStorage.getItem('token')) {
            const session = localStorage.getItem('session');

            if (!session) nav('/pengesahan/log_masuk_peserta');

            Init.headers.authorization = `Bearer ${session}`

            const res = await fetch(url, Init);

            const maklumat = await res.json();

            console.log(maklumat);

            maklumat.status = true;

            return maklumat;
        }

        Init.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
        const res = await fetch(url, Init);
    
        const maklumat = await res.json();

        maklumat.status = true;
    
        if (res.status >= 400) {
            maklumat.status = false;

            console.log(maklumat)

            // Token expired
            if (maklumat.ralat === 'TokenExpiredError' || maklumat.ralat === 'JsonWebTokenError') {
                // Phase 2 - Refresh Token
                const res = await fetch('http://localhost:5000/api/v1/pengelola/refresh_token', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                    }
                });

                if (res.status >= 400) {
                    nav(to);
                    return;
                }

                const { token, refreshToken } = await res.json();

                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);

                // Phase 3 - Re-fetch

                Init.headers.authorization = `Bearer ${token}`;
                const res2 = await fetch(url, Init);

                const maklumat = await res2.json()

                maklumat.status = true

                if (res2.status >= 400) {
                    maklumat.status = false;
                }

                return maklumat;
            }
        }

        return maklumat;
    } catch (ralat) {
        console.log (ralat)
        return false;
    }
}