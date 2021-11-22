export function formatPlayCount(playCount) {
    if (playCount < 0) return;
    if (playCount < 10000) {
      return playCount;
    } else if (Math.floor(playCount / 10000) < 10000) {
      return Math.floor(playCount / 1000) / 10 + "万";
    } else {
      return Math.floor(playCount / 10000000) / 10 + "亿";
    }
  };