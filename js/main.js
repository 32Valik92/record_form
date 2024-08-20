// main function for build calendar with a free time slots
function initializeCalendar(config) {
    const $calendar = $(config.calendarSelector);
    const $monthYear = $(config.monthYearSelector);
    const $dates = $(config.datesSelector);
    const $prevButton = $(config.prevButtonSelector);
    const $nextButton = $(config.nextButtonSelector);
    const slots = config.slots;

    let currentDate = new Date();

    // function for render calendar
    function renderCalendar() {
        $dates.empty();
        $monthYear.text(currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }));

        const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        const daysInWeek = 7;
        let day = 1;

        for (let i = 0; i < firstDayIndex; i++) {
            const $blankElement = $('<div>').addClass('date blank-date');
            $dates.append($blankElement);
        }

        for (let i = 0; i < lastDay; i++) {
            const $dateElement = $('<div>').addClass('date').text(day).attr('data-date', day);
            day++;
            $dateElement.on('click', function () {
                showSlots($dateElement);
            });
            $dates.append($dateElement);
        }
    }

    // function for show free slots
    function showSlots($dateElement) {
        if ($dateElement.find('.slots').length) {
            $dateElement.find('.slots').slideUp('slow', function() {
                $(this).remove();
            });
        } else {
            $('.slots').slideUp('slow', function() {
                $(this).remove();
            });

            const $slotContainer = $('<div>').addClass('slots');
            slots.forEach(slot => {
                const $slotElement = $('<div>').addClass('slot').text(slot);
                $slotElement.on('click', function () {
                    $('#timeSlot').val(slot);
                    $('#modal').fadeIn().css('display', 'flex');
                });
                $slotContainer.append($slotElement);
            });

            $dateElement.append($slotContainer);
            $slotContainer.slideDown('slow');
        }
    }

    $prevButton.on('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    $nextButton.on('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
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
async function getFirstModels(selectObj = {"_type": "model"}) {
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

