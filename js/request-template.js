// Function for the request
async function ajaxRequest(requestData) {
    const {url, type, data} = requestData;

    try {
        const response = await $.ajax({
            type: type,
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        });

        return response;
    } catch (error) {
        errResponse(error);
    }
}