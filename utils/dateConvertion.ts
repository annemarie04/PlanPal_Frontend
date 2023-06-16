export const toDDMMYYYY = (givenDate?: Date): string => {
    if(!givenDate)
        return "not set";
    const initialDate = new Date(givenDate);
    const timezoneOffset = initialDate.getTimezoneOffset() * 60000;
    const date = new Date(initialDate.getTime() + timezoneOffset);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    return formattedDate;
};

export const getFormattedTime = (givenDate?: Date): string => {
    if(!givenDate)
        return "not set";
    const date = new Date(givenDate);
    const timezoneOffset = date.getTimezoneOffset() / 60;
    const hour = date.getHours() + timezoneOffset;
    const minutes = date.getMinutes();
  
    const formattedHour = `${hour < 10 ? '0' : ''}${hour}`;
    const formattedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;
  
    const formattedTime = `${formattedHour}:${formattedMinutes}`;
    return formattedTime;
};

export const fromStringsToDate = (dateString: string, timeString: string) => {
    const [year, month, day] = dateString.split('-');
    const [hours, minutes] = timeString.split(':');
    const datez = new Date();
    const timezoneOffset = datez.getTimezoneOffset() / 60;
    const hour = parseInt(hours) - timezoneOffset;
    console.log("hour, timezone", hours, hour, timezoneOffset)
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hour, parseInt(minutes));
    console.log("date", date)
    return date;
}