 /**
     * 是否为直播教育包
     *  "liveFlowPackageResources": [
     {
       "id": "ffweqwewewqewqewq123213213213",
       "number": "918600248432",
       "count": 4000,
       "beginTime": 1510300298000,
       "expireTime": 1540300298000
     },
     {
       "id": "tttsdfdsfdsf2312312321434335454",
       "number": "918600248432",
       "count": 4000,
       "beginTime": 1514793098000,
       "expireTime": 1540300298000
     }
     ]
     * 如果没有符合条件的教育包，返回false，否则返回符合条件的教育包。eg:
     * {
       "id": "tttsdfdsfdsf2312312321434335454",
       "number": "918600248432",
       "count": 4000,
       "beginTime": 1514793098000,
       "expireTime": 1540300298000
     }
     */
    function getValidLivePackages(list, timestamp) { // 教育包不一定按时间顺序排列
        if(list.length === 0) {
            return false;
        }
        var currentPackage = null, nextPackage = null;
        for(var i = 0 ; i < list.length ; i++) {
            var item = list[i];
            if(!currentPackage) {
                currentPackage = getValidCurrent(item, timestamp)  || currentPackage;
            }
            nextPackage = getValidNext(item, timestamp, nextPackage) || nextPackage;

        }
        return {
            current: currentPackage,
            next: nextPackage
        }
    }
    function getValidCurrent(item, time) {
        if(time > item.beginTime && time < item.endTime) {
            return item;
        }
        return null;
    }
    function getValidNext(item, time, next) {
        if(item.beginTime > time) {
            if(!next) {
                return item;
            }
            if(next.beginTime > item.beginTime) {
               return item;
            }
        }
    }
    var list = [{
            beginTime: 1510300298000,
            endTime: 1540300298000
        },
        {
            beginTime: 1514793098000,
            endTime:1540300298000
        }];
    var time = 1511516571465;
    console.log(getValidLivePackages(list, time));
