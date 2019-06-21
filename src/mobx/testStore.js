import { observable, action } from 'mobx';
import HttpUtils from '../commons/utils/httpUtils';



class TestStore {

    @observable listdata = '';


    @action
    getListData() {
        HttpUtils.getRequest('', '').then(response => {
            if (response.code == 200) {
                console.log(JSON.stringify(response.result));
                this.listdata = JSON.stringify(response.result);
               
            }

        })

    }




}

const testStore = new TestStore();
export default testStore;