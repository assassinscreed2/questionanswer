import Link from 'next/link'
import {useGetData} from 'actions'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from "next/router"
import {useState, useEffect } from 'react';
import GetPortfolio from 'lib/api/portfolio'
import {useDeleteQuestion} from 'actions/postQuestion'

import {makeStyles} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>({
  root:{
    width:"100%",
   minWidth:"20em",
   minHeight:"5em"
  },
cards:{
  backgroundColor:"#3EDBF0",
  width:"80%",
  marginLeft:"2em",
  maxHeight:"10em",
  minHeight:"9em",
  [theme.breakpoints.down("sm")]:{
    marginLeft:"0",
    width:"100%",
    maxWidth:"100%"
  },
  [theme.breakpoints.down("lg")]:{
    marginLeft:"0",
    width:"100%",
    maxWidth:"100%"
  }
},
gridItems:{
  backgroundColor:"red",
  marginTop:"3em",
  maxWidth:"30em",
  [theme.breakpoints.down("md")]:{
    width:"1em"
  },
  [theme.breakpoints.down("sm")]:{
    width:"100%",
    maxWidth:"100%"
  }
}
}
))

export default function portfolios({user,questions:newQuestion}){
    const theme = useTheme();
    const router = useRouter();
    const classes = useStyles();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))
    const [question,setQuestion] = useState(newQuestion)
    
    useEffect(() => {
      if (!user) {
        router.push("/about")
      }
    }, [])

    const [deletePortfolio,{data,error,loading}] = useDeleteQuestion();

    const _deletePortfolio = async (e,id) => {
      e.stopPropagation();
      const isConfirm = confirm("sachi me delete karna hai na ??");
      if(isConfirm){
        await deletePortfolio(id);
        const newQues = question.filter(q => q._id !== id)
        setQuestion(newQues)
        debugger
      }
      
    }

    const renderPosts = (question) => {
        return question.map(ques => 
        <Grid item key = {ques._id} md={4} sm={6} xs={12} className={classes.gridItems}>
        <Link href={`/portfolios/${ques._id}`}>
        <Card className={classes.cards}>
            <CardContent>
              <Typography>
                <b>Question : </b>{ques.question.length>45?ques.question.substring(0,40)+"...":ques.question}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={()=>router.push(`/portfolios/${ques._id}/edit`)}>
                Give Answer
              </Button>
              {user.email===ques.user && <Button onClick={(e)=>_deletePortfolio(e,ques._id)}>Delete</Button>}
            </CardActions>
          </Card></Link>
        </Grid>)
    }

    return <Paper style={{height:"100rem",backgroundColor:"#F0EBCC"}}>
        <Grid container justify="space-between" direction={matchesXS?"column":"row"} className={classes.root}>
            {question && renderPosts(question)}
        </Grid>
    </Paper>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx){
    const json = await new GetPortfolio().getAll();
    const questions = json.data
    return { props: { questions } };
  }
});