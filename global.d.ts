declare module '*.scss' {
    const content: {[key: string]: any}
    export = content
  }
  // less模块声明
  declare module '*.less' {
    const content: { [key: string]: any }
    export default content
  }