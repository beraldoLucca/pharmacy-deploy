import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../utils/database'

interface ErrorResponseType {
    error: string
}

interface SucessResponseType {
    _id: string;
    cns: string;
    cpf: string;
    name: string;
    age: number;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SucessResponseType>
): Promise<void> => {


    if (req.method === "POST") {

        const { cns, cpf, name, age, cellphone, address, status } = req.body;

        if (!cns) {
            res.status(400).json({ error: 'Por favor, insira o CNS' });
            return;
        }

        const { db } = await connect();

        const cnsExists = await db
            .collection('clients')
            .findOne({ cns: cns})
        
        if(!cnsExists){
            if(!name || !age || !cellphone || !address){
                res.status(400).json({ error: 'É necessário passar o nome, a idade, o telefone e o endereço' });
                return;
            }
            const response = await db.collection('clients').insertOne({
                cns,
                cpf,
                name,
                age,
                cellphone,
                address,
                status: 'ATIVO',
            });
            res.status(200).json(response.ops[0])
            return;
        }

        const statusClient = 'INATIVO';

        await db.collection('clients').updateOne({ cns: cns}, {$set: {status: statusClient}});

        res.status(200).json(status);
    }
    else {
        res.status(400).json({ error: 'Wrong request Method' });
    }
}

