const _apiUrl = "/api/image"

export const PostAnImage = (newImage) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(newImage)
    })
}

export const DeleteAnImage = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
        headers: {'Content-Type' : 'application/json'}
    })
}