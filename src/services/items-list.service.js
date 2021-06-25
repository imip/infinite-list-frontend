import { BACK_API } from "../constants/config";

const initOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};

export const getItems = async pageNumber => {
    return fetch(`${BACK_API}/items?_page=${pageNumber}&_limit=30`, initOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Une erreur est survenue");
            }
            return response.json(items => {
                return items;
            });
        })
        .catch(error => {
            throw error;
        });
};
