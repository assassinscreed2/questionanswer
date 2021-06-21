import {useState} from 'react'

const fetcher = (url) =>
    (fetch(url).then(
        async (res) => {
            
            const result = await res.json();
       
            if(res.status == 200){return result}
            else{return Promise.reject(result)}
        }
    ))

export function apiHandler(apiCall){
    const [reqState,setReqState] = useState({
        data:null,
        error:null,
        loading:false
     })
  
     const handler = async (...data)=>{
        setReqState({data:null,error:null,loading:true})
       try{ const json = await apiCall(...data)
        setReqState({data:json.data,error:null,loading:false})
        return json.data
    }
        catch(e){
           const message = (e.response && e.response.message) || "Something Wrong"
           setReqState({data:null,error:message,loading:false})
           return Promise.reject(message);
        }
     }
  
     return [handler,{...reqState}]
}