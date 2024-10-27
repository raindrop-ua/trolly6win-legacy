export type TimeSchedule = string[];
export type TimestampSchedule = number[];

export type ScheduleForDayType = {
    weekDay: TimeSchedule;
    weekEnd: TimeSchedule;
};

export type TimestampScheduleForDayType = {
    weekDay: TimestampSchedule;
    weekEnd: TimestampSchedule;
};

export type ScheduleData = {
    [stopName: string]: ScheduleForDayType;
};

export type TimestampScheduleData = {
    [stopName: string]: TimestampScheduleForDayType;
};

export const convertToTimestamp = (time: string, timezone: string = 'Europe/Kyiv'): number => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    });
    const formattedDate = formatter.format(date);
    return new Date(formattedDate).getTime();
};

export const convertScheduleToTimestamps = (schedule: ScheduleData): TimestampScheduleData => {
    const convertedSchedule: TimestampScheduleData = {};

    Object.entries(schedule).forEach(([stopName, daySchedule]) => {
        convertedSchedule[stopName] = {
            weekDay: daySchedule.weekDay.map(time => convertToTimestamp(time)),
            weekEnd: daySchedule.weekEnd.map(time => convertToTimestamp(time)),
        };
    });

    return convertedSchedule;
};

export const isWeekend = (): boolean => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Воскресенье (0) и Суббота (6)
};
