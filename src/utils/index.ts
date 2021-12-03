// 转换歌曲时长
export function formatDuration(propms: string) {
  let ms: number = parseInt(propms);
  if (!ms || ms <= 0) {
    return "00:00";
  }
  const seconds: number = Math.floor(ms / 1000);
  let minute: number | string = Math.floor(seconds / 60);
  let second: number | string = seconds % 60;
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }
  return `${minute}:${second}`;
}

// 转换时间为年月日
export function formatTime(time: string, mode: number = 0) {
  const date: Date = new Date(time);
  const year: string | number = date.getFullYear();
  const month: string | number =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day: string | number =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const hour: string | number = date.getHours();
  const minute: string | number = date.getMinutes();
  // const second: number = date.getSeconds();
  if (mode === 0) return `${year}年${month}月${day}日 ${hour}:${minute}`;
  if (mode === 1) return `${year}-${month}-${day}`;
}

// 将播放量转换为汉字单位
export function formatPlayCount(playCount: number) {
  if (playCount < 0) return;
  if (playCount < 10000) {
    return playCount;
  } else if (Math.floor(playCount / 10000) < 10000) {
    return Math.floor(playCount / 1000) / 10 + "万";
  } else {
    return Math.floor(playCount / 10000000) / 10 + "亿";
  }
}

export function transfromTarget(target: number) {
  if (target === 1000) {
    return "playlist";
  } else if (target === 1) {
    return "song";
  } else if (target === 10) {
    return "album";
  } else if (target === 0 || target === 3000) {
    return "";
  } else {
    console.log("目标target出错");
  }
}
