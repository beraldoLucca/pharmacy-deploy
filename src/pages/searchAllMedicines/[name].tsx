import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";
import styles from './stylesListMedicineSid.module.scss';
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

export default function patientPage(props): JSX.Element {

    const reqMedSid = props.responseMedicineSid;
    
    const requestMedList = reqMedSid.map((prop) =>

        <tr className={styles.tr} key={prop.sid}>
            <td className={styles.td}>{prop.sid}</td>
        </tr>
    );
    return (
        <div className={styles.divCentral}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.td}>SID</th>
                    </tr>
                </thead>
                <tbody>
                    {requestMedList}
                </tbody>
            </table>
            <Link href="/searchAllMedicines">
                <Button className={styles.inputSubmitComeback}>Voltar</Button>
            </Link>
        </div>)
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const nameMedicine = context.query.name as string;
    
    const response = await axios.get(`http://localhost:3000/api/medicineSid/${nameMedicine}`);
    const responseMedicineSid = response.data;
    return {
        props: { responseMedicineSid },
    };
};