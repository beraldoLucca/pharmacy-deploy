import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";
import styles from './stylesPatient.module.scss';
import { format } from 'date-fns';
import Router from 'next/router';
import { useState } from "react";
import Link from "next/link";

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

export default function PatientPage(props): JSX.Element {
    const isRetirado = "RETIRADO";
    const [nome, setNome] = useState('');
    const [meses, setMeses] = useState('');
    const propsRequest = props.patient;
    async function atualizar(request_id: string, cns: string, cpf: string, nameMedicine: string, nome: string, meses: string) {

        const data = { request_id, cns, cpf, nameMedicine, nome, meses };
        try {
            await axios.post("/api/requests", data);
            alert("Pedido atualizado com sucesso!");
            setNome('');
            Router.push(`/writeOffRequest/${cns}`)
        } catch (error) {
            alert(error.response.data.error);
        }
    }
    const requestList = propsRequest.map((prop) =>

        <tr className={styles.tr} key={prop.cns}>
            <td className={styles.td}>{prop.cns}</td>
            <td className={styles.td}>{prop.cpf}</td>
            <td className={styles.td}>{prop.nameMedicine}</td>
            <td className={styles.td}>{format(new Date(prop.dateRequest), 'dd.MM.yyyy')}</td>
            {prop.dateWithdrawal != null && <td className={styles.td}>{format(new Date(prop.dateWithdrawal), 'dd.MM.yyyy')}</td>}
            {prop.dateWithdrawal == null && <td className={styles.td}></td>}
            {prop.nome != "" && <td className={styles.td}>{prop.nome}</td>}
            {prop.nome == "" && <td><input className={styles.inputTextNome}
                type="nome"
                placeholder="Digite o nome de quem retirou o remédio..."
                value={nome}
                onChange={(e) => setNome(e.target.value)} /></td>}
            {prop.nome != "" && <td className={styles.td}>RETIRADO</td>}
            {prop.nome == "" && <td><select value={meses} onChange={(e) => setMeses(e.target.value)}>
            <option value="0">0</option>
                <option value="1">1</option>
                <option value="3">3</option>
            </select></td>}
            <button onClick={() => atualizar(prop._id, prop.cns, prop.cpf, prop.nameMedicine, nome, meses)} className={prop.status == isRetirado ? styles.buttonretirado : styles.buttonretirar} disabled={prop.status == isRetirado ? true : false}>{prop.status}</button>
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
                        <th className={styles.td}>DATA PREVISTA PARA RETIRADA</th>
                        <th className={styles.td}>DATA DE RETIRADA</th>
                        <th className={styles.td}>NOME DE QUEM RETIROU</th>
                        <th className={styles.td}>PRÓXIMA RETIRADA(EM MESES)</th>
                        <th className={styles.td}>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {requestList}
                </tbody>
            </table>
            <Link href="/writeOffRequest">
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