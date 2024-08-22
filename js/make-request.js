// Function for making get brands Request Data
function getBrandsRequest(selectObject) {
    const request = {
        url: URLS.getCarParameters,
        type: "POST",
        data: {
            method: "get",
            data: {
                select: {...selectObject}
            },
            metadata: {
                token: token
            }
        }
    };

    return request;
}

// Function for making get models Request Data
function getModelsRequest(selectObject) {
    const request = {
        url: URLS.getCarParameters,
        type: "POST",
        data: {
            method: "get",
            data: {
                select: {...selectObject}
            },
            metadata: {
                token: token
            }
        }
    };

    return request;
}

// Function for getting free slots Request Data
function getFreeSlotsRequest(data) {
    const request = {
        url: URLS.getAvailableCheckInSlots,
        type: "POST",
        data: {
            method: "get_available_check_in_slots",
            data: {...data},
            metadata: {
                token: token
            }
        }
    };

    return request;
}