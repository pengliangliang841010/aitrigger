// 存储localStorage
export const setLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  // 得到localStorage
  export const getLocal = (key: string) => {
    return JSON.parse(localStorage.getItem(key)||"{}")
  };