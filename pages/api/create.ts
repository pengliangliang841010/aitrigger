import { handlerWrapper } from '../../handleWrapper';
import axios from 'axios';
axios.defaults.headers['Authorization']="Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyZTgyNzMyYjk3MWExMzVjZjE0MTZlOGI0NmRhZTA0ZDgwODk0ZTciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoieWlzb25nIHlhbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLOUdDc05CelhBTGN0MFZYalhuNlhZV19FVXZpeFpUcUR5cHB4eERPV1Q9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZHJlYW1wZW4tMjI3M2YiLCJhdWQiOiJkcmVhbXBlbi0yMjczZiIsImF1dGhfdGltZSI6MTY5NTUzNzQ3NCwidXNlcl9pZCI6IjByNUpPaU5tSGRWWFRHa1pLM1lLZ3dRdFVIMTMiLCJzdWIiOiIwcjVKT2lObUhkVlhUR2taSzNZS2d3UXRVSDEzIiwiaWF0IjoxNjk3MDI4MTYwLCJleHAiOjE2OTcwMzE3NjAsImVtYWlsIjoieXlzMTMyNjA3NjMyOTdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTQwNzExNDIzMjU1MzY4MTM3OTEiXSwiZW1haWwiOlsieXlzMTMyNjA3NjMyOTdAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.lwLyl4gMptSDu6Mj0joFsMI6R_y_X0Evrm86uneiW7HUiHaDA6PG36CX7Um7yGLknfmo9XgnsTve_M22K26lx6VDyIe-tWkfQAbCXG4MSHiY284vtHDeTBzgKbD4zr7wfwPjBGBNYGtV-umz1wFtIh33DZ2fVbeyjFOIBAu1l9pTQE5LXaJvcVSKsI_8LnApz6e4QrXzs0SEL1JHqLJCNsAAY4QQx3-dk0KrA9rxnFIBQ-lDfbZPF5CXZPcdaS71EjRsaUIsSupggdJ45LRsV1hHU1fLSs10VrpxUPluxQaXlMSfP8lW08yBvZ_4MoPros_s7x668UHovmiQhFQKAA"
export default handlerWrapper({
  // {id}
  POST: async function handler(req, res) {
    const { data } = req.body
    console.log(data,'data',req.body)
    const result = await axios.post('https://us-central1-dreampen-2273f.cloudfunctions.net/submitPromptAuth',{data}).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
   console.log('result',result)
    return {
      message: 'success'
    };
  },

});