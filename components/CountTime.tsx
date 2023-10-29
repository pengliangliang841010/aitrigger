import React from "react";
import { useEffect, useRef, useState } from "react";

export default function Countime(props) {
    const { shelfTime } = props; // 组件传过来的时间戳
    const timer = useRef<any>(0);
    const [remaining, setRemaining] = useState<any>({
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
});
useEffect(() => {
    // 清除倒计时
    return () => {
        clearInterval(timer.current);
    };
}, []);
useEffect(() => {
    const end = Date.parse(new Date(shelfTime).toString());
    countFun(end);
}, []);

function countFun (end){
    // 注意  Date.parse(new Date()) 获取是13位的时间戳;
    const now_time = Date.parse(new Date().toString());
    let remaining = end - now_time;
    timer.current = setInterval(() => {
        //防止出现负数
        if (remaining > 1000) {
            remaining -= 1000;
            const day = Math.floor(remaining / 1000 / 3600 / 24);
            const hour = Math.floor((remaining / 1000 / 3600) % 24);
            const minute = Math.floor((remaining / 1000 / 60) % 60);
            const second = Math.floor((remaining / 1000) % 60);
            setRemaining({
                day: day,
                hour: hour < 10 ? '0' + hour : hour,
                minute: minute < 10 ? '0' + minute : minute,
                second: second < 10 ? '0' + second : second
            });
        } else {
            //倒计时结束时的方法
            clearInterval(timer.current);
        }
    }, 1000);
 }

 return (
    <div className='countime-box'>
        {remaining.day}days { remaining.hour}:{remaining.minute}:   {remaining.second}
    </div>
)
}