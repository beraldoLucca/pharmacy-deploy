import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../newRequest/stylesRequest.module.scss';
import api from '../../../utils/api';
import axios from 'axios';

interface Patient {
    _id: string;
    cns: string;
    cpf: string;
    name: string;
    age: number;
}

const NewPatientPage: NextPage = () => {
    const [textInput, setTextInput] = useState('');

    const [dados, setDados] = useState<Patient[]>([]);

    const [id, setId] = useState('');
    const [cns, setCNS] = useState('');
    const [cpf, setCPF] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [address, setAddress] = useState('');
    // const { data, error } = useSWR(
    //     textInput !== '' ? `/writeOffPatient/${textInput}` : null,
    //     api
    // );
    const handleRegister =
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            //   setCNS(document.getElementsByTagName('input')[0].value);
            //   setCPF(document.getElementsByTagName('input')[1].value);
            //   setNamePatient
            (document.getElementsByTagName('input')[2].value);

            const data = {
                cns,
                cpf,
                name,
                age,
                cellphone,
                address,
            };
            try {
                await axios.post("/api/clients", data);
                alert("Paciente cadastrado com sucesso!");
                setCNS("");
                setCPF("");
                setName("");
                setAge("");
                setCellphone("");
                setAddress("");
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
                        placeholder="Digite o CNS do paciente..."
                        value={cns}
                        onChange={(e) => setCNS(e.target.value)} />
                    <br></br>
                    <input className={styles.inputText}
                        type="name"
                        placeholder="Digite o CPF do paciente..."
                        value={cpf}
                        onChange={(e) => setCPF(e.target.value)} />
                    <br></br>
                    <input className={styles.inputText}
                        type="name"
                        placeholder="Digite o nome do paciente..."
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <br></br>
                    <input className={styles.inputText}
                        type="number"
                        step="1"
                        placeholder="Digite a idade do paciente..."
                        value={age}
                        onChange={(e) => setAge(e.target.value)} />
                    <br></br>
                    <input className={styles.inputText}
                        type="name"
                        step="1"
                        placeholder="Digite o telefone do paciente..."
                        value={cellphone}
                        onChange={(e) => setCellphone(e.target.value)} />
                    <br></br>
                    <input className={styles.inputText}
                        type="name"
                        step="1"
                        placeholder="Digite o endereço do paciente..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                    <br></br>
                    <input className={styles.inputSubmit} type="submit" value="Cadastrar" />
                    <br></br>
                    <Link href={"/home"}>
                        <input className={styles.inputSubmit} type="submit" value="Voltar" />
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default NewPatientPage;
