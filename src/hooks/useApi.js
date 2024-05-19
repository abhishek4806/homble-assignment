import { useState, useEffect, useCallback, useRef } from "react";
import { getRequest, postRequest } from "../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function useApi(endpoint, initialData = null, method = "GET") {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);

    const fetchData = useCallback(
        async (requestData = null, options = {}) => {
            if (!isMounted.current) {
                isMounted.current = true;
                setIsLoading(true);

                try {
                    let response;
                    if (method === "GET") {
                        const hasPathVariables = endpoint.includes(":");
                        if (hasPathVariables) {
                            const url = endpoint.replace(/:(\w+)/g, (match, param) => requestData[param]);
                            response = await getRequest(url);
                        } else {
                            response = await getRequest(endpoint);
                        }
                    } else if (method === "POST") {
                        response = await postRequest(endpoint, requestData, options);
                    } else {
                        throw new Error(`Unsupported method: ${method}`);
                    }

                    setData(response.data);
                    setError(null);
                } catch (err) {
                    toast.error('Something Went Wrong!', { autoClose: 3000 });
                    setError("Something went wrong.");
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            }
        },
        [endpoint, method]
    );

    useEffect(() => {
        if (endpoint) {
            fetchData();
        }
    }, [endpoint, fetchData]);

    return { data, error, isLoading, refetch: fetchData };
}

export default useApi;
