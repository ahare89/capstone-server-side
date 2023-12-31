import { NewMessage } from "../components/messages/NewMessage";

const _apiUrl = "/api/message"

export const createNewMessage = (newMessage) => {
    return fetch(`${_apiUrl}/`, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newMessage)
    })
}

export const getMessages = () => {
    return fetch(`${_apiUrl}`).then(res => res.json());

}

export const getMessagesForUser = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json());
}

export const deleteMessage = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
        headers: {'Content-Type' : 'application/json'}
    })
}
