import { observable, action } from 'mobx';
import HttpUtils from '../commons/utils/httpUtils';
import { Toast } from 'teaset';


let curList = [];
let curListSecond = [];

class TestStore {

    @observable listdata = '';
    @observable textname = 'pppp';


    // @observable currentPage = 1;
    @observable pageSize = 2;
    @observable listData = [];
    @observable refreshStatus = false;
    @observable listEndPageStatus = false;
    @observable totalPages = 1;

    @observable pageSizeSecond = 2;
    @observable listDataSecond = [];
    @observable refreshStatusSecond = false;
    @observable listEndPageStatusSecond = false;
    @observable totalPagesSecond = 1;


    @observable tabStatus = 1;

    @action
    resetListData() {
        this.currentPage = 1;
        this.listData = [];
    }
    @action
    resetListDataSecond() {
        this.listDataSecond = [];
    }

    @action
    getListData(currentPage) {
        try {

            let params = {
                noArr: 'CONFIGURATION00000035',
                currentPage: currentPage,
                pageSize: this.pageSize
            }
            HttpUtils.getRequest('https://192.168.76.120/tCmchatArticle/selectCxmyArticleList', params).then(response => {
                // console.log(response)
                if (response.status == '0000') {
                    this.totalPages = response.data.pages;
                    if (currentPage == 1) {
                        curList = response.data.list;
                    } else {
                        curList = curList.concat(response.data.list);
                    }

                    if (currentPage >= response.data.pages) {
                        this.listEndPageStatus = true;
                    }

                    this.listData = curList;
                    // console.log(this.listData)
                } else {
                    Toast.message('处理返回的错误信息')
                }
                this.refreshStatus = false;
            })

        } catch (error) {
            this.refreshStatus = false;
        }

    }


    @action
    getSecondListData(currentPage) {
        try {

            let params = {
                noArr: 'CONFIGURATION00000035',
                currentPage: currentPage,
                pageSize: this.pageSizeSecond
            }
            HttpUtils.getRequest('https://192.168.76.120/tCmchatArticle/selectCxmyArticleList', params).then(response => {
                // console.log(response)
                if (response.status == '0000') {
                    this.totalPagesSecond = response.data.pages;
                    if (currentPage == 1) {
                        curListSecond = response.data.list;
                    } else {
                        curListSecond = curListSecond.concat(response.data.list);
                    }

                    if (currentPage >= response.data.pages) {
                        this.listEndPageStatusSecond = true;
                    }

                    this.listDataSecond = curListSecond;
                } else {
                    Toast.message('处理返回的错误信息')
                }
                this.refreshStatusSecond = false;
            })

        } catch (error) {
            this.refreshStatusSecond = false;
        }

    }


}


export default new TestStore();