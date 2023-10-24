const _apiUrl = "/api/cleaningjob"

export const getAllJobs = () => {
    return fetch(`${_apiUrl}`).then(res => res.json());
}

export const postAJob = (newCleaningJob) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newCleaningJob)
    })
}