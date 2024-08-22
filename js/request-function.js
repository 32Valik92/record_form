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

        return slotsResult
    } catch (error) {
        console.error(error);
        errResponse(error);
    }
}