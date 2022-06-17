import moment from "moment";
import { ObjectID } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../utils/database'

interface ErrorResponseType {
    error: string
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | object[]>
): Promise<void> => {


    if (req.method === "POST") {

        const { request_id, cns, cpf, nameMedicine, status, nome, meses } = req.body;
        
        if (!cns || !nameMedicine) {
            res.status(400).json({ error: 'Por favor, insira o CNS e o nome do remédio!' });
            return;
        }

        const { db } = await connect();

        const cnsExists = await db
            .collection('clients')
            .findOne({ cns: cns})
        
        if(!cnsExists){
            res.status(400).json({ error: `Cliente com o cns ${cns} não existe` });
            return;
        }

        const nameMedicineExists = await db
            .collection('medicines')
            .findOne({ name: nameMedicine})
        
        if(!nameMedicineExists){
            
            res.status(400).json({ error: `Remédio ${nameMedicine} não existe` });
            return;
        }
        
        const requestExists = await db
            .collection('requests')
            .findOne({ _id: new ObjectID(request_id)})

        if(requestExists){

            let nomeSemEspacoEmBranco = nome.trim();
            if(nomeSemEspacoEmBranco.length == 0){
                res.status(400).json({ error: 'Por favor, insira o nome de quem retirou o remédio' });
                return;
            }
            if(Number(meses) == 0){
                res.status(400).json({ error: 'Por favor, selecione a quantidade de meses que o paciente irá retornar' });
                return;
            }
            const statusRequest = 'RETIRADO';
            const dataWithdrawal = new Date();
            const nextDate = moment().add(Number(meses), 'month').calendar();
    
            await db.collection('requests').updateOne({ _id: new ObjectID(request_id) }, {$set: {status: statusRequest, dateWithdrawal: dataWithdrawal, nome: nomeSemEspacoEmBranco}});
            await db.collection('requests').insertOne({cns,cpf,nameMedicine,dateRequest: nextDate,status: 'RETIRAR',nome: '',});
    
            res.status(200).json(status);
            return;
        }

        const response = await db.collection('requests').insertOne({
            cns,
            cpf,
            nameMedicine,
            dateRequest: new Date(),
            status: 'RETIRAR',
            nome: '',
        });
        res.status(200).json(response.ops[0])
    }
    else {
        res.status(400).json({ error: 'Wrong request Method' });
    }
}

