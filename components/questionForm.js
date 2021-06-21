import {useEffect} from 'react'

import { useForm ,Controller} from "react-hook-form";
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  mixins:{
      ...theme.mixins.toolbar
  },
  card:{
      paddingTop:"5em",
      backgroundColor:"#F5E6CA"
  }
}))

let isNew;

const Questionform = ({onSubmit,initialData = {}}) => {
  useEffect(() => {
    isNew = window.location.pathname === '/portfolios/new'?true:false
  },[])
  const { handleSubmit, control} = useForm({defaultValues: initialData});
  const classes = useStyles()
    return (<Paper style={{height:"100rem",backgroundColor:"#F0EBCC"}}>
    <Card classes={{root:classes.card}}>
      <form onSubmit={handleSubmit(onSubmit)}>

          <Controller control={control} name="question"
            render={({field}) => (
              <CardContent>{
                isNew?<Controller control={control} name="question"
            render={({field}) => (
              <CardContent>
              <TextField {...field}
                  label="Question"
                  style={{width:"100%"}}
                  multiline
                  rows={3}
                  variant="outlined"
                  type="text"/>
              </CardContent>
            )}/>:<Typography>Question : {initialData.question}</Typography>
              }
              </CardContent>
            )}
          />
          
            {
             !isNew?<Controller control={control} name="answer"
            render={({field}) => (
              <CardContent>
              <TextField {...field} defaultValue={initialData.answer}
                  label="Answer"
                  style={{width:"100%"}}
                  multiline
                  rows={10}
                  variant="outlined"
                  type="text"/>
              </CardContent>
            )}
          />:null
            }
  
        <button type="submit" >POST
        </button>
      </form>
      </Card>
    </Paper>
    )
  }
  
  export default Questionform;