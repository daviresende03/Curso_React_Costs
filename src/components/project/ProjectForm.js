import {useEffect, useState} from 'react'

import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({btnText}) {
    const [categories,setCategories] = useState([])

    useEffect(() => { //Utilizado para realizar a consulta apenas uma vez (quando necessário)
        fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then((resp) => resp.json()) //Transformar resposta em json
        .then((data) => { 
            setCategories(data) //Passando os dados em json para a const categories
        })
        .catch((err) => console.log(err)) //Caso ocorra erro será logado no console
    }, []) //Os dados serão passados para o array



    return (
        <form className={styles.form}>
            <Input
                type="text" 
                text="Nome do Projeto" 
                name="name" 
                placeholder="Insira o nome do projeto"
            />
            <Input
                type="number" 
                text="Orçamento do Projeto" 
                name="budget" 
                placeholder="Insira o orçamento total"
            />
            <Select 
                name="category_id"
                text="Selecione a Categoria"
                options={categories}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}
export default ProjectForm
