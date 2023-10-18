const _apiUrl = "/api/property"

export const getAllProperties = () => {
    return fetch(`${_apiUrl}`).then(res => res.json());
} 

export const getAvailableProperties = () => {
    return fetch(`${_apiUrl}/available`).then(res => res.json());
}

export const getPropertyById = (propertyId) => {
    return fetch(`${_apiUrl}/${propertyId}`).then(res => res.json());
}

export const postAProperty = (newProperty) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newProperty)
    })
}

export const getPropertiesForUser = (userId) => {
    return fetch(`${_apiUrl}/myproperties?userId=${userId}`).then(res => res.json());
}

