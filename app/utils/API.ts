import axios from "axios";
import { apis } from "../../constant";

export const getPostCall =(url:string, method:string, data:any) =>{
  console.log("ALL API HIT ----",data)

    return new Promise((resolve, reject) => {
      try {
        var config = {
          method: method,
          url: apis.news + url,
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


