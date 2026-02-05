const AVAILABILITY_KEYWORD = "(agendamento)";
const LOOK_AHEAD_DAYS = 14;
const SLOT_DURATION_MINUTES = 60; 
const SLOT_STEP_MINUTES = 30; 
const BUFFER_MINUTES = 30; 
const FEMALE_DELAY_HOURS = 72; 

const staff = [
  {
    id: "luisfelipe.pipe@apontebh.com.br",
    name: "Pr. Luís Felipe (Pipe)",
    gender: "MALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Pipe.png?raw=true",
    counselingTypes: ["personally"],
  },
  {
    id: "tiagoguedes@apontebh.com.br",
    name: "Pr. Tiago Guedes",
    gender: "MALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Tiago%20Guedes.png?raw=true",
    counselingTypes: ["personally", "online"],
  },
  {
    id: "felipe.americano@apontebh.com.br",
    name: "Pr. Felipe Americano",
    gender: "MALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Felipe%20Americano.png?raw=true",
    counselingTypes: ["personally"],
  },
  {
    id: "c_9f7f5ec9f013e2e07d3d9f4b0238e459390e0696d29720a966d9451f9e18e3f6@group.calendar.google.com",
    name: "Déborah Zica",
    gender: "FEMALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Deborah.png?raw=true",
    counselingTypes: ["personally", "online"],
  },
  {
    id: "c_d02199862bc25b2d49345027c40fb190627f8ada91f9426f847b6f0dc249f66b@group.calendar.google.com",
    name: "Karine Guedes",
    gender: "FEMALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Karine%20Guedes.png?raw=true",
    counselingTypes: ["personally", "online"],
  },
  {
    id: "c_5ad67ce8ce7b8b5db4ab03b93d8ef512126ec40428eaf8bc4ee5ca0e5fb408b0@group.calendar.google.com",
    name: "Mariana Guzzoni",
    gender: "FEMALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Mari%20Guzzoni.png?raw=true",
    counselingTypes: ["personally", "online"],
  },
  {
    id: "c_59b251045fc909eaccb0c2f976ef99b2451c18e2abb4a87c53190c253ec93a0d@group.calendar.google.com",
    name: "Mary Ebenézer",
    gender: "FEMALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Logo%20(6).png?raw=true",
    counselingTypes: ["personally", "online"],
  },
];

function doGet(e) {
  if (e.parameter.action) {
    const action = e.parameter.action;
    let response;

    if (action === "get_slots") {
      // Now receives counselingType as well
      const { gender, counselingType } = e.parameter;
      response = getAvailableSlots(gender, counselingType);
    } else {
      const { date, time, gender, name, email, phone, type, reason, counselingType } = e.parameter;
      const bookingDetails = { name, email, phone, type, reason, counselingType };
      response = bookBestCalendar(date, time, gender, bookingDetails);
    }

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
      ContentService.MimeType.JSON
    );
  } else {
    return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Agendamento')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
}

