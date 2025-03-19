import AnimeStore from './animeStore';

class RootStore {
    animeStore: AnimeStore;

    constructor() {
        this.animeStore = new AnimeStore();
    }
}

export default RootStore;