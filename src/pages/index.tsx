import styles from './styles.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useForm} from 'react-hook-form';
import Home from './home';
import Router from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"
import { NextPage } from 'next';
import useSWR from 'swr';
import api from '../../utils/api';
import  ReactDOM  from 'react-dom';
import { getSession } from 'next-auth/react';

export default function Component() {
  const LogIn = (event:any) => {
    event.preventDefault();

    return event.target.email.value
    // const data= {
    //     email : event.target.email.value,
    //     password : event.target.senha.value, 
    // }
    // api.post("/user/login",data).then(response =>{
    //     if(response.data){
    //         const token = response.data
    //         const data:any = jwt(token)
    //         setUserRole(data.role)
    //         login(response.data);
    //         navigate('/');
    //     }
    // })
    // const {data, error} = useSWR(`/api/admin/${email}`, api);
}
  

  // const {data, error} = useSWR(`/api/admin/${session}`, api);

  // if(error){
  //   console.log(error)
  // }

  // if(data){
  //   console.log(data)
  // }
  // const { data: session } = useSession();
  // const {data, error} = useSWR(`/api/admin/${session?.user.email}`, api);
  
      
          return (
            <Home/>
          )
        
};
{/* {!session && (
        <Button className={styles.botao} onClick={() => signIn('auth0', {callbackUrl: 'http://localhost:3000/api/auth/callback/auth0'})}>
          Logar</Button>)}
      {session && (<Home/>) && (
      <Button className={styles.botao} onClick={() => signOut({callbackUrl: 'http://localhost:3000/'})}>Sair</Button>)}   */}

// const handleSubmit = (event) => {
//   event.preventDefault();

//   const name = event.target.email.value

//   console.log(name)

// };

// export default function Login(){
//   const{data, session} = useSession();

  // function handleSignIn(data){
  //   Router.push('/home')
  //   console.log(data)
  // }
    
  // const navigate = useNavigate();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const LogIn = (event:any) => {
  //     event.preventDefault();
  //     navigate('/home');
      // const data= {
      //     email : event.target.email.value,
      //     password : event.target.email.value, 
      // }
      // api.post("/user/login",data).then(response =>{
      //     if(response.data){
      //         const token = response.data
      //         const data:any = jwt(token)
      //         setUserRole(data.role)
      //         login(response.data);
              
      //     }
      // })

  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // )

  // return (
  //   <div >
  //     <Form className={styles.pageInicial} onSubmit={handleSubmit(handleSignIn)}>
  //       <Form.Group className='mb-3' controlId="formBasicEmail">
  //         <Form.Label>Email</Form.Label>
  //         <Form.Control {...register('email')} type="email" placeholder="digite seu email" name='email'/>
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="formBasicPassword">
  //         <Form.Label>Senha</Form.Label>
  //         <Form.Control {...register('senha')} type="password" placeholder="digite sua senha" name='senha'/>
  //         <Form.Text className="text-muted">
  //           Nunca compartilhe sua senha com outras pessoas.
  //         </Form.Text>
  //       </Form.Group>
  //       <Button type="submit">
  //         Entrar
  //       </Button>
  //     </Form>
  //   </div>
  // )

