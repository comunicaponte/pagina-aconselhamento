const AVAILABILITY_KEYWORD = "(agendamento)";
const LOOK_AHEAD_DAYS = 30;
const SLOT_DURATION_MINUTES = 60;
const SLOT_STEP_MINUTES = 30;
const BUFFER_MINUTES = 30;

const staff = [{
    id: "luisfelipe.pipe@apontebh.com.br",
    contactEmail: "luisfelipe.pipe@apontebh.com.br",
    name: "Pr. Luís Felipe (Pipe)",
    gender: "MALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Pipe.png?raw=true",
    counselingAddress: "Rua Castelo de Sintra, 910, sala 36 - Galeria Dona Marli",
    counselingTypes: ["personally"],
    maxDailySlots: 3,
    maxWeeklySlots: 21,
    minDelayHours: 24
  },
  {
    id: "tiagoguedes@apontebh.com.br",
    contactEmail: "alvesarthurgalo@gmail.com",
    name: "Pr. Tiago Guedes",
    gender: "MALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Tiago%20Guedes.png?raw=true",
    counselingAddress: "Rua Castelo de Sintra, 910, sala 35 - Galeria Dona Marli",
    counselingTypes: ["personally", "online"],
    maxDailySlots: 3,
    maxWeeklySlots: 21,
    minDelayHours: 24
  },
  {
    id: "felipe.americano@apontebh.com.br",
    contactEmail: "felipe.americano@apontebh.com.br",
    name: "Pr. Felipe Americano",
    gender: "MALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Felipe%20Americano.png?raw=true",
    counselingAddress: "Rua Castelo de Sintra, 910, sala 34 - Galeria Dona Marli",
    counselingTypes: ["personally"],
    maxDailySlots: 3,
    maxWeeklySlots: 21,
    minDelayHours: 24
  },
  {
    id: "celio@apontebh.com.br",
    contactEmail: "celio@apontebh.com.br",
    name: "Pr. Célio Silva",
    gender: "MALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/C%C3%A9lio.png?raw=true",
    counselingAddress: "Rua Castelo de Sintra, 968, 2º andar - A Ponte BH",
    counselingTypes: ["personally", "online"],
    maxDailySlots: 3,
    maxWeeklySlots: 21,
    minDelayHours: 24
  },
  {
    id: "c_d715b4d21215b8b6ddbe047e6eabbde8e23298b95be0ccbe9f97d8f9ccb4a3e8@group.calendar.google.com",
    contactEmail: "germano@apontebh.com.br",
    name: "Germano Alves",
    gender: "MALE",
    imageUrl: "",
    counselingAddress: "Rua Castelo de Sintra, 968, 2º andar - A Ponte BH",
    counselingTypes: ["personally", "online"],
    maxDailySlots: 2,
    maxWeeklySlots: 14,
    minDelayHours: 24
  },
  {
    id: "c_7a719c1aae8a29117abd974134bf2e03a432c61b4e1d97837e4c2715ccd99019@group.calendar.google.com",
    contactEmail: "sulanio@apontebh.com.br",
    name: "Sulânio Hiderick",
    gender: "MALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Sula%CC%80nio.jpeg?raw=true",
    counselingAddress: "Rua Castelo de Sintra, 968, 2º andar - A Ponte BH",
    counselingTypes: ["personally", "online"],
    maxDailySlots: 2,
    maxWeeklySlots: 14,
    minDelayHours: 24
  },
  {
    id: "c_9f7f5ec9f013e2e07d3d9f4b0238e459390e0696d29720a966d9451f9e18e3f6@group.calendar.google.com",
    contactEmail: "deborah@apontebh.com.br",
    name: "Déborah Zica",
    gender: "FEMALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Deborah.png?raw=true",
    counselingAddress: "Rua Castelo de Sintra, 968, 2º andar - A Ponte BH",
    counselingTypes: ["personally", "online"],
    maxDailySlots: 2,
    maxWeeklySlots: 2,
    minDelayHours: 72
  },
  {
    id: "c_d02199862bc25b2d49345027c40fb190627f8ada91f9426f847b6f0dc249f66b@group.calendar.google.com",
    contactEmail: "karine@apontebh.com.br",
    name: "Karine Guedes",
    gender: "FEMALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Karine%20Guedes.png?raw=true",
    counselingAddress: "Rua Castelo de Sintra, 968, 2º andar - A Ponte BH",
    counselingTypes: ["personally", "online"],
    maxDailySlots: 1,
    maxWeeklySlots: 1,
    minDelayHours: 72
  },
  {
    id: "c_5ad67ce8ce7b8b5db4ab03b93d8ef512126ec40428eaf8bc4ee5ca0e5fb408b0@group.calendar.google.com",
    contactEmail: "mariana@apontebh.com.br",
    name: "Mariana Guzzoni",
    gender: "FEMALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Mari%20Guzzoni.png?raw=true",
    counselingAddress: "Rua Castelo de Sintra, 968, 2º andar - A Ponte BH",
    counselingTypes: ["personally", "online"],
    maxDailySlots: 1,
    maxWeeklySlots: 1,
    minDelayHours: 72
  },
  {
    id: "c_59b251045fc909eaccb0c2f976ef99b2451c18e2abb4a87c53190c253ec93a0d@group.calendar.google.com",
    contactEmail: "mary@apontebh.com.br",
    name: "Mary Ebenézer",
    gender: "FEMALE",
    imageUrl: "https://github.com/comunicaponte/site-a-ponte/blob/main/images/Logo%20(6).png?raw=true",
    counselingAddress: "Rua Castelo de Sintra, 968, 2º andar - A Ponte BH",
    counselingTypes: ["personally", "online"],
    maxDailySlots: 1,
    maxWeeklySlots: 1,
    minDelayHours: 72
  },
];

