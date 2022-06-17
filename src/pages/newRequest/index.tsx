// export default function SearchPatient(){
//     return(
//         <div>
//             <input type="file"></input>
//         </div>
//     )
// }
import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './stylesRequest.module.scss';
import api from '../../../utils/api';
import axios from 'axios';

interface Request {
    request_id: string;
    cns: string;
    cpf: string;
    nameMedicine: string;
    status: string;
}

const InsertRequestPage: NextPage = () => {
    const [textInput, setTextInput] = useState('');

    const [dados, setDados] = useState<Request[]>([]);

    const [cns, setCNS] = useState('');
    const [cpf, setCPF] = useState('');
    const [nameMedicine, setNameMedicine] = useState('');
    // const { data, error } = useSWR(
    //     textInput !== '' ? `/writeOffPatient/${textInput}` : null,
    //     api
    // );
      const handleSearch = 
        async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

        //   setCNS(document.getElementsByTagName('input')[0].value);
        //   setCPF(document.getElementsByTagName('input')[1].value);
        //   setNameMedicine(document.getElementsByTagName('input')[2].value);

        const data = {
            cns,
            cpf,
            nameMedicine,
        };
        try {
            await axios.post("/api/requests", data);
            alert("Pedido realizado com sucesso!");
            setCNS("");
            setCPF("");
            setNameMedicine("");
        } catch (err) {
            alert(err.response.data.error);
        }
    };


    return (
        <div>
            <div>
                <form onSubmit={handleSearch}>
                    <input className={styles.inputText}
                        type="cns"
                        placeholder="Digite o CNS do paciente que deseja o remédio..."
                        value={cns}
                        onChange={(e) => setCNS(e.target.value)}/>
                    <br></br>
                    <input className={styles.inputText}
                        type="cpf"
                        placeholder="Digite o CPF do paciente..."
                        value={cpf}
                        onChange={(e) => setCPF(e.target.value)}/>
                    <br></br>
                    <input className={styles.inputText}
                        type="nameMedicine"
                        placeholder="Digite o nome do remédio..."
                        value={nameMedicine}
                        onChange={(e) => setNameMedicine(e.target.value)}/>
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

export default InsertRequestPage;