
import {
    Dimensions,
    Platform,
    PixelRatio,
    NativeModules,
} from 'react-native';
import moment from "moment";

let screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
};


// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
// iPhoneX max
const X_MAX_WIDTH = 414;
const X_MAX_HEIGHT = 896;

//根据设计稿尺寸来进行高度，宽度及字体的适配；此处UI设计根据iphone6的尺寸来设计的（似乎默认就是iphone6的）

let fontScale = PixelRatio.getFontScale();    //返回字体大小缩放比例
let pixelRatio = PixelRatio.get();           //当前设备的像素密度
const defaultPixel = 2;                           //iphone6的像素密度

const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
// const w2 = 750;
// const h2 = 1334;

const defaultWidth = 375 / 2;
const defaultHeight = 667 / 2;

//缩放比例
const _scaleWidth = screen.width / w2;
const _scaleHeight = screen.height / h2;

// const _scaleWidth = screen.width / w2;


function dFont(size) {
    // size = Math.round(size * fontScale + 0.5);
    // return size / defaultPixel;
    let scaleWidth = screen.width / defaultWidth;
    let scaleHeight = screen.height / defaultHeight;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));

    return size / defaultPixel * fontScale;
}


/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param size 设计图的尺寸
 * @returns {number}
 */
function aWidth(size) {
    return size * _scaleWidth;
}

/**
 * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param size 设计图的尺寸
 * @returns {number}
 */
function aHeight(size) {
    return size * _scaleHeight;
}



/*判断是不是IPhone*/
function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screen.height === X_HEIGHT && screen.width === X_WIDTH) ||
            (screen.height === X_MAX_HEIGHT && screen.width === X_MAX_WIDTH))
    )
}

export { screen, isIphoneX, aHeight, aWidth, dFont, };

