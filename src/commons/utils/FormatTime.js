
export class FormatTime {
    static formatMediaTime(duration) {
        let min = Math.floor(duration / 60)
        let second = duration - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }

    static timeTohhmmss(seconds) {
        let hh, mm, ss

        if (seconds === null || seconds < 0) return

        let pseconds = parseInt(seconds)

        //得到小时
        hh = pseconds / 3600 | 0

        pseconds = parseInt(pseconds) - parseInt(hh) * 3600

        if (parseInt(hh) < 10) {
            hh = "0" + hh
        }

        if (parseInt(hh) >= 24) {
            hh = "00"
        }

        //得到分钟
        mm = parseInt(pseconds) / 60 | 0

        //得到秒
        ss = parseInt(pseconds) - parseInt(mm) * 60

        if (parseInt(mm) < 10) {
            mm = "0" + mm
        }

        if (parseInt(ss) < 10) {
            ss = "0" + ss
        }

        return hh + ":" + mm + ":" + ss
    }

    static getTodayDate() {
        let now = new Date()
        let yy = now.getFullYear()
        let mm = now.getMonth() + 1
        let dd = now.getDate()
        let day = new Array()
        day[0] = "星期日"
        day[1] = "星期一"
        day[2] = "星期二"
        day[3] = "星期三"
        day[4] = "星期四"
        day[5] = "星期五"
        day[6] = "星期六"
        return (yy + '年' + mm + '月' + dd + '日 ' + day[now.getDay()])
    }





    /**
      * 获取上一个月
      *
      * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
      */
    static getPreMonth(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    }

    /**
     * 获取下一个月
     *
     * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
     */
    static getNextMonth(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }

        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    }

    //获取当前时间
    static getCurrentDay() {
        let day2 = new Date();
        day2.setTime(day2.getTime());
        let s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();

        return s2
    }
} 