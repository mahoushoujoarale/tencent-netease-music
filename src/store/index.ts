import { makeAutoObservable, runInAction } from "mobx";

interface DataI {
  name: string;
  artist: string;
  url: string;
  cover: string;
}

const store = makeAutoObservable({
  playlist: [] as DataI[],

  get getPlaylist(): DataI[] {
    return store.playlist;
  },

  async addToPlaylist(data: DataI) {
    runInAction(() => {
      store.playlist = [data, ...store.playlist];
    });
  },
  resetPlaylist(data: DataI[]) {
    runInAction(() => {
      store.playlist = [...data];
    });
  },
});

export default store;
