import { makeAutoObservable } from 'mobx';

class AnimeStore {
    animeList = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAnimeList(list) {
        this.animeList = list;
    }
}

export default AnimeStore;