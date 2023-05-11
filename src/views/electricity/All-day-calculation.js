export const allDayScanning = (basePrice, tableData1, minPower, mapPrice, isCustomize, isCustomizetime) => {

    // console.log(111111111111111111111111111111);
    // console.log(tableData1,'tableData1');
    console.log(minPower, 'minPower');
    let sumTime = 0 //开的总时间
    let sumPower = 0//消耗的总电量
    console.log(tableData1);
    // console.log(basePrice);
    // console.log(tableData1);
    // console.log(minPower)
    tableData1.forEach(element => {
        sumTime = sumTime * 1 + element.time * 1
        sumPower = sumPower * 1 + element.Power * 1
    });

    // console.log(sumPrice);
    let sumArr = [] //每分钟开启的1440种电价

    for (let i = 0; i < 1440; i++) {
        var sumPrice = 0
        minPower.forEach((element, index) => {
            sumPrice = sumPrice + basePrice[(index + i) % 1440] * element.minPower
        });
        sumArr.push(sumPrice.toFixed(0) * 1)
    }
    // console.log(sumArr);
    let min = sumArr[0] //最优总电价
    let time = 0 //最优的开始分钟
    if (isCustomize === true) {
        let arr = isCustomizetime.split(':')
        console.log(arr);
        time = arr[0] * 60 + arr[1] * 1
        min = sumArr[time]

    } else {
        sumArr.forEach((element, index) => {
            if (element <= min) {
                time = index
                min = element
            }
        });
    }

    console.log(sumArr, '1440分钟 每分钟电价');
    console.log(min, '总电价');
    let avergePrice = (min / sumPower)//平均电价
    console.log(time, '最优开始时间');

    console.log(sumTime, '开的总时间');
    let startTime
    let startH = Math.floor(time / 60)
    let startM = Math.floor(time % 60)
    console.log(startH, startM);
    if (startH < 10 && startM < 10) {
        startTime = '0' + startH + ':' + '0' + startM
    } else if (startH < 10 && startM >= 10) {
        startTime = '0' + startH + ':' + startM
    } else if (startH >= 10 && startM >= 10) {
        startTime = startH + ':' + startM
    } else if (startH >= 10 && startM < 10) {
        startTime = startH + ':' + '0' + startM
    }
    console.log(sumTime, '总时间');
    let n = Math.floor((sumTime + time) / 1440)//过了几天
    console.log('过了', n, '天');
    let a = (sumTime + time) - n * 1440 // 最优 最后一天的第多少分钟结束
    console.log(a, '最后一天剩多少分钟');
    let endH = Math.floor(a / 60)
    console.log(endH, '小时');
    let endM = a - endH * 60
    console.log(endM, '分钟');
    let endTime = null//结束时间

    if (endH < 10 && endM < 10) {
        endTime = '0' + endH + ':' + '0' + endM
    } else if (endH < 10 && endM >= 10) {
        endTime = '0' + endH + ':' + endM
    } else if (endH >= 10 && endM >= 10) {
        endTime = endH + ':' + endM
    } else if (endH >= 10 && endM < 10) {
        endTime = endH + ':' + '0' + endM
    }
    console.log(startTime, '开始时间');
    console.log(endTime, '结束时间');
    // console.log((sumTime/1440));

    // console.log(a);
    console.log(avergePrice, '平均电价');

    console.log(mapPrice);
    let secondTable = [
        {
            type: '最优',
            startTime: startTime,
            endTime: `第${n + 1}天${endTime}`,
            sumPrice: min.toFixed(3),
            avergePrice: avergePrice.toFixed(5)
        }, {
            type: '自定义',
            startTime: '',
            endTime: '',
            sumPrice: '',
            avergePrice: ''
        }
    ]

    //峰电

    let fengdian = 0
    let gudian = 0
    let pingdian = 0
    let jiandian = 0
    let fengP = 0
    let guP = 0
    let pingP = 0
    let jianP = 0
    let count1 = 0
    let count2 = 0
    let count3 = 0
    let count4 = 0

    minPower.forEach((element, index) => {

        if (basePrice[(index + time) % 1440] == mapPrice.get('峰电')) {
            count1++
            fengdian = fengdian + basePrice[(index + time) % 1440] * element.minPower
            fengP = fengP + element.minPower
        }
        else if (basePrice[(index + time) % 1440] == mapPrice.get('谷电')) {
            // count++
            count2++
            gudian = gudian + basePrice[(index + time) % 1440] * element.minPower
            guP = guP + element.minPower
        }
        else if (basePrice[(index + time) % 1440] == mapPrice.get('平电')) {
            // count++
            count3++
            pingdian = pingdian + basePrice[(index + time) % 1440] * element.minPower
            pingP = pingP + element.minPower
        }
        else if (basePrice[(index + time) % 1440] == mapPrice.get('尖峰电')) {
            count4++
            jiandian = jiandian + basePrice[(index + time) % 1440] * element.minPower
            jianP = jianP + element.minPower
        }
        else {
            console.log('报错');
        }
    });
    console.log('谷电计数器', count1);
    console.log('平电计数器', count2);
    console.log('峰电计数器', count3);
    console.log('尖峰计数器', count4);

    console.log(fengdian, fengP, '峰电');
    console.log(gudian, guP, '谷电');
    console.log(pingdian, pingP, '平电');
    console.log(jiandian, jianP, '尖峰');
    console.log(sumPower, '总电量', min, '总电价');
    let lastTable = []
    if (mapPrice.has('峰电')) {
        let obj = {
        }
        obj.type = '峰电'
        obj.price = mapPrice.get('峰电')
        obj.priceRatio = ((fengdian / min) * 100).toFixed(3) + '%'
        obj.Power = fengP.toFixed(0)
        obj.PowerRatio = ((fengP / sumPower) * 100).toFixed(3) + '%'
        lastTable.push(obj)
        console.log(lastTable);
    }
    if (mapPrice.has('谷电')) {
        let obj = {
        }
        obj.type = '谷电'
        obj.price = mapPrice.get('谷电')
        obj.priceRatio = ((gudian / min) * 100).toFixed(3) + '%'
        obj.Power = guP.toFixed(0)
        obj.PowerRatio = ((guP / sumPower) * 100).toFixed(3) + '%'
        lastTable.push(obj)
        console.log(lastTable);
    }
    if (mapPrice.has('平电')) {
        let obj = {
        }
        obj.type = '平电'
        obj.price = mapPrice.get('平电')
        obj.priceRatio = ((pingdian / min) * 100).toFixed(3) + '%'
        obj.Power = pingP.toFixed(0)
        obj.PowerRatio = ((pingP / sumPower) * 100).toFixed(3) + '%'
        lastTable.push(obj)
        console.log(lastTable);
    }
    if (mapPrice.has('尖峰电')) {
        let obj = {
        }
        obj.type = '尖峰电'
        obj.price = mapPrice.get('尖峰电')
        obj.priceRatio = ((jiandian / min) * 100).toFixed(3) + '%'
        obj.Power = jianP.toFixed(0)
        obj.PowerRatio = ((jianP / sumPower) * 100).toFixed(3) + '%'
        lastTable.push(obj)
        console.log(lastTable);
    }
    if (isCustomize === false) {
        return {
            secondTable,
            lastTable,
            sumArr
        }
    }
    if (isCustomize === true) {
        console.log(isCustomize, '是否自定义');
        console.log(isCustomizetime);
        return {
            sumArr
        }
    }

}
export const allDayScanning2 = (basePrice, tableData1, minPower, mapPrice, isCustomize, isCustomizetime) => {

    let sumTime = 0 //开的总时间
    let sumPower = 0//消耗的总电量
    // console.log(tableData1);
    tableData1.forEach(element => {
        sumTime = sumTime + element.time
        sumPower = sumPower + element.Power
    });

    // console.log(sumPrice);
    let sumArr = [] //每分钟开启的1440种电价

    for (let i = 0; i < 1440; i++) {
        var sumPrice = 0
        minPower.forEach((element, index) => {
            sumPrice = sumPrice + basePrice[(index + i) % 1440] * element.minPower
        });
        sumArr.push(sumPrice)
    }
    // console.log(sumArr);
    let min = sumArr[0] //最优总电价
    let time = 0 //最优的开始分钟
    if (isCustomize === true) {
        let arr = isCustomizetime.split(':')
        console.log(arr);
        time = arr[0] * 60 + arr[1] * 1
        min = sumArr[time]

    } else {
        sumArr.forEach((element, index) => {
            if (element <= min) {
                time = index
                min = element
            }
        });
    }

    // console.log(sumArr,'1440分钟 每分钟电价');
    console.log(min, '总电价');
    let avergePrice = (min / sumPower)//平均电价
    console.log(time, '最优开始时间');

    console.log(sumTime, '开的总时间');
    let startTime
    let startH = Math.floor(time / 60)
    let startM = Math.floor(time % 60)
    console.log(startH, startM);
    if (startH < 10 && startM < 10) {
        startTime = '0' + startH + ':' + '0' + startM
    } else if (startH < 10 && startM >= 10) {
        startTime = '0' + startH + ':' + startM
    } else if (startH >= 10 && startM >= 10) {
        startTime = startH + ':' + startM
    } else if (startH >= 10 && startM < 10) {
        startTime = startH + ':' + '0' + startM
    }

    let n = Math.floor((sumTime + time) / 1440)//过了几天
    console.log('过了', n, '天');
    let a = (sumTime + time) - n * 1440 // 最优 最后一天的第多少分钟结束
    console.log(a, '最后一天剩多少分钟');
    let endH = Math.floor(a / 60)
    console.log(endH, '小时');
    let endM = a - endH * 60
    console.log(endM, '分钟');
    let endTime = null//结束时间

    if (endH < 10 && endM < 10) {
        endTime = '0' + endH + ':' + '0' + endM
    } else if (endH < 10 && endM >= 10) {
        endTime = '0' + endH + ':' + endM
    } else if (endH >= 10 && endM >= 10) {
        endTime = endH + ':' + endM
    } else if (endH >= 10 && endM < 10) {
        endTime = endH + ':' + '0' + endM
    }
    console.log(startTime, '开始时间');
    console.log(endTime, '结束时间');
    // console.log((sumTime/1440));

    // console.log(a);
    console.log(avergePrice, '平均电价');

    let secondTable = [
        {
            type: '自定义',
            startTime: startTime,
            endTime: `第${n + 1}天${endTime}`,
            sumPrice: min.toFixed(3),
            avergePrice: avergePrice.toFixed(5)
        }
    ]

    //峰电

    let fengdian = 0
    let gudian = 0
    let pingdian = 0
    let jiandian = 0
    let fengP = 0
    let guP = 0
    let pingP = 0
    let jianP = 0
    minPower.forEach((element, index) => {

        if (basePrice[(index + time) % 1440] == mapPrice.get('峰电')) {
            fengdian = fengdian + basePrice[(index + time) % 1440] * element.minPower
            fengP = fengP + element.minPower
        }
        if (basePrice[(index + time) % 1440] == mapPrice.get('谷电')) {
            gudian = gudian + basePrice[(index + time) % 1440] * element.minPower
            guP = guP + element.minPower
        }
        if (basePrice[(index + time) % 1440] == mapPrice.get('平电')) {
            pingdian = pingdian + basePrice[(index + time) % 1440] * element.minPower
            pingP = pingP + element.minPower
        }
        if (basePrice[(index + time) % 1440] == mapPrice.get('尖峰电')) {
            jiandian = jiandian + basePrice[(index + time) % 1440] * element.minPower
            jianP = jianP + element.minPower
        }
    });
    console.log(fengdian, fengP, '峰电');
    console.log(gudian, guP, '谷电');
    console.log(pingdian, pingP, '平电');
    console.log(jiandian, jianP, '尖峰');
    let lastTable = []
    if (mapPrice.has('峰电')) {
        let obj = {
        }
        obj.type = '峰电'
        obj.price = mapPrice.get('峰电')
        obj.priceRatio = ((fengdian / min) * 100).toFixed(3) + '%'
        obj.Power = fengP.toFixed(0)
        obj.PowerRatio = ((fengP / sumPower) * 100).toFixed(3) + '%'
        lastTable.push(obj)
        // console.log(lastTable);
    }
    if (mapPrice.has('谷电')) {
        let obj = {
        }
        obj.type = '谷电'
        obj.price = mapPrice.get('谷电')
        obj.priceRatio = ((gudian / min) * 100).toFixed(3) + '%'
        obj.Power = guP.toFixed(0)
        obj.PowerRatio = ((guP / sumPower) * 100).toFixed(3) + '%'
        lastTable.push(obj)
        // console.log(lastTable);
    }
    if (mapPrice.has('平电')) {
        let obj = {
        }
        obj.type = '平电'
        obj.price = mapPrice.get('平电')
        obj.priceRatio = ((pingdian / min) * 100).toFixed(3) + '%'
        obj.Power = pingP.toFixed(0)
        obj.PowerRatio = ((pingP / sumPower) * 100).toFixed(3) + '%'
        lastTable.push(obj)
        // console.log(lastTable);
    }
    if (mapPrice.has('尖峰电')) {
        let obj = {
        }
        obj.type = '尖峰电'
        obj.price = mapPrice.get('尖峰电')
        obj.priceRatio = ((jiandian / min) * 100).toFixed(3) + '%'
        obj.Power = jianP.toFixed(0)
        obj.PowerRatio = ((jianP / sumPower) * 100).toFixed(3) + '%'
        lastTable.push(obj)
    }
    console.log(lastTable);

    if (isCustomize === false) {
        return {
            secondTable,
            lastTable,
            sumArr
        }
    }
    if (isCustomize === true) {
        console.log(isCustomize, '是否自定义');
        console.log(isCustomizetime);
        return {
            lastTable,
            secondTable
        }
    }

}

