import GetPortfolio from 'lib/api/portfolio'

export default async function handlePortfolio(req,res){
console.log(req.method);
if(req.method === 'GET'){
    const json = await new GetPortfolio().getById(req.query.id);
    return res.json(json.data)
}

if(req.method === 'PATCH'){
    const json = await new GetPortfolio().update(req.query.id,req.body);
    return res.json(json.data);
}

if(req.method == 'DELETE'){
    const json = await new GetPortfolio().delete(req.query.id)
    return res.json(json.data)
}
}
