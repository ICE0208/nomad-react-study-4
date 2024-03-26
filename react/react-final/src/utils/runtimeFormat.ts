export function runtimeGetHour(time: number) {
  return Math.floor(time / 60);
}
export function runtimeGetMinute(time: number) {
  return time % 60;
}
