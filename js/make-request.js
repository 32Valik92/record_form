// Function for making get Time ZoneId Request
function getTimeZoneIdRequest(sto_id) {
    const request = {
        url: URLS.mainService,
        type: "POST",
        data: {
            "method": "index",
            "metadata": {
                "token": null
            },
            "data": {
                "fields": ["timezone_id"],
                "select": {
                    "internal_id": sto_id
                }
            }
        }
    };

    return request;
}

// Function for making get Time Zone data Request
function getTimeZoneDataRequest(TimeZoneId) {
    const request = {
        url: URLS.timezoneData,
        type: "POST",
        data: {
            "method": "get_timezones",
            "data": {
                "select": {
                    "internal_id": TimeZoneId
                }
            }
        }
    };

    return request;
}

// Function for making get order template Request
function getOrderTemplateRequest(sto_id) {
    const request = {
        url: URLS.mainService,
        type: "POST",
        data: {
            "method": "index",
            "metadata": {
                "token": null
            },
            "data": {
                "fields": [
                    "order_settings"

                ],
                "select": {
                    "internal_id": sto_id
                }
            }
        }
    };

    return request;
}

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
                token: null
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
                token: null
            }
        }
    };

    return request;
}

// Function for getting free slots Request Data
function getFreeSlotsRequest(data) {
    const request = {
        url: URLS.mainService,
        type: "POST",
        data: {
            method: "get_available_check_in_slots",
            data: {...data},
            metadata: {
                token: tokenSystem
            }
        }
    };

    return request;
}

// Function for making create order Request Data
function getCreateOrderRequest(data) {
    const request = {
        url: URLS.createOrder,
        type: "POST",
        data: {
            method: "web_create",
            data: data,
            metadata: {
                token: requestConst.userToken
            }
        }
    };

    return request;
}