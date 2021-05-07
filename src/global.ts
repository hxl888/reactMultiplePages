declare global {
    interface Window {
        ZENG: any;
        mqq: any;
        wx: any;
        QZAppExternal: any;
        KuwoInterface: {
            jsCallNative: any;
        };
        jscObj: {
            getVersionInfo: any;
            openLoginAlert: any;
            closeH5Page: any;
            openOuterH5PageWithUrl: any;
            getMyInfo: any;
            refreshCoin: any;
            animationStateChanged: any;
            openStateChanged: any;
            openDetailH5PageWithUrl: any;
            pushOuterH5Page: any;
            openShowRoomWithRoomID: any;
            openShareView: any;
            getSiginInfo: any;
            setNativeValue: any;
            getNativeValueByKey: any;
            setAppNativeValue: any;
            getAppNativeValueByKey: any;
            deleteAppNativeValueByKey: any;
            deleteAllAppNativeValue: any;
            setJXFromChannelId: any;
            enterRoomWithRoomID: any;
            getMyInfoAndEnterRoomInfo: any;
            replaceRongYaoPKShowIcon: any;
            setWebViewBouncesEnable: any;
            applyH5Pendant: any;
            closeH5Pendant: any;
            changeH5Pendant: any;
            replaceH5Pendant: any;
            presentH5PageWithUrl: any;
            handleImageWithOperateType: any;
            controlPK: any;
        };
        // 获取myInfo 用户信息
        getMyInfoObjCallBack: any;
        iosMyInfoObjCallback: any;
        versionCallBack: any; // android回调用户返回版本号
        androidCallback: any; // android充值回调
        getMyInfoCallBack: any;
        getSinginTokenCallback: any;
        getMyInfoAndEnterInfoCallBack: any;
        feedback_ardeviceinfo: any;
        iosMyInfoCallback: any;
        androidNotifty: any;
        iOSNotiftInfoCallback: any;
        iosGetEnterInfoCallback: any;
        androidGetEnterInfoCallback: any;
        tipMsg: any;
        XDomainRequest: any;
        Document: {
            defaultView: any;
        };
    }
}
export { }
