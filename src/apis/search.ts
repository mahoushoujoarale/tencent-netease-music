import {request} from "@/utils/request"
export const getSearchSuggest=(keywords:String)=>{
    if(keywords===""){
        return request("/search/hot") as Promise<any>
    }else{
        return request(`/search/suggest?keywords=${keywords}`) as Promise<any>
    }
}
export const getSearchData=(keyword:String,type:String)=>{
    return request(`/search?keywords=${keyword}&type=${type}&limit=20`) as Promise<any>
}
    
