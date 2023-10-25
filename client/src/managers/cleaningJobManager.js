const _apiUrl = "/api/cleaningjob"

export const getAllJobs = () => {
    return fetch(`${_apiUrl}`).then(res => res.json());
}

export const getJobsForSingleUser = (userId) => {
    return fetch(`${_apiUrl}/myschedule/${userId}`).then(res => res.json());
}

export const getJobsForProperty = (propertyId) => {
    return fetch(`${_apiUrl}/${propertyId}`).then(res => res.json());
}

export const postAJob = (newCleaningJob) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newCleaningJob)
    })
}

export const deleteAJob = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
        headers: {'Content-Type' : 'application/json'}
    })
}
