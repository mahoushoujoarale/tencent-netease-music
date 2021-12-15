import { makeAutoObservable, runInAction } from "mobx";

interface DataI {
  name: string;
  artist: string;
  url: string;
  cover: string;
  lrc: string;
}

const store = makeAutoObservable({
  playlist: [] as DataI[],

  get getPlaylist(): DataI[] {
    return store.playlist;
  },

  addToPlaylist(data: DataI) {
    let dataIndex: number = store.playlist.findIndex(
      (item) => item.url === data.url
    );
    runInAction(() => {
      if (dataIndex !== -1) {
        store.playlist = [
          data,
          ...store.playlist.slice(dataIndex + 1),
          ...store.playlist.slice(0, dataIndex),
        ];
      } else {
        store.playlist = [data, ...store.playlist];
      }
    });
  },
  resetPlaylist(data: DataI[]) {
    runInAction(() => {
      store.playlist = [...data];
    });
  },
  clearPlaylist() {
    store.playlist = [];
  },
});

export default store;
