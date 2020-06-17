# ReactNativeMobxFrame
快速开发RN项目

- 开发工具
  - React-Native "0.59.4"
  - VSCode
  - Android studio版本3.x
  - Xcode
  
### 安装运行（Android和iOS均以适配）

- yarn install
- yarn run android or yarn run ios-xsmax
### 项目描述
#### 目前使用了3.x版本的react-navigation,实现自定义底部tab;使用mobx进行相关状态管理。


### 加入网易云信IM功能
##### 目前项目中直接使用官方demo的key，相关界面及功能也是直接引用了官方的UI，未做大规模修改。
##### 在引入云信IM所需要的相关组件时，发现realm这个组件在高版本node（8以上版本）时install不成功，所以需要降低node版本来使用（对于RN 0.60及以上版本来说似乎冲突了，需要高版本node支持）；在推送方面，主要是安卓端所支持的厂家不是很多，也是比较尴尬；


##### 此前有使用过极光的IM，也存在着一些问题：主要是数据源问题，在ios端时离线消息不能及时获取到，导致数据短暂丢失（该问题暂未解决）；极光的UI方面直接是引用的原生相关组件（并不是很完善，需做相关处理）

##### 目前RN端IM的第三方组件的维护力度不是很大，还需努力前行。


### [安卓下载地址](http://d.6short.com/npgd)

![](android_download.jpg)