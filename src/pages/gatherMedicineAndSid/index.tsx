import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../newRequest/stylesRequest.module.scss';
import api from '../../../utils/api';
import axios from 'axios';
import Router from "next/router";

interface Medicine {
    name: string;
    quantity: number;
}

const NewMedicinePage: NextPage = () => {
    const [textInput, setTextInput] = useState('');

    const [dados, setDados] = useState<Medicine[]>([]);

    const [nameMedicine, setNameMedicine] = useState('');
    const [sid, setSid] = useState('');
    // const { data, error } = useSWR(
    //     textInput !== '' ? `/writeOffPatient/${textInput}` : null,
    //     api
    // );
    const handleRegister =
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const data = {
                nameMedicine,
                sid,
            };

            try {
                await axios.post("/api/medicineAndSid", data);
                alert("Medicamento vinculado com sucesso!");
                Router.push('/searchAllMedicines');
            } catch (err) {
                alert(err.response.data.error);
            }
        };


    return (
        <div>
            <div>
                <form onSubmit={handleRegister}>
                    <input className={styles.inputText}
                        type="name"
                        placeholder="Digite o nome do medicamento..."
                        value={nameMedicine}
                        onChange={(e) => setNameMedicine(e.target.value)} />
                    <br></br>
                    <input className={styles.inputText}
                        type="name"
                        step="1"
                        placeholder="Digite o Sid do medicamento"
                        value={sid}
                        onChange={(e) => setSid(e.target.value)} />
                    <br></br>
                    <input className={styles.inputSubmit} type="submit" value="Cadastrar" />
                    <br></br>
                    <Link href={"/home"}>
                        <input className={styles.inputSubmit} type="submit" value="Cancelar" />
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default NewMedicinePage;
