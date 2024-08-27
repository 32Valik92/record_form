// main function for building a calendar with free time slots
function initializeCalendar(config) {
    const $calendar = $(config.calendarSelector);
    const $monthYear = $(config.monthYearSelector);
    const $dates = $(config.datesSelector);
    const $prevButton = $(config.prevButtonSelector);
    const $nextButton = $(config.nextButtonSelector);

    let currentDate = new Date();
    let activeDateElement = null; // Variable to keep track of the currently active date element

    // Function to render the calendar
    function renderCalendar() {
        $dates.empty();
        $monthYear.text(currentDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long'}));

        const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        let day = 1;

        for (let i = 0; i < firstDayIndex; i++) {
            const $blankElement = $('<div>').addClass('date blank-date');
            $dates.append($blankElement);
        }

        for (let i = 0; i < lastDay; i++) {
            const $dateElement = $('<div>').addClass('date').text(day).attr('data-date', day);
            day++;
            $dateElement.on('click', async function () {
                // Hide slots from the previously selected date if any
                if (activeDateElement && activeDateElement[0] !== $dateElement[0]) {
                    activeDateElement.find('.slots').slideUp('slow', function () {
                        $(this).remove();
                    });
                }

                if (!$dateElement.find('.slots').length) {
                    const roundedOffset = parseFloat((timeZoneObjectData.offset / 3600).toFixed(2));

                    await showSlots($dateElement, roundedOffset);
                } else {
                    $dateElement.find('.slots').slideUp('slow', function () {
                        $(this).remove();
                    });
                }

                // Update the active date element
                activeDateElement = $dateElement;
            });
            $dates.append($dateElement);
        }
    }

    // Function to request free slots and build them
    async function showSlots($dateElement, roundedOffset) {
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), $dateElement.data('date'));

        // Формуємо об'єкт з датами в UNIX-форматі (в секундах, 10 знаків)
        const searchTimeFrom = Math.floor(selectedDate.getTime() / 1000); // Початок дня в секундах
        const searchTimeTo = Math.floor(new Date(selectedDate.setHours(23, 59, 59, 999)).getTime() / 1000); // Кінець дня в секундах

        const searchObject = {
            service_station_id: requestConst.sto_id,
            search_time_from: searchTimeFrom,
            search_time_to: searchTimeTo
        };

        try {
            // Виклик функції для отримання слотів
            const slots = await getFreeSlots(searchObject);

            if (!Array.isArray(slots) || slots.length === 0) {
                // Якщо слотів немає, показуємо модальне вікно
                createNoSlotsModal();
                $('#modalOverlay').fadeIn();
                $('#modalNoSlots').fadeIn();

                setTimeout(() => {
                    $('#modalOverlay').fadeOut();
                    $('#modalNoSlots').fadeOut();
                }, 1000);

                return; // Виходимо, якщо слотів немає
            }

            const $slotContainer = $('<div>').addClass('slots');

            slots.forEach(slot => {
                const timeFromDate = new Date(slot.time_from * 1000);

                // Форматування часу у вигляді "година:хвилина"
                const slotText = `${timeFromDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })} - ${new Date(slot.time_to * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;

                // Форматування часу у вигляді ISO з зміщенням roundedOffset
                const general___start_dateISO = new Date(timeFromDate.getTime() + roundedOffset * 60 * 60 * 1000).toISOString();

                const $slotElement = $('<div>').addClass('slot').text(slotText);
                $slotElement.on('click', function () {
                    $('#timeSlot')
                        .val(slotText)
                        .data('general___start_time', timeFromDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        }))
                        .data('general___start_date', general___start_dateISO);

                    $('#modal').fadeIn().css('display', 'flex');
                });
                $slotContainer.append($slotElement);
            });

            $dateElement.append($slotContainer);
            $slotContainer.slideDown('slow');

        } catch (error) {
            console.error('Error fetching free slots:', error);
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

    createNoSlotsModal(); // Move this to avoid initial display
    renderCalendar();
}

function createNoSlotsModal() {
    if (!$('#modalNoSlots').length) {
        // Create the overlay for the full-screen modal
        const $overlay = $('<div>')
            .attr('id', 'modalOverlay');

        // Create the modal box
        const $modalNoSlots = $('<div>No available slots</div>')
            .attr('id', 'modalNoSlots');
        // Append modal and overlay to body
        $('body').append($overlay);
        $('body').append($modalNoSlots);

        // Optional: Hide modal on overlay click
        $overlay.on('click', function () {
            $overlay.fadeOut();
            $modalNoSlots.fadeOut();
        });
    }
}

// for checking required inputs in form
function validateInputs() {
    const firstname = $('#firstname').val().trim();
    const phone = $('#phone').val().trim();

    // Перевірка, чи обидва поля заповнені
    if (firstname !== '' && phone !== '') {
        $('#submitForm').prop('disabled', false); // Розблокувати кнопку
    } else {
        $('#submitForm').prop('disabled', true);  // Заблокувати кнопку
    }
}