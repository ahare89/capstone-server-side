const _apiUrl = "/api/propertytype"

export const getPropertyTypes = () => {
    return fetch(`${_apiUrl}`).then(res => res.json());
}