import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../utils/constants";

const useFetchAllLinks = () => {
    const [links, setLinks] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [fetchError, setFetchError] = useState("");

    const fetchLinks = useCallback(async () => {
        setFetching(true);
        setFetchError("");
        try {
            const response = await fetch(`${BASE_URL}/api/links`);
            const result = await response.json();
            if (!result.success) {
                console.log(result.message || "Something went wrong while fetching the links");
                toast.error(result.message || "Something went wrong while fetching the links");
                setFetchError(result.message || "Something went wrong while fetching the links");
            }
            if (result.success) {
                setLinks(result.data);
                setFetchError("");
            }

        } catch (error) {
            console.log(error || error.message || "Something went wrong while fetching the links");
            toast.error(error || error.message || "Something went wrong while fetching the links");
            setFetchError(error || error.message || "Something went wrong while fetching the links")
        } finally {
            setFetching(false);
        }
    }, []);

    
    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    return { links, fetching, fetchError, refetch: fetchLinks };

}

export default useFetchAllLinks;