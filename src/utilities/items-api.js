import sendRequest from "./send-request";

const BASE_URL = '/api/items'

export function addItem(itemData, id) {
    return sendRequest(`${BASE_URL}/${id}/items`, 'POST' , itemData)
}

export function deleteItem(id, itemId) {
    return sendRequest(`${BASE_URL}/${id}/items/${itemId}`, 'DELETE')
}

export function updateAllItemPositions(id, itemPositions) {
    return sendRequest(`${BASE_URL}/${id}/items/`, 'PUT', itemPositions)
}