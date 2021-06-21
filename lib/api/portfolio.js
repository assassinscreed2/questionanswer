import axios from 'axios'

class GetPortfolio {
     getAll(){ return axios.get('https://welcomequestion.herokuapp.com/test') }

     getById(id){return axios.get(`https://welcomequestion.herokuapp.com/test/${id}`)}

     update(id,data){
          return axios.patch(`https://welcomequestion.herokuapp.com/question/${id}`,data)
     };

     delete(id){
          return axios.delete(`https://welcomequestion.herokuapp.com/question/${id}`)
     }
}



export default GetPortfolio