function doGet(e) {
  if (e.parameter.action) {
    const action = e.parameter.action;
    let response;

    if (action === "get_slots") {
      const {
        gender,
        counselingType
      } = e.parameter;
      response = getAvailableSlots(gender, counselingType);
    } else {
      const {
        date,
        time,
        gender,
        name,
        email,
        phone,
        type,
        reason,
        counselingType
      } = e.parameter;
      const bookingDetails = {
        name,
        email,
        phone,
        type,
        reason,
        counselingType
      };
      response = bookBestCalendar(date, time, gender, bookingDetails);
    }

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
      ContentService.MimeType.JSON
    );
  } else {

    try {
      return HtmlService.createHtmlOutputFromFile('index')
        .setTitle('Agendamento')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
    } catch (e) {
      return ContentService.createTextOutput("Serviço de Agendamento Ativo.");
    }
  }
}

function getWeekKey(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy-MM-dd");
}

function getUsageCounts(events) {
  const daily = {};
  const weekly = {};

  events.forEach(e => {
    if (e.getTitle().trim() !== AVAILABILITY_KEYWORD && !e.isAllDayEvent()) {
      const start = e.getStartTime();
      const dateKey = Utilities.formatDate(start, Session.getScriptTimeZone(), "yyyy-MM-dd");
      const weekKey = getWeekKey(start);

      daily[dateKey] = (daily[dateKey] || 0) + 1;
      weekly[weekKey] = (weekly[weekKey] || 0) + 1;
    }
  });

  return {
    daily,
    weekly
  };
}

