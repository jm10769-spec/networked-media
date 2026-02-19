window.onload = () => {
    console.log("page has loaded");
}
export function initClockApp() {
    new Vue({
        el: '#app',
        data: {
               year:"丙午年",
               selectedSolarMsg: '',
			monthList:[
				{ content:"一月" },
				{ content:"二月" },
				{ content:"三月" },
				{ content:"四月" },
				{ content:"五月" },
				{ content:"六月" },
				{ content:"七月" },
				{ content:"八月" },
				{ content:"九月" },
				{ content:"十月" },
				{ content:"十一月" },
				{ content:"十二月" }
			],
			dateList:[
                {content:" 一号"},
                {content:"二号"},
                {content:"三号"},
                {content:"四号"},
                {content:"五号"},
                {content:"六号"},
                {content:"七号"},
                {content:"八号"},
                {content:"九号"},
                {content:"十号"},
                {content:"十一号"},
                {content:"十二号"},
                {content:"十三号"},
                {content:"十四号"},
                {content:"十五号"},
                {content:"十六号"},
                {content:"十七号"},
                {content:"十八号"},
                {content:"十九号"},
                {content:"二十号"},
                {content:"二十一号"},
                {content:"二十二号"},
                {content:"二十三号"},
                {content:"二十四号"},
                {content:"二十五号"},
                {content:"二十六号"},
                {content:"二十七号"},
                {content:"二十八号"},
                {content:"二十九号"},
                {content:"三十号"},
                {content:"三十一号"},
            ],
            solarList:[
                {content: '立春', flag: false, msg: '公历2月03－05日交节立春，二十四节气之首，是春季的第一个节气。立春，意味着新的一个轮回已开启，乃万物起始、一切更生之义也。立，是“开始”之意；春，代表着温暖、生长。立春后阳气开始上升，日照增加，风和日暖，意味着万物闭藏的冬季已过去，开始进入生长的季节，万物至此渐次复苏.'},
                {content: '雨水', flag: false, msg: '公历2月18－20日交节雨水节气标示着降雨开始，雨量渐增。雨雨水和谷雨、小满、小雪、大雪等节气一样，都是反映降水现象的节气，是古代农耕文化对于节令的反映。进入雨水节气，我国北方阴寒未尽，一些地方仍下雪，尚未入春，仍是很冷；南方大多数地方则是春意盎然，一幅早春的景象。'},
                {content: '惊蛰', flag: false, msg: '公历3月05－07日交节惊蛰的意思是天气回暖，春雷始鸣，惊醒蛰伏于地下冬眠的昆虫。“惊蛰”标志着仲春卯月的开始。作为全年气温回升最快的节气，我国北方大部分地区平均气温已升至0℃以上。南方沿江江南地区为8℃以上，而西南和华南已达10至15℃以上，早已是一派融融春光了，日照时数也有了明显的增加。'},
                {content: '春分', flag: false, msg: '公历3月20－22日交节春分时，太阳直射点在赤道上，此后太阳直射点继续北移，故春分也称“升分”。古时又称为“日中”、“日夜分”、“仲春之月”。南北半球昼夜平分，这天以后太阳直射位置继续由赤道向北半球推移，北半球开始昼长夜短。春分的意义，一是指一天时间白天黑夜平分，各为12小时；二是古时以立春至立夏为春季，春分正当春季三个月之中，平分了春季。'},
                {content: '清明', flag: false, msg: '公历4月04－06日交节“清明”的含义是气候暖和，草木萌动，杏桃开花，处处给人以清新明朗、欣欣向荣的感觉。此时气候清爽温暖，万物“吐故纳新”，草木始发新枝芽，万物开始生长，大地呈现春和景明之象。'},
                {content: '谷雨', flag: false, msg: '公历4月19－21日交节谷雨，是春季最后一个节气,顾名思义也就是播谷降雨的意思。在谷雨时节雨水会增多，大大有利于谷类农作物的生长。由于雨谷雨，这时田中的秧苗初插、作物新种，最需要雨水的滋润，所以说“春雨贵如油”。'},
                {content: '立夏', flag: false, msg: '公历5月05－07日交节夏季的第一个节气，表示盛夏时节的正式开始。万物至此皆长大，故名立夏也。从此进入夏天，万物生长旺盛。习惯上把立夏当作是气温显著升高，炎暑将临，雷雨增多，农作物进入旺季生长的一个最重要节气。'},
                {content: '小满', flag: false, msg: '公历5月20－22日交节“小满”节气，天气渐渐由暖变热，并且降水也会逐渐增多，小满节气意味着进入了大幅降水的雨季，雨水开始增多，往往会出现持续大范围的强降水。进入小满节气后，我国南方地区一般会降雨多、雨量大;北方，小满节气期间降雨很少，气温上升很快，与南方的温差进一步缩小。'},
                {content: '芒种', flag: false, msg: '公历6月21－22日交节芒种，谐音“忙种”，芒种的“种”字，是指谷黍类作物播种的节令。“芒种”到来预示着农民开始了忙碌的田间生活。气候特点：节雨量充沛，气温显著升高。农事：作物栽培。'},
                {content: '夏至', flag: false, msg: '公历6月21－22日交节夏至这天，太阳直射地面的位置到达一年的最北端，几乎直射北回归线，此时，北半球各地的白昼时间达到全年最长。夏至是太阳的转折点，这天过后它将走“回头路”，阳光直射点开始从北回归线向南移动，北半球白昼将会逐日减短。同时，夏至到来后，夜空星象也逐渐变成夏季星空。'},
                {content: '小暑', flag: false, msg: '公历7月06－08日交节小暑，是夏季的第五个节气，表示盛夏正式开始。暑，表示炎热的意思，小暑为小热，还不十分热。意指天气开始炎热，但还没到最热。此时，已是初伏前后。各地也进入雷暴最多的季节，常伴随着大风、暴雨。'},
                {content: '大暑', flag: false, msg: '公历7月22－24日交节大暑是一年中最热的节气，这时正值中伏前后，"湿热交蒸"在此时到达顶点。在我国很多地区，经常会出现摄氏40度的高温天气。大暑期间为一年最热时期，也是喜热作物生长速度最快的时期。这个时期气温最高，农作物生长最快，同时，很多地区的旱、涝、风灾等各种气象灾害也最为频繁。'},
                {content: '立秋', flag: false, msg: '公历8月07－09日交节进入秋季，意味着降雨、风暴、湿度等，处于一年中的转折点，趋于下降或减少；在自然界，万物开始从繁茂成长趋向萧索成熟。立秋并不代表酷热天气就此结束，初秋期间天气仍然很热。按照“三伏”的推算方法，“立秋”这天往往还处在中伏期间，也就是说，酷暑并没有过完，真正凉爽一般要到白露节气之后。酷热与凉爽的分水岭并不是在立秋节气。'},
                {content: '处暑', flag: false, msg: '公历8月22－24日交节“处”是终止的意思，处暑是表示炎热的酷暑结束，这时三伏已过或近尾声。由于受短期回热天气影响，处暑过后仍有持续高温，会感到闷热，天气由炎热向闷热转变。处暑节气处在短期回热天气期内，真正凉爽一般要到白露前后。'},
                {content: '白露', flag: false, msg: '公历9月07－09日交节白露是一个反映自然界气温变化的重要节令。古人以四时配五行，秋属金，金色白，故以白形容秋露。白露前后，夏日残留的暑气逐渐消失，天地的阴气上升扩散，天气渐渐转凉。白露节气基本结束了暑天的闷热，是秋季由闷热转向凉爽的转折点。 白露过后，天高云淡、气爽风凉。'},
                {content: '秋分', flag: false, msg: '公历9月22－24日交节秋分这一天同春分一样，阳光几乎直射赤道，昼夜几乎相等。从这一天起，阳光直射位置继续由赤道向南半球推移，北半球开始昼短夜长，南半球相反。秋分时节，我国大部分地区已经进入凉爽的秋季。'},
                {content: '寒露', flag: false, msg: '公历10月08－09交节寒露是一个反映气候变化特征的节气，寒露节气后，昼渐短，夜渐长，日照减少，热气慢慢退去，寒气渐生，昼夜的温差较大，晨晚略感丝丝寒意。古人将寒露作为寒气渐生的表征。从气候特点上看，寒露时节，南方秋意渐浓，气爽风凉，少雨干燥；北方广大地区已从深秋进入或即将进入冬季。'},
                {content: '霜降', flag: false, msg: '公历10月23－24交节霜降是秋季的最后一个节气，是秋季到冬季的过渡。霜降节气特点是早晚天气较冷、中午则比较热，昼夜温差大，秋燥明显。由于“霜”是天冷、昼夜温差变化大的表现，故以“霜降”命名这个表示“气温骤降、昼夜温差大”的节令。霜降时节，万物毕成，毕入于戌，阳下入地，阴气始凝。霜降过后，植物渐渐失去生机，大地一片萧索,气温骤降、昼夜温差大。霜降节气后，深秋景象明显，冷空气南下越来越频繁。'},
                {content: '立冬', flag: false, msg: '公历11月07－8日交节立冬是季节类节气，表示自此进入了冬季，意味着风雨、干湿、光照、气温等，处于转折点上，开始从秋季向冬季气候过渡。“秋收冬藏”，万物在冬季闭藏，冬季是享受丰收、休养生息的季节。白昼时间缩短，北半球获得太阳的辐射量越来越少，但由于此时地表在下半年贮存的热量还有一定的能量，所以还不很冷。'},
                {content: '小雪', flag: false, msg: '公历11月22－23交节小雪和大雪、雨水、谷雨、小满等节气一样，都是直接反映降水的节气。小雪节气是一个气候概念，它代表的是小雪节小雪节气是寒潮和强冷空气活动频数较高的节气。'},
                {content: '大雪', flag: false, msg: '公历12月6－08日交节大雪是直接反映降水的节气。节气大雪的到来，意味着天气会越来越冷，降水量渐渐增多。大雪节气最常见的就是降温、下雨或下雪。大雪节气是一个气候概念，它代表的是大雪节气期间的气候特征，即气温与降水量。'},
                {content: '冬至', flag: false, msg: '公历12月21－23交节冬至标示着北半球的太阳高度最小，白昼时间最短，但是冬至日的温度不是最低。冬至日是北半球各地一年中白昼最短的一天，并且越往北白昼越短。而冬至以后，阳光直射位置逐渐向北移动，北半球的白天就逐渐变长了。天文学上把立冬作为冬季的开始，冬至作为寒冷气候的开始。冬至之前通常不会很冷，冬季的真正寒天是在冬至之后。'},
                {content: '小寒', flag: false, msg: '公历1月05－07日交节小寒，标志着寒冬正式开始。冷气积久而寒，小寒是天气寒冷但还没有到极点的意思。它与大寒、小暑、大暑及处暑一样，都是表示气温冷暖变化的节气。小寒的天气特点是：天渐寒，尚未大冷。俗话有讲：“冷在三九”，由于隆冬“三九”也基本上处于该节气之内，因此有“小寒胜大寒”之讲法。'},
                {content: '大寒', flag: false, msg: '公历1月20－21日交节大寒同小寒一样，也是表示天气寒冷程度的节气。在我国部分地区，大寒不如小寒冷，但在某些年份和沿海少数地方，全年最低汽温仍然会出在大寒节气内。小寒、大寒是一年中雨水最少的时段。大寒以后，立春接着到来，天气渐暖。至此地球绕太阳公转了一周，完成了一个循环。'}
            ],
			oldHoursList:[
				{ content:"子时" },
				{ content:"丑时" },
				{ content:"寅时" },
				{ content:"卯时" },
				{ content:"辰时" },
				{ content:"巳时" },
				{ content:"午时" },
				{ content:"未时" },
				{ content:"申时" },
				{ content:"酉时" },
				{ content:"戌时" },
				{ content:"亥时" }
			],
			hoursList:[
                { content:"十二时" },
                { content:"一时" },
                { content:"二时" },
                { content:"三时" },
                { content:"四时" },
                { content:"五时" },
                { content:"六时" },
                { content:"七时" },
                { content:"八时" },
                { content:"九时" },
                { content:"十时" },
                { content:"十一时" },
                { content:"十二时" },
                { content:"十三时" },
                { content:"十四时" },
                { content:"十五时" },
                { content:"十六时" },
                { content:"十七时" },
                { content:"十八时" },
                { content:"十九时" },
                { content:"二十时" },
                { content:"二十一时" },
                { content:"二十二时" },
                { content:"二十三时" }
            ],
			minuteList:[
                { content:"零分" },
                { content:"一分" },
                { content:"二分" },
                { content:"三分" },
                { content:"四分" },
                { content:"五分" },
                { content:"六分" },
                { content:"七分" },
                { content:"八分" },
                { content:"九分" },
                { content:"十分" },
                { content:"十一分" },
                { content:"十二分" },
                { content:"十三分" },
                { content:"十四分" },
                { content:"十五分" },
                { content:"十六分" },
                { content:"十七分" },
                { content:"十八分" },
                { content:"十九分" },
                { content:"二十分" },
                { content:"二十一分" },
                { content:"二十二分" },
                { content:"二十三分" },
                { content:"二十四分" },
                { content:"二十五分" },
                { content:"二十六分" },
                { content:"二十七分" },
                { content:"二十八分" },
                { content:"二十九分" },
                { content:"三十分" },
                { content:"三十一分" },
                { content:"三十二分" },
                { content:"三十三分" },
                { content:"三十四分" },
                { content:"三十五分" },
                { content:"三十六分" },
                { content:"三十七分" },
                { content:"三十八分" },
                { content:"三十九分" },
                { content:"四十分" },
                { content:"四十一分" },
                { content:"四十二分" },
                { content:"四十三分" },
                { content:"四十四分" },
                { content:"四十五分" },
                { content:"四十六分" },
                { content:"四十七分" },
                { content:"四十八分" },
                { content:"四十九分" },
                { content:"五十分" },
                { content:"五十一分" },
                { content:"五十二分" },
                { content:"五十三分" },
                { content:"五十四分" },
                { content:"五十五分" },
                { content:"五十六分" },
                { content:"五十七分" },
                { content:"五十八分" },
                { content:"五十九分" }
            ],
			secondList:[
                { content:"零秒" },
                { content:"一秒" },
                { content:"二秒" },
                { content:"三秒" },
                { content:"四秒" },
                { content:"五秒" },
                { content:"六秒" },
                { content:"七秒" },
                { content:"八秒" },
                { content:"九秒" },
                { content:"十秒" },
                { content:"十一秒" },
                { content:"十二秒" },
                { content:"十三秒" },
                { content:"十四秒" },
                { content:"十五秒" },
                { content:"十六秒" },
                { content:"十七秒" },
                { content:"十八秒" },
                { content:"十九秒" },
                { content:"二十秒" },
                { content:"二十一秒" },
                { content:"二十二秒" },
                { content:"二十三秒" },
                { content:"二十四秒" },
                { content:"二十五秒" },
                { content:"二十六秒" },
                { content:"二十七秒" },
                { content:"二十八秒" },
                { content:"二十九秒" },
                { content:"三十秒" },
                { content:"三十一秒" },
                { content:"三十二秒" },
                { content:"三十三秒" },
                { content:"三十四秒" },
                { content:"三十五秒" },
                { content:"三十六秒" },
                { content:"三十七秒" },
                { content:"三十八秒" },
                { content:"三十九秒" },
                { content:"四十秒" },
                { content:"四十一秒" },
                { content:"四十二秒" },
                { content:"四十三秒" },
                { content:"四十四秒" },
                { content:"四十五秒" },
                { content:"四十六秒" },
                { content:"四十七秒" },
                { content:"四十八秒" },
                { content:"四十九秒" },
                { content:"五十秒" },
                { content:"五十一秒" },
                { content:"五十二秒" },
                { content:"五十三秒" },
                { content:"五十四秒" },
                { content:"五十五秒" },
                { content:"五十六秒" },
                { content:"五十七秒" },
                { content:"五十八秒" },
                { content:"五十九秒" }
            ],
			monthRotate:0,
			dateRotate:0,
            solarRotate:0,
			oldHoursRotate:0,
			hoursRotate:0,
			minuteRotate:0,
			secondRotate:0,
        },
        created: function (){
           this.initClock();
           this.start();
        },
        methods: Object.assign({}, clockMethods, {
            selectSolarMsg: function(index) {
                const item = this.solarList[index];
                this.selectedSolarMsg = item && item.msg ? item.msg : '';
            }
        })
    });
}
export var clockMethods = {
        selectSolarMsg: function(index) {
            const item = this.solarList[index];
            this.selectedSolarMsg = item && item.msg ? item.msg : '';
        },
	initClock: function () {
        this.initLocation(this.monthList,30,80);
        this.initLocation(this.dateList,360/31,160);
        this.initLocation(this.solarList,360/24,240);
		this.initLocation(this.oldHoursList,360/12,320);
		this.initLocation(this.hoursList,360/24,400);
		this.initLocation(this.minuteList,6,480);
		this.initLocation(this.secondList,6,400);
	},

	initLocation:function (arr,deg,r){
		for (let i = 0; i < arr.length; i++) {
			let rotateDeg = i * deg;
			let translateX = Math.cos(rotateDeg * (Math.PI / 180))*r;
			let translateY = Math.sin(rotateDeg * (Math.PI / 180))*r;
			arr[i].translateX=translateX;
			arr[i].translateY=translateY;
			arr[i].rotate=rotateDeg;
			arr[i].active=false;
		}
	},
    rotateClock:function (){
        let nowDate = new Date();
        this.year = nowDate.getFullYear();
        let month = nowDate.getMonth();
        let date = nowDate.getDate();
        let hours = nowDate.getHours();
        let minutes = nowDate.getMinutes();
        let seconds = nowDate.getSeconds();

    //Deg
        this.monthRotate = month * -30;
        this.dateRotate = (date - 1) * -360 / 31;

        let branchIndex = Math.floor((hours + 1) / 2);
        if (branchIndex === 12) branchIndex = 0;
        this.oldHoursRotate = (branchIndex % 12) * -360 / 12;
        this.hoursRotate = hours * -360 / 24;
        this.minuteRotate = minutes * -6;
        this.secondRotate = seconds * -6;
     //Deactivate all
        this.monthList.forEach(e => e.active = false);
        this.dateList.forEach(e => e.active = false);
        this.oldHoursList.forEach(e => e.active = false);
        this.hoursList.forEach(e => e.active = false);
        this.minuteList.forEach(e => e.active = false);
        this.secondList.forEach(e => e.active = false);
    //Activate
        if (this.monthList[month]) this.monthList[month].active = true;
        if (this.dateList[date - 1]) this.dateList[date - 1].active = true;
        if (this.oldHoursList[branchIndex % 12]) this.oldHoursList[branchIndex % 12].active = true;
        if (this.hoursList[hours]) this.hoursList[hours].active = true;
        if (this.minuteList[minutes]) this.minuteList[minutes].active = true;
        if (this.secondList[seconds]) this.secondList[seconds].active = true;
    },
	start:function(){
		let task;
		clearInterval(task);
		let _this=this;
		task = setInterval(function () {
			_this.rotateClock();
		}, 1000);
	},
    //solar message
    showMsg: function (index) {
        var sum = this.solarList;
        if (!sum[index] || !sum[index].msg) return;
        var strings = sum[index].msg;
        var arrayy = strings.split('');
        var a = 0, b = 12, stringOne = '', newObject;
        this.Arrays = [];
        for (var i = 0; i < 10; i++) {
            var arrayOne = arrayy.slice(a, b);
            if(arrayOne.length !== 0) {
                stringOne = arrayOne.join('');
                newObject = stringOne.replace(/,/g, '');
                this.Arrays.push(newObject);
            }
            if (i === 0) {
                a += 12; b += 20;
            }else {
                a += 20; b += 20;
            }
        }
    },
  hideMsg: function () {
    this.Arrays = [];
  }
};
