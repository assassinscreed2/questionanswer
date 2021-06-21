import Paper from '@material-ui/core/Paper';
import {useEffect} from 'react'
import router from 'next/router'

export default function Home() {

useEffect(()=>{
  router.push('/portfolios')
},[])

  return (<>
    <Paper variant="outlined" style={{height:"100em",backgroundColor:"green"}}>
      <h1>WELCOME</h1>
    </Paper>
    
  </>
        
  )
}