function getAvailableSlots(gender, counselingType) {
  const now = new Date();
  const startDate = new Date(now);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + LOOK_AHEAD_DAYS);

  // Filter: Match Gender AND Match Counseling Type
  const eligibleStaff = staff.filter(
    (p) => (!gender || p.gender.toLowerCase() === gender.toLowerCase()) &&
           (p.counselingTypes.includes(counselingType))
  );

  const consolidatedSlots = {};

  eligibleStaff.forEach((person) => {
    try {
      let earliestStart = new Date(now);
      if (person.gender === "FEMALE") {
        earliestStart.setHours(earliestStart.getHours() + FEMALE_DELAY_HOURS);
      }

      const cal = CalendarApp.getCalendarById(person.id);
      if (!cal) return;

      const allEvents = cal.getEvents(startDate, endDate);

      const availabilityBlocks = allEvents.filter(
        (e) => e.getTitle().trim() === AVAILABILITY_KEYWORD
      );
      const busyEvents = allEvents.filter(
        (e) => e.getTitle().trim() !== AVAILABILITY_KEYWORD
      );

      availabilityBlocks.forEach((block) => {
        const blockStart = block.getStartTime();
        const blockEnd = block.getEndTime();
        
        let iterTime = new Date(blockStart);

        while (iterTime.getTime() + SLOT_DURATION_MINUTES * 60000 <= blockEnd.getTime()) {
          
          let slotStart = new Date(iterTime);
          
          // Pre-Buffer
          let preBufferStart = new Date(slotStart);
          preBufferStart.setMinutes(preBufferStart.getMinutes() - BUFFER_MINUTES);

          // Session End
          let sessionEnd = new Date(slotStart);
          sessionEnd.setMinutes(sessionEnd.getMinutes() + SLOT_DURATION_MINUTES);
          
          // Post-Buffer
          let postBufferEnd = new Date(sessionEnd);
          postBufferEnd.setMinutes(postBufferEnd.getMinutes() + BUFFER_MINUTES);

          let checkStart = (preBufferStart < blockStart) ? blockStart : preBufferStart;
          let checkEnd = (postBufferEnd > blockEnd) ? sessionEnd : postBufferEnd; 
          
          if (slotStart > now && slotStart >= earliestStart) {
            
            const isBlocked = busyEvents.some((busy) => {
              return (
                Math.max(checkStart.getTime(), busy.getStartTime().getTime()) <
                Math.min(checkEnd.getTime(), busy.getEndTime().getTime())
              );
            });

            if (!isBlocked) {
              const dateStr = Utilities.formatDate(
                slotStart,
                Session.getScriptTimeZone(),
                "yyyy-MM-dd"
              );
              const timeStr = Utilities.formatDate(
                slotStart,
                Session.getScriptTimeZone(),
                "HH:mm"
              );

              if (!consolidatedSlots[dateStr]) {
                consolidatedSlots[dateStr] = new Set();
              }
              consolidatedSlots[dateStr].add(timeStr);
            }
          }

          iterTime.setMinutes(iterTime.getMinutes() + SLOT_STEP_MINUTES);
        }
      });
    } catch (e) {
      console.error(`Error with ${person.name}: ${e}`);
    }
  });

  const result = Object.keys(consolidatedSlots)
    .sort()
    .map((date) => {
      return {
        date: date,
        times: Array.from(consolidatedSlots[date]).sort(),
      };
    });

  return result;
}

