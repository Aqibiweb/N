import axios from "axios";

let backendUrl = "http://45.32.80.95:5000/api/";

export const getPostCall =(url:string, method:string, data:any) =>{
    return new Promise((resolve, reject) => {
      try {
        var config = {
          method: method,
          url: backendUrl + url,
          data: data,
        };
        axios(config)
          .then((e) => {
            resolve(e);
          })
          .catch((e) => {
            reject(e);
          });
      } catch (e) {
        reject(e);
      }
    });
  }


