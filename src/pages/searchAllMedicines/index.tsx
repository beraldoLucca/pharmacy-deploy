import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";
import styles from './stylesListMedicineSid.module.scss';
import  Link  from "next/link";
import Router from 'next/router';
import { format } from 'date-fns';
import classNames from "classnames";
import useSWR from "swr";
import api from "../../../utils/api";
import { useCallback, useState } from "react";
import { id } from "date-fns/locale";

interface Status {
    status: string;
}

interface Medicine {
    _id: string;
    name: string;
    quantity: number;
}

export default function medicinesPage(props): JSX.Element {
        
    const propsMedicines = props.medicinesList;

    const medicinesList = propsMedicines.map((prop) =>
        
        <tr className={styles.tr} id="index" key={prop.name}>
            <td className={styles.td} >
                        <h1>
                            <a href={`/searchAllMedicines/${prop.name}`} className="text-2xl border-2 border-box w-1/2 m-auto mt-4 py-2" >
                                {prop.name}
                            </a>
                        </h1>
                    </td>
        </tr>
    );
    

    return (
        <div className={styles.divCentral}>
            <h1>Consulta por MEDICAMENTO</h1>
            <br></br>
            <table className={styles.table}>
                <thead>
                </thead>
                <tbody>
                    {medicinesList}
                </tbody>
            </table>
            <Link href="/home">
                <Button className={styles.inputSubmitComeback}>Voltar</Button>
            </Link>
        </div>)
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const response = await axios.get("http://localhost:3000/api/medicinesList");
    const medicinesList = response.data;
    return {
        props: { medicinesList },
    };
};
