import { get } from "lodash";

export function randomString(_e?: number) {
  const e = _e || 10;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}

export function polling(callback, failBack, interval = 2000, maxCount = 20) {
  let timer
  let count = 0;
  let isStop = false
  const stop = (flag?) => {
    // flag 标识只用于loading
    console.log('停止', count)
    if (!flag) {
      failBack && failBack()
    }
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
    if (count >= maxCount) {
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

export function downloadImg(imgSrc) {
  if(!imgSrc){
    return
  }
  const xhr = new XMLHttpRequest()
  xhr.open('get', imgSrc, true)
  xhr.responseType = 'blob'
  xhr.send()
  xhr.onload = function (res) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(get(res, 'target.response') as unknown as Blob)
    fileReader.onload = function (tem) {
      const a = document.createElement('a')
      a.href = tem.target?.result as string
      a.download = 'default'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
}