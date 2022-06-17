import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";
import styles from './stylesPatient.module.scss';
import  Link  from "next/link";
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
    const isRetirado = "RETIRADO";
    const isnotRetirado = "RETIRAR";
    const propsRequest = props.patient;
    const requestList = propsRequest.map((prop) =>
        prop.dateWithdrawal!=null &&
        <tr className={styles.tr}>
            <td className={styles.td}>{prop.cns}</td>
            <td className={styles.td}>{prop.cpf}</td>
            <td className={styles.td}>{prop.nameMedicine}</td>
            <td className={styles.td}>{format(new Date(prop.dateRequest), 'dd.MM.yyyy')}</td>
            <td className={styles.td}>{format(new Date(prop.dateWithdrawal), 'dd.MM.yyyy')}</td>
            <button className={styles.buttonretirado}>{prop.status}</button>
        </tr>
    
    );
    return (
        <div className={styles.divCentral}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.td}>CNS</th>
                        <th className={styles.td}>CPF</th>
                        <th className={styles.td}>REMÉDIO</th>
                        <th className={styles.td}>DATA DO PEDIDO</th>
                        <th className={styles.td}>DATA DE RETIRADA</th>
                        <th className={styles.td}>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                {requestList}
                </tbody>
            </table>
            <Link href="/searchPatientRequests">
                <Button className={styles.inputSubmitComeback}>Voltar</Button>
            </Link>
        </div>)
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const cns = context.query.cns as string;

    const response = await axios.get(`http://localhost:3000/api/request/${cns}`);
    const patient = response.data;
    return {
        props: { patient },
    };
};