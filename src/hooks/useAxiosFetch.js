import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async (url) => {
            try {
                const response = await axios.get(url, {
                    signal: controller.signal,
                });
                console.log(response);

                setData(response.data);
            } catch (err) {
                setData({});
            }
        };

        fetchData(dataUrl);

        const cleanUp = () => {
            controller.abort();
        };

        return cleanUp;
    }, [dataUrl]);
    console.log(data);

    return data;
};

export default useAxiosFetch;
