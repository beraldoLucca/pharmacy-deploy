import { signOut, useSession } from "next-auth/react";
import Link from "next/link"
import Router from "next/router";
import { Button } from "react-bootstrap";
import Email from "./api/admin/[email]";
import styles from './styles.module.scss';
import Component from ".";

export default function Home(){

    // const { data: session } = useSession();

    // if(session){
        return (
        // <div>
          <div>
          <Link href="/newMedicine">
          <Button className={styles.button}>Cadastrar remédio</Button>
          </Link>
          <br></br>
          <Link href="/searchAllMedicines">
          <Button className={styles.button}>Visualizar todos os medicamentos</Button>
          </Link>
          <br></br>
          <Link href="/newPatient">
          <Button className={styles.button}>Cadastrar paciente</Button>
          </Link>
          <br></br>
          <Link href="/searchAllPatients">
          <Button className={styles.button}>Visualizar todos os pacientes</Button>
          </Link>
          <br></br>
          <Link href="/newRequest">
          <Button className={styles.button}>Cadastrar pedido</Button>
          </Link>
          <br></br>
          <Link href="/gatherMedicineAndSid">
          <Button className={styles.button}>Vincular um remédio a um sid</Button>
          </Link>
          <br></br>
          <Link href="/dateOfMedicineArrival">
          <Button className={styles.button}>Cadastrar chegada de nova remessa de remédio</Button>
          </Link>
          <br></br>
          <Link href="/searchPatientRequests">
          <Button className={styles.button}>Visualizar histórico de pedido de um paciente</Button>
          </Link>
          <br></br>
          <Link href="/writeOffRequest">
          <Button className={styles.button}>Dar baixa em um pedido</Button>
          </Link>
          <br></br>
          <Link href="/">
          <Button className={styles.button} onClick={() => signOut()}>Sair</Button>
          </Link>
      </div>
    //   )}
    // //   </div>);
    //   }
    // return(
    //     <Component/>
    // )
        );
};
