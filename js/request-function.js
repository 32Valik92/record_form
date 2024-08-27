// Function to get time ZoneId
async function getTimeZoneId(sto_id) {
    const TimeZoneIdRequest = getTimeZoneIdRequest(sto_id);

    try {
        const {result: timeZoneIdArr} = await ajaxRequest(TimeZoneIdRequest);

        const [{timezone_id} = {}] = timeZoneIdArr || [];

        return timezone_id;
    } catch (error) {
        console.error(error);
        errResponse(error);
    }
}

// Function to get time Zone data
async function getTimeZoneData(TimeZoneId) {
    const TimeZoneDataRequest = getTimeZoneDataRequest(TimeZoneId);

    try {
        const {result: timeZoneData} = await ajaxRequest(TimeZoneDataRequest);

        const [timeZone = {}] = timeZoneData || [];

        return timeZone;
    } catch (error) {
        console.error(error);
        errResponse(error);
    }
}

// Function to get time Zone data
async function getOrderTemplateData(sto_id) {
    const OrderTemplateRequest = getOrderTemplateRequest(sto_id);

    try {
        const {result} = await ajaxRequest(OrderTemplateRequest);

        const regex = /^fixiq\.\d+$/;

        if (Array.isArray(result) && result.length > 0) {
            if (Array.isArray(result[0].order_settings) && result[0].order_settings.length > 0) {
                result[0].order_settings.forEach((item) => {
                    if (item.name && regex.test(item.name)) {
                        createOrderObject.order_settings_template_id = item.custom_id;
                    }
                });
            }
        }

    } catch (error) {
        console.error(error);
        errResponse(error);
    }
}

// Function for getting Brands array
async function getBrands(selectObj = {"_type": "brand"}) {
    const brandsRequest = getBrandsRequest(selectObj);

    try {
        const {result: brandsResult} = await ajaxRequest(brandsRequest);

        if (Array.isArray(brandsResult) && brandsResult.length > 0) {
            $('#brand').empty();
            $('#brand').append('<option value="" disabled selected hidden></option>');


            const newOptions = brandsResult.map(brand => {
                return $("<option></option>")
                    .attr("value", brand.brand_name_inscription)
                    .attr("data-brand", JSON.stringify(brand))
                    .text(brand.brand_name_inscription);
            });


            $('#brand').append(newOptions);
        }
    } catch (error) {
        console.error(error);
        errResponse(error);
    }
}

// Function for getting Models array
async function getModels(selectObj = {"_type": "model"}) {
    const modelsRequest = getModelsRequest(selectObj);

    try {
        const {result: modelsResult} = await ajaxRequest(modelsRequest);

        if (Array.isArray(modelsResult) && modelsResult.length > 0) {
            $('#model').empty();
            $('#model').append('<option value="" disabled selected hidden></option>');

            const newOptions = modelsResult.map(model => {
                return $("<option></option>")
                    .attr("value", model.model_name_inscription)
                    .attr("data-model", JSON.stringify(model))
                    .text(model.model_name_inscription);
            });

            $('#model').append(newOptions);
        }
    } catch (error) {
        console.error(error);
        errResponse(error);
    }
}

// Function to get free slots from the server
async function getFreeSlots(dataObj) {
    const slotsRequest = getFreeSlotsRequest(dataObj);

    try {
        const {result: slotsResult} = await ajaxRequest(slotsRequest);

        return slotsResult;
    } catch (error) {
        console.error(error);
        errResponse(error);
    }
}

// Function for create request
async function createOrder(dataObj) {
    const orderObject = getCreateOrderRequest(dataObj);
    console.log(orderObject)
    try {
        const result = await ajaxRequest(orderObject);

        return result;
    } catch (error) {
        console.error(error);
        errResponse(error);
    }
}