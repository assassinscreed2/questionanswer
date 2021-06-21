import axios from 'axios'
import {apiHandler} from 'actions'
import {fetcher} from 'actions'
import useSWR from 'swr'

async function createPortfolio(data){
  return await axios.post('/api/v1/questions',data)
}
async function updatePortfolio(id,data){
   return await axios.patch(`/api/v1/questions/${id}`,data)
 }

async function deletePortfolio(id){
   return await axios.delete(`/api/v1/questions/${id}`)
}

export function usePostQuestion(){
   return apiHandler(createPortfolio)
}

export function useUpdateQuestion(){
   return apiHandler(updatePortfolio)
}

export function useDeleteQuestion(){
   return apiHandler(deletePortfolio)
}


export const useGetQuestion = (id) => {
   const {data,error,...rest} = useSWR(id ? `/api/v1/questions/${id}`:null,fetcher)
   return {data,error,loading:!data && !error, ...rest}
}
