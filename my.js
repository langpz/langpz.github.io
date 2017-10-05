
//需求：封装一个兼容的scroll().返回值是json，用scroll().top获取scrollTop
//需求：封装一个兼容的scroll().返回值是json，用scroll().left获取scrollLeft
    function scroll() {
        //return  {
        //    "top":window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop,
        //    "left":window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft
        //}
        if (window.pageYOffset !== undefined) {

            return {
                "top": window.pageYOffset,
                "left": window.pageXOffset
            }
        }
        else if (document.compatMode === "CSS1Compat") {
            return {
                "top": document.documentElement.scrollTop,
                "left": document.documentElement.scrollLeft
            }
        }
        else {
            return {
                "top": document.body.scrollTop,
                "left": document.body.scrollLeft
            }
        }
    };
//需求：封装一个兼容的client().Width返回值是json，用scroll().Width获取scrollWidth
//需求：封装一个兼容的client().Height返回值是json，用scroll().Height获取scrollHeight
function client() {
    //return  {
    //    "Width":window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth,
    //    "Height":window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight
    //}
    if (window.innerWidth !== undefined) {

        return {
            "Width": window.innerWidth,
            "Height": window.innerHeight
        }
    }
    else if (document.compatMode === "CSS1Compat") {
        return {
            "Width": document.documentElement.clientWidth,
            "Height": document.documentElement.clientHeight
        }
    }
    else {
        return {
            "Width": document.body.clientWidth,
            "Height": document.body.clientHeight
        }
    }
};





    //让ele事件显示
    function show(ele){
        ele.style.display="block";
    }


//获取元素信息
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }else{
        return ele.currentStyle[attr];
    }


}

    //缓动移动ele，到指定目标位置，可以给定多个参数，用json来装参数，还可以用回调函数
    var timer=null;
    function animate(ele,json,fn){
        clearInterval(ele.timer);
        ele.timer=setInterval(function () {
            var bool=true;
            for(var k in json) {
                //获取这个属性的初始位置
                var leader;
                if(k==="opacity"){
                    leader = getStyle(ele, k)*100 || 1;

                }
                else{
                    leader = parseInt(getStyle(ele, k)) || 0;
                }
                //步长
                var step = (json[k] - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //移动
                leader = leader + step;
                if(k==="opacity"){
                    ele.style[k] = leader/100;
                    //兼容IE678
                    ele.style.filter = "alpha(opacity="+leader+")";

                }else if(k==="zIndex"){
                    ele.style[k] = json[k];
                }else{
                    ele.style[k] = leader + "px";
                }

                console.log(1);
                //清除定时器
                if(json[k]!==leader) {
                    bool=false;
                }
            }
            //清除定时器
            if(bool){
                for(var k in json) {
                    if(k==="opacity"){
                        ele.style[k]=json[k]/100;
                        //兼容IE678
                        ele.style.filter = "alpha(opacity="+json[k]+")";

                    }else if(k==="zIndex"){
                        ele.style[k]=json[k];
                    }else {
                        ele.style[k]=json[k] + "px";

                    }
                }
                clearInterval(ele.timer);
                if(fn){
                    fn();
                }
            }

        },30)

    }