function bookBestCalendar(dateStr, timeStr, gender, details) {
  const parts = dateStr.split('-');
  const timeParts = timeStr.split(':');
  const hour = Number(timeParts[0]);
  const minute = Number(timeParts[1]);

  const slotStart = new Date(parts[0], parts[1] - 1, parts[2], hour, minute, 0);
  const sessionEnd = new Date(slotStart);
  sessionEnd.setMinutes(sessionEnd.getMinutes() + SLOT_DURATION_MINUTES);

  const idealConsumptionStart = new Date(slotStart);
  idealConsumptionStart.setMinutes(idealConsumptionStart.getMinutes() - BUFFER_MINUTES);

  const idealConsumptionEnd = new Date(sessionEnd);
  idealConsumptionEnd.setMinutes(idealConsumptionEnd.getMinutes() + BUFFER_MINUTES);

  const startOfWeek = new Date(slotStart);
  startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() || 7) + 1);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  let bestCandidate = null;
  let minBusyMillis = Infinity;
  let bestAvailabilityEvent = null;
  let finalCutStart = null;
  let finalCutEnd = null;

  // Filter by Gender AND Counseling Type
  const eligibleStaff = staff.filter(
    (p) => (!gender || p.gender.toLowerCase() === gender.toLowerCase()) &&
           (p.counselingTypes.includes(details.counselingType))
  );

  eligibleStaff.forEach((person) => {
    try {
      if (person.gender === 'FEMALE') {
         const now = new Date();
         const minStart = new Date(now.getTime() + (FEMALE_DELAY_HOURS * 60 * 60 * 1000));
         if (slotStart < minStart) return; 
      }

      const cal = CalendarApp.getCalendarById(person.id);
      if (!cal) return;

      const events = cal.getEvents(slotStart, sessionEnd);
      
      const availEvent = events.find(
        (e) => e.getTitle().trim() === AVAILABILITY_KEYWORD
      );
      
      const hasConflict = events.some(
        (e) => e.getTitle().trim() !== AVAILABILITY_KEYWORD
      );

      if (availEvent && !hasConflict) {
        
        const blockStart = availEvent.getStartTime();
        const blockEnd = availEvent.getEndTime();

        const actualCutStart = (idealConsumptionStart < blockStart) ? blockStart : idealConsumptionStart;
        const actualCutEnd = (idealConsumptionEnd > blockEnd) ? blockEnd : idealConsumptionEnd;

        let bufferConflict = false;

        if (actualCutStart < slotStart) {
           const preEvents = cal.getEvents(actualCutStart, slotStart);
           if (preEvents.some(e => e.getTitle().trim() !== AVAILABILITY_KEYWORD)) bufferConflict = true;
        }

        if (!bufferConflict && sessionEnd < actualCutEnd) {
           const postEvents = cal.getEvents(sessionEnd, actualCutEnd);
           if (postEvents.some(e => e.getTitle().trim() !== AVAILABILITY_KEYWORD)) bufferConflict = true;
        }

        if (!bufferConflict) {
          const weeklyEvents = cal.getEvents(startOfWeek, endOfWeek);
          let totalBusyMillis = 0;

          weeklyEvents.forEach((e) => {
            if (e.getTitle().trim() !== AVAILABILITY_KEYWORD && !e.isAllDayEvent()) {
              totalBusyMillis += e.getEndTime() - e.getStartTime();
            }
          });

          if (totalBusyMillis < minBusyMillis) {
            minBusyMillis = totalBusyMillis;
            bestCandidate = person;
            bestAvailabilityEvent = availEvent;
            finalCutStart = actualCutStart;
            finalCutEnd = actualCutEnd;
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  });

  if (bestCandidate && bestAvailabilityEvent && finalCutStart && finalCutEnd) {
    try {
      const cal = CalendarApp.getCalendarById(bestCandidate.id);

      const loc = details.counselingType === 'online' ? 'Google Meet / Online' : 'Presencial';
      const typeLabel = details.counselingType === 'online' ? '(Online)' : '(Presencial)';

      const description = [
        `Nome: ${details.name}`,
        `Email: ${details.email}`,
        `Telefone: ${details.phone}`,
        `Modalidade: ${details.counselingType}`,
        `Motivo: ${details.reason}`,
        `----------------`,
        `Agendado via Sistema`
      ].join('\n');

      const title = `${details.type} ${typeLabel}: ${details.name}`;

      cal.createEvent(title, slotStart, sessionEnd, {
        description: description,
        location: loc
      });

      consumeAvailability(cal, bestAvailabilityEvent, finalCutStart, finalCutEnd);

      return {
        id: bestCandidate.id,
        name: bestCandidate.name,
        imageUrl: bestCandidate.imageUrl,
        status: "confirmed",
        date: dateStr,
        time: timeStr,
        location: loc
      };
    } catch (e) {
      return { error: "Booking failed", details: e.message };
    }
  }

  return { error: "No slots available", status: "failed" };
}

function consumeAvailability(calendar, availEvent, voidStart, voidEnd) {
  const availStart = availEvent.getStartTime();
  const availEnd = availEvent.getEndTime();

  if (availStart.getTime() === voidStart.getTime() && availEnd.getTime() === voidEnd.getTime()) {
    availEvent.deleteEvent();
  }
  else if (availStart.getTime() === voidStart.getTime()) {
    availEvent.setTime(voidEnd, availEnd);
  }
  else if (availEnd.getTime() === voidEnd.getTime()) {
    availEvent.setTime(availStart, voidStart);
  }
  else {
    availEvent.setTime(availStart, voidStart);
    calendar.createEvent(AVAILABILITY_KEYWORD, voidEnd, availEnd);
  }
}