function getAvailableSlots(gender, counselingType) {
  const now = new Date();
  const startDate = new Date(now);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + LOOK_AHEAD_DAYS);

  const eligibleStaff = staff.filter(
    (p) => (!gender || p.gender.toLowerCase() === gender.toLowerCase()) &&
    (p.counselingTypes.includes(counselingType))
  );

  const consolidatedSlots = {};

  eligibleStaff.forEach((person) => {
    try {

      let earliestStart = new Date(now);
      const delayHours = person.minDelayHours || 0;
      earliestStart.setHours(earliestStart.getHours() + delayHours);

      const cal = CalendarApp.getCalendarById(person.id);
      if (!cal) return;

      const allEvents = cal.getEvents(startDate, endDate);
      const usage = getUsageCounts(allEvents);

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

          const dateKey = Utilities.formatDate(slotStart, Session.getScriptTimeZone(), "yyyy-MM-dd");
          const weekKey = getWeekKey(slotStart);

          const currentDailyCount = usage.daily[dateKey] || 0;
          const currentWeeklyCount = usage.weekly[weekKey] || 0;

          if (currentDailyCount >= person.maxDailySlots || currentWeeklyCount >= person.maxWeeklySlots) {
            iterTime.setMinutes(iterTime.getMinutes() + SLOT_STEP_MINUTES);
            continue;
          }

          let preBufferStart = new Date(slotStart);
          preBufferStart.setMinutes(preBufferStart.getMinutes() - BUFFER_MINUTES);

          let sessionEnd = new Date(slotStart);
          sessionEnd.setMinutes(sessionEnd.getMinutes() + SLOT_DURATION_MINUTES);

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
              const dateStr = dateKey;
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

  const tempDate = new Date(slotStart);
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() - tempDate.getDay());
  const targetWeekKey = Utilities.formatDate(tempDate, Session.getScriptTimeZone(), "yyyy-MM-dd");
  const targetDateKey = dateStr;


  const loadStart = new Date(tempDate);
  const loadEnd = new Date(loadStart);
  loadEnd.setDate(loadEnd.getDate() + 7);

  let bestCandidate = null;
  let minBusyMillis = Infinity;
  let bestAvailabilityEvent = null;
  let finalCutStart = null;
  let finalCutEnd = null;

  const eligibleStaff = staff.filter(
    (p) => (!gender || p.gender.toLowerCase() === gender.toLowerCase()) &&
    (p.counselingTypes.includes(details.counselingType))
  );

  eligibleStaff.forEach((person) => {
    try {

      const now = new Date();
      const delayHours = person.minDelayHours || 0;
      const minStart = new Date(now.getTime() + (delayHours * 60 * 60 * 1000));

      if (slotStart < minStart) return;

      const cal = CalendarApp.getCalendarById(person.id);
      if (!cal) return;

      const weekEvents = cal.getEvents(loadStart, loadEnd);
      const usage = getUsageCounts(weekEvents);

      const currentDaily = usage.daily[targetDateKey] || 0;
      const currentWeekly = usage.weekly[targetWeekKey] || 0;


      if (currentDaily >= person.maxDailySlots || currentWeekly >= person.maxWeeklySlots) {
        return;
      }

      const eventsAtSlot = cal.getEvents(slotStart, sessionEnd);

      const availEvent = eventsAtSlot.find(
        (e) => e.getTitle().trim() === AVAILABILITY_KEYWORD
      );

      const hasConflict = eventsAtSlot.some(
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

          let totalBusyMillis = 0;
          weekEvents.forEach((e) => {
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
        `Modalidade: ${details.counselingType === "online" ? "On-line" : "Presencial"}`,
        `Motivo: ${details.reason}`,
        `----------------`,
        `Agendado via Sistema`
      ].join('\n');

      const title = `${details.type} ${typeLabel}: ${details.name}`;

      const createdEvent = cal.createEvent(title, slotStart, sessionEnd, {
        description: description,
        location: loc
      });

      consumeAvailability(cal, bestAvailabilityEvent, finalCutStart, finalCutEnd);

      sendAppointmentEmails(details, bestCandidate, dateStr, timeStr);

      return {
        id: bestCandidate.id,
        name: bestCandidate.name,
        imageUrl: bestCandidate.imageUrl,
        status: "confirmed",
        counselingAddress: bestCandidate.counselingAddress,
        date: dateStr,
        time: timeStr,
        location: loc
      };
    } catch (e) {
      return {
        error: "Booking failed",
        details: e.message
      };
    }
  }

  return {
    error: "No slots available",
    status: "failed"
  };
}

function consumeAvailability(calendar, availEvent, voidStart, voidEnd) {
  const availStart = availEvent.getStartTime();
  const availEnd = availEvent.getEndTime();

  if (availStart.getTime() === voidStart.getTime() && availEnd.getTime() === voidEnd.getTime()) {
    availEvent.deleteEvent();
  } else if (availStart.getTime() === voidStart.getTime()) {
    availEvent.setTime(voidEnd, availEnd);
  } else if (availEnd.getTime() === voidEnd.getTime()) {
    availEvent.setTime(availStart, voidStart);
  } else {
    availEvent.setTime(availStart, voidStart);
    calendar.createEvent(AVAILABILITY_KEYWORD, voidEnd, availEnd);
  }
}

/**
 * Função auxiliar para enviar e-mails de confirmação usando GmailApp
 * Design baseado na identidade visual do app (Teal/Slate)
 */
function sendAppointmentEmails(details, counselor, dateStr, timeStr) {
  try {
    const parts = dateStr.split('-');
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

    const isOnline = details.counselingType === "online";
    const modeText = isOnline ? "On-line" : "Presencial";

    const locationInfo = isOnline ?
      "Link do Google Meet (verifique o convite na sua agenda)" :
      (counselor.counselingAddress || "Endereço a confirmar");

    const emailSubject = `Agendamento Confirmado: ${details.type} com ${counselor.name}`;

    const colors = {
      bgBody: "#0f172a",
      bgCard: "#ffffff",
      primary: "#0d9488",
      primaryLight: "#ccfbf1",
      textDark: "#334155",
      textGray: "#64748b",
      border: "#e2e8f0"
    };

    const htmlTemplate = (isForCounselor) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmação de Agendamento</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: ${colors.bgBody}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.bgBody}; padding: 40px 10px;">
          <tr>
            <td align="center">
              
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: ${colors.bgCard}; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
                
                <tr>
                  <td style="background-color: ${colors.primary}; padding: 30px 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #ffffff;">Aconselhamento</h1>
                    <p style="margin: 5px 0 0 0; font-size: 14px; color: ${colors.primaryLight};">
                      ${isForCounselor ? 'Novo agendamento recebido' : 'Seu horário foi confirmado'}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 30px;">
                    
                    <h2 style="margin-top: 0; margin-bottom: 20px; font-size: 18px; color: ${colors.textDark}; font-weight: 600;">
                      Detalhes do Encontro
                    </h2>

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 15px; color: ${colors.textDark};">
                      
                      <tr>
                        <td style="padding-bottom: 12px; border-bottom: 1px solid ${colors.border}; width: 30px;">
                          📅
                        </td>
                        <td style="padding-bottom: 12px; border-bottom: 1px solid ${colors.border}; padding-left: 10px;">
                          <strong>Data:</strong> ${formattedDate} às ${timeStr}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
                          👤
                        </td>
                        <td style="padding: 12px 0 12px 10px; border-bottom: 1px solid ${colors.border};">
                          <strong>Conselheiro(a):</strong> ${counselor.name}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
                          ${isOnline ? '💻' : '📍'}
                        </td>
                        <td style="padding: 12px 0 12px 10px; border-bottom: 1px solid ${colors.border};">
                          <strong>Modalidade:</strong> ${modeText}
                        </td>
                      </tr>

                       <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border}; vertical-align: top;">
                          🗺️
                        </td>
                        <td style="padding: 12px 0 12px 10px; border-bottom: 1px solid ${colors.border};">
                          <strong>Local:</strong><br>
                          <span style="color: ${colors.textGray}; font-size: 14px;">${locationInfo}</span>
                        </td>
                      </tr>

                      ${isForCounselor ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
                           📋
                        </td>
                        <td style="padding: 12px 0 12px 10px; border-bottom: 1px solid ${colors.border};">
                          <strong>Aconselhado(a):</strong> ${details.name}
                        </td>
                      </tr>
                      <tr>
                         <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border}; vertical-align: top;">
                           💬
                        </td>
                        <td style="padding: 12px 0 12px 10px; border-bottom: 1px solid ${colors.border};">
                          <strong>Motivo:</strong><br>
                          <span style="color: ${colors.textGray}; font-size: 14px;">${details.reason}</span>
                        </td>
                      </tr>
                      <tr>
                         <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
                           📞
                        </td>
                        <td style="padding: 12px 0 12px 10px; border-bottom: 1px solid ${colors.border};">
                          <strong>Contato:</strong> ${details.phone} <br> ${details.email}
                        </td>
                      </tr>
                      ` : ''}

                    </table>

                    <div style="margin-top: 30px; text-align: center;">
                      <p style="font-size: 13px; color: ${colors.textGray}; line-height: 1.5;">
                        Caso precise cancelar ou remarcar, por favor entre em contato com antecedência.
                      </p>
                      ${!isOnline ? `
                      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(counselor.counselingAddress)}" target="_blank" style="display: inline-block; margin-top: 10px; text-decoration: none; color: ${colors.primary}; font-weight: bold; font-size: 14px;">
                        Ver localização no mapa →
                      </a>
                      ` : ''}
                    </div>

                  </td>
                </tr>
              </table>
              
              <p style="margin-top: 20px; font-size: 12px; color: #64748b; text-align: center;">
                Agendamento realizado via A Ponte BH
              </p>

            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    if (details.email) {
      GmailApp.sendEmail(
        details.email,
        emailSubject,
        "Seu cliente de e-mail não suporta visualização HTML.", {
          htmlBody: htmlTemplate(false),
          name: "Agendamento - A Ponte"
        }
      );
    }

    if (counselor.contactEmail && counselor.contactEmail.includes("@")) {
      GmailApp.sendEmail(
        counselor.contactEmail,
        `[NOVO AGENDAMENTO] ${details.name} - ${formattedDate}`,
        "Seu cliente de e-mail não suporta visualização HTML.", {
          htmlBody: htmlTemplate(true),
          name: "Sistema de Agendamento"
        }
      );
    }

  } catch (e) {
    console.error("Erro ao enviar e-mails via GmailApp: " + e.message);

  }
}
