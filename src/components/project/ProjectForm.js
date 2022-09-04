import {useEffect, useState} from 'react'

import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({handleSubmit, btnText, projectData}) {
    const [categories,setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

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

    const submit = (e) => {
        e.preventDefault() //Form 
        handleSubmit(project)
    }

    //Inputs
    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value })
    }

    //Categories
    function handleCategory(e) {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text" 
                text="Nome do Projeto" 
                name="name" 
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type="number" 
                text="Orçamento do Projeto" 
                name="budget" 
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select 
                name="category_id"
                text="Selecione a Categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}
export default ProjectForm
