import Questionform from 'components/questionForm'
import {usePostQuestion} from 'actions/postQuestion'
import {useUser} from '@auth0/nextjs-auth0';
import { useEffect } from 'react';
import {useRouter} from 'next/router'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
//import {useRouter} from 'next/router'

const NewQuestion = () =>{
    const router = useRouter()

    useEffect(()=>{
        router.push('/portfolios/new')
    },[])

const {user} = useUser();
const [postQuestion,{data,error,loading}] = usePostQuestion()
    const handleSubmit = (data) =>{
        data.user = user.email
        postQuestion(data);
        router.push('/')
     }

    return <Questionform onSubmit = {handleSubmit}/>
}

export default NewQuestion

export const getServerSideProps = withPageAuthRequired();