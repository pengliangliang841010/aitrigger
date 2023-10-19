export function randomString(_e?:number) {  
    const e = _e || 10;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
  }

  export function polling(callback,failBack, interval = 2000,maxCount=10) {
    let timer
    let count=0;
    let isStop = false
    const stop = () => {
      console.log('停止',count)
      failBack&&failBack()
      isStop = true
      clearTimeout(timer)
    }
    const start = async () => {
      isStop = false
      await loop()
    }
    const loop = async () => {
      try {
        ++count;
        await callback(stop)
      } catch (err) {
        stop()
        console.error('轮询出错：', err)
      }
      if (count>=maxCount){
        stop()
      } 
      if (isStop) return
      return (timer = setTimeout(loop, interval))
    }
    return {
      start,
      stop
    }
  }