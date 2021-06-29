import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function Home({user}) {

  return (<>
    <Paper variant="outlined" style={{height:"43em",backgroundColor:"#F7DBF0"}}>
      <Card style={{marginTop:"13%",marginLeft:"33%",maxWidth:"30em",backgroundColor:"#CDF0EA"}}>
        <CardContent>
          <Typography style={{marginLeft:"20%"}}>
            {user?<h3>Welcome {user.name}</h3>:<h1>Welcome User</h1>}
          </Typography>
        </CardContent>
        {!user ? <CardContent>
          <Typography style={{marginLeft:"7%"}}>
            <h3>Please Login to Ask or to Answer question</h3>
          </Typography>
        </CardContent>:<CardContent>
          <Typography style={{marginLeft:"7%"}}>
            <h3>Share Your Question with others or Help someone by answering their questions</h3>
          </Typography>
        </CardContent>}
      </Card>
    </Paper>
  </>   
  )
}
