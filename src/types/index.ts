export interface Employee {
  id: string;
  name: string;
  area: string;
  position: string;
}

export interface ScheduleEvent {
  id: string;
  employeeId: string;
  startTime: string;
  endTime: string;
  title: string;
  color: string;
}

export interface TimeSlot {
  time: string;
  label: string;
}

export const timeSlots: TimeSlot[] = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 5; // Starting from 5 AM
  return {
    time: `${hour.toString().padStart(2, '0')}:00`,
    label: `${hour}:00${hour < 12 ? 'am' : 'pm'}`
  };
});