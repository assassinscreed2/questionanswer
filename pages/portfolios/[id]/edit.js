import {useRouter} from 'next/router'
import {useState,useEffect} from 'react'

import {useGetQuestion,useUpdateQuestion} from 'actions/postQuestion'
import Questionform from 'components/questionForm'
import Snackbar from '@material-ui/core/Snackbar';


const QuestionEdit = () => {
    const router = useRouter()
    const [openSnak, setOpenSnak] = useState(false);
    const [updatePortfolio,{data,error,loading}] = useUpdateQuestion();

    useEffect(()=>{
        router.push(`/portfolios/${router.query.id}/edit`)
    },[])

    const _updatePortfolio = (data) => {
        updatePortfolio(router.query.id,data)
        setOpenSnak(true)
        router.push('/portfolios')
    }

    const {data:QuestionData} = useGetQuestion(router.query.id);
    return <>
     <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnak}
        message="Question Posted Successfully"
      />
    {QuestionData&&<Questionform onSubmit={_updatePortfolio} initialData={QuestionData} _updatePortfolio/>}
    </>
}
// getinitialprops can have query parameter to access data 
 
export default QuestionEdit