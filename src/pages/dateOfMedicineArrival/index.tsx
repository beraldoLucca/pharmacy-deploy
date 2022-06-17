import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";
import styles from './stylesListArrivalMedicines.module.scss';
import Link from "next/link";
import Router from 'next/router';
import { format } from 'date-fns';
import classNames from "classnames";

export default function patientPage(props): JSX.Element {
    function inativar(){
        try {
            axios.post("/api/dateArrivalMedicine");
            alert("Chegada do medicamento atualizada com sucesso!");
            Router.push('/dateOfMedicineArrival')
        } catch (error) {
            alert("Não foi possível realizar um novo pedido");
        }
        
    }
    
    const propsMedicines = props.medicinesList;
    
    const medicinesList = propsMedicines.map((prop) =>
    
        <tr className={styles.tr} key={prop.date}>
            <td className={styles.td}>{format(new Date(prop.date), 'dd.MM.yyyy')}</td>
        </tr>
    );
    return (
        <div className={styles.divCentral}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.td}>Data da última chegada dos medicamentos</th>
                        <Button onClick={() => inativar()}>Registrar nova chegada</Button>
                    </tr>
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

    const response = await axios.get("http://localhost:3000/api/dateOfMedicineArrival");
    const medicinesList = response.data;
    return {
        props: { medicinesList },
    };
};