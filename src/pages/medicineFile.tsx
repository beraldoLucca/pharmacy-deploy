import Link from "next/link"
import { Button } from "react-bootstrap";
import styles from './styles.module.scss';

function fileImport(){
    console.log("ok")
}

export default function MedicineFile(){
    return(
        <div>
            <input type="file" onClick={() => fileImport()}></input>
        </div>
    )
}