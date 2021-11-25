export function formatTime(time: string) {
  const date: Date = new Date(time);
  const year: string | number = date.getFullYear();
  const month: string | number =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day: string | number = date.getDate();
  const hour: string | number = date.getHours();
  const minute: string | number = date.getMinutes();
  // const second: number = date.getSeconds();
  return `${year}年${month}月${day}日 ${hour}:${minute}`;
}
