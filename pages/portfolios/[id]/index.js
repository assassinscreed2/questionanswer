import {useRouter} from 'next/router'
import GetPortfolio from 'lib/api/portfolio'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
    mixins:{
        ...theme.mixins.toolbar
    },
    card:{
        paddingTop:"5em",
        backgroundColor:"#F5E6CA"
    }
}))


const detailPage = ({question}) => {
    const router = useRouter()
    const classes = useStyles()

    return <Paper style={{height:"100rem",backgroundColor:"#F0EBCC"}}>
    <Card classes={{root:classes.card}}>
        <CardContent>
            <Typography>Question : {question.question}</Typography>
        </CardContent>
        <CardContent>
        {question.answer ? <Typography>Answer : {question.answer}</Typography>:<Typography>Answer: No Answer Yet</Typography>}
        </CardContent>
    </Card>
    </Paper>
}

export async function getServerSideProps({query}){
    const json = await new GetPortfolio().getById(query.id)
    const question = json.data
    return {props : {question}}
}

// getinitialprops can have query parameter to access data 
 
export default detailPage 