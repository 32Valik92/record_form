function initializeCalendar(config) {
    const $calendar = $(config.calendarSelector);
    const $monthYear = $(config.monthYearSelector);
    const $dates = $(config.datesSelector);
    const $prevButton = $(config.prevButtonSelector);
    const $nextButton = $(config.nextButtonSelector);
    const slots = config.slots;

    let currentDate = new Date();

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

