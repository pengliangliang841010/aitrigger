import styleVariables from './styles/_app.module.scss'

export default {
    components:{
      Segmented:{
        itemSelectedBg:styleVariables.colorPrimary,
        itemSelectedColor:'#fff'
      },
    },
    token: {
      colorPrimary: styleVariables.colorPrimary,
      fontFamily:'Open Sans'
    },
  }