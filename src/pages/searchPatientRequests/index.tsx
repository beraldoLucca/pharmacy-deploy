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
import styles from './stylesPatient.module.scss';
import api from '../../../utils/api';

interface Patient {
    _id: string;
    name: string;
    email: string;
    cellphone: string;
    cns: string;
    age: number;
    status: object;
}

const SearchPage: NextPage = () => {
    const [textInput, setTextInput] = useState('');

    const [dados, setDados] = useState<Patient[]>([]);

    const { data, error } = useSWR(
        textInput !== '' ? `/searchPatientRequests/${textInput}` : null,
        api
    );
      const handleSearch = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          setTextInput(document.getElementsByTagName('input')[0].value);
        },
        [setTextInput]
      );

    return (
        <div>
            <div>
                <form onSubmit={handleSearch}>
                    <input className={styles.inputText}
                        type="text"
                        placeholder="Digite o paciente que você procura..."
                    />
                    <br></br>
                    <input className={styles.inputSubmit} type="submit" value="Pesquisar" />
                    <br></br>
                    <Link href={"/home"}>
                    <input className={styles.inputSubmit} type="submit" value="Voltar" />
                    </Link>
                </form>
                {data &&
                        <Link href={`/searchPatientRequests/${textInput}`} key={textInput}>
                            <a>
                                <h1 className="text-2xl border-2 border-box w-1/2 m-auto mt-4 py-2">
                                    Clique aqui para mais detalhes do paciente com CNS: {textInput}
                                </h1>
                            </a>
                        </Link>
                    }

                {error && (
                    <div className="text-xl">
                        <h1>Paciente com CNS: {textInput} não existe</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;