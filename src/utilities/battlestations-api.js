import sendRequest from "./send-request";

const BASE_URL = '/api/battlestations'


export function getAll() {
    return sendRequest(`${BASE_URL}`)
}

export function getAllPending() {
    return sendRequest(`${BASE_URL}/pending`)
}

export function approvePending(battlestation, id) {
    return sendRequest(`${BASE_URL}/pending/${id}`, 'PUT' , battlestation)
}

export function deleteOne(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE', {id} )
}

export function getById(id) {
    return sendRequest(`${BASE_URL}/${id}`)
}

export function addBattlestation(battlestationData) {
    return sendRequest(`${BASE_URL}`, 'POST' , battlestationData)
}

