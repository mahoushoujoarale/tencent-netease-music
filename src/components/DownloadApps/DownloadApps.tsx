import "./index.less";

const DownloadApps = () => {
  return (
    <div className="download-apps">
      <div className="title">网易云音乐多端下载</div>
      <div className="app-container">
        <a href="https://apps.apple.com/cn/app/id590338362" className="iPhone">
          iPhone
        </a>
        <a href="https://music.163.com/api/pc/download/latest" className="PC">
          PC
        </a>
        <a
          href="https://music.163.com/api/android/download/latest2"
          className="Android"
        >
          Android
        </a>
      </div>
      <p>同步歌单，随时畅听320k好音乐</p>
    </div>
  );
};

export default DownloadApps;
