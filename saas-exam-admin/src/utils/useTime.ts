import dayjs from "dayjs";

/**
 * 格式化时间
 * @param time 
 */
export function formatTime(time: string, format?: string) {
  return dayjs(time).format(format ?? 'YYYY-MM-DD mm:ss:hh')
}