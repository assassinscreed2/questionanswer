import axios from 'axios'

export default async function(req,res){
try{
    const data = req.body
    await axios.post('https://welcomequestion.herokuapp.com/question',data)
    return res.json({message:"Question was created"})

}catch(e){
    return res.status(e.status || 400).end(e.message)
}
}