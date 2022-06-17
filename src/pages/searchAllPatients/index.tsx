import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";
import styles from './stylesListPatients.module.scss';
import { Link } from "react-router-dom";
import Router from 'next/router';
import { format } from 'date-fns';
import classNames from "classnames";

interface Status {
    status: string;
}

interface Patient {
    _id: string;
    cns: string;
    name: string;
    cpf: string;
    age: number;
}

export default function patientPage(props): JSX.Element {
    const isAtivo = "ATIVO";
    function inativar(cns: string){
        const data = {cns};
        try {
            axios.post("/api/clients", data);
            alert("Cliente atualizado com sucesso!");
            Router.push('/searchAllPatients')
        } catch (error) {
            alert("Não foi possível realizar um novo pedido");
        }
        
    }
    
    const propsPatients = props.patientList;
    
    const patientList = propsPatients.map((prop) =>
    
        <tr className={styles.tr}>
            <td className={styles.td}>{prop.cns}</td>
            <td className={styles.td}>{prop.cpf}</td>
            <td className={styles.td}>{prop.name}</td>
            <td className={styles.td}>{prop.age}</td>
            <td className={styles.td}>{prop.cellphone}</td>
            <td className={styles.td}>{prop.address}</td>
            <td className={styles.td}>{prop.status}</td>
            {prop.status==isAtivo && <td><button className={styles.buttonretirado} 
            onClick={() => inativar(prop.cns)}>Inativar</button></td>}
            {prop.status!=isAtivo && <td></td>}
        </tr>
    );
    return (
        <div className={styles.divCentral}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.td}>CNS</th>
                        <th className={styles.td}>CPF</th>
                        <th className={styles.td}>NOME</th>
                        <th className={styles.td}>IDADE</th>
                        <th className={styles.td}>TELEFONE</th>
                        <th className={styles.td}>ENDEREÇO</th>
                        <th className={styles.td}>STATUS</th>
                        <th className={styles.td}></th>
                    </tr>
                </thead>
                <tbody>
                    {patientList}
                </tbody>
            </table>
            <a href="/home">
                <Button className={styles.inputSubmitComeback}>Voltar</Button>
            </a>
        </div>)
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {

    const response = await axios.get("http://localhost:3000/api/clientsList");
    const patientList = response.data;
    return {
        props: { patientList },
    };
};