const _apiUrl = "/api/property"

export const getAllProperties = () => {
    return fetch(`${_apiUrl}`).then(res => res.json());
} 

export const getAvailableProperties = () => {
    return fetch(`${_apiUrl}/available`).then(res => res.json());
}

export const postAProperty = (newProperty) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newProperty)
    })
}

