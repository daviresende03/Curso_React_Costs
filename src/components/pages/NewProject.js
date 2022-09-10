import {useNavigate} from 'react-router-dom'
import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'

function NewProject() {

    const navigate = useNavigate()

    function CreatePost(project) {
        //Inicializar o custo e serviços
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate('/projects', {state:{message: 'Projeto Criado com Sucesso!'}}) //Redirecionar
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={CreatePost} btnText="Criar Projeto"/>
        </div>
    )
}
export default NewProject
