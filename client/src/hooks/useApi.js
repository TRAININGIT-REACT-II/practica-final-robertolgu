import { useState, useMemo, useEffect } from 'react';

const useApi = (url, token = "", initialParams = {}, performOnMount = true) => {

    const[loading, setLoading] = useState(performOnMount);
    const[data, setData] = useState(null);
    const[error, setError] = useState(null);
    const[fetchParams, setFetchParams] = useState(initialParams);
    const[performRequest, setPerformRequest] = useState(performOnMount);

    const updateParams = (newParams) => {
        setFetchParams(newParams);
    };

    const perform = () => {
        setPerformRequest(true);
    };

    const config = useMemo(() => {
        const initConfig = {
            method: "GET",
            ...fetchParams
        }

        if (token && token !=""){
            if (initConfig.headers == null){
                initConfig.headers = {}
            }

            initConfig.headers["api-token"] = token;
        } 

        return initConfig   ;
    }, [url, token, fetchParams]);


    useEffect(() => {
        if (performRequest){
            if (!loading){
                setLoading(true);
            }
            fetch(url, config)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if (json.error != null){
                    setError(json.error);
                } else {
                    setError("");
                    setData(json);
                    console.log(json);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
        }
    },[url, config, performRequest]);

    return {
        loading,
        data,
        error,
        updateParams,
        perform,
    };
}

export default useApi;