


import TestStore from './testStore';



//进行每个store的添加
class RootStore {

    constructor() {
        this.testStore = TestStore;
    }
}

export default new RootStore()