import { React, useState, useCallback, useEffect } from "react"
import { FaGithub, FaPlus, FaTemperatureLow, FaSpinner, FaBars, FaTrash } from "react-icons/fa"
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles"

import api from "../../services/api"
import { Link } from "react-router-dom";

export default function Main () {

    const [newRepo, setNewRepo] = useState("");
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // Buscar
    useEffect(() => {
        const reposStorage = localStorage.getItem("repos");

        if (reposStorage) {
            setRepositorios(JSON.parse(reposStorage));
        }

    }, []);

    // Salvar
    useEffect(() => {
        localStorage.setItem("repos", JSON.stringify(repositorios));
    }, [repositorios]);


    function handleinputChange (e) {
        setNewRepo(e.target.value);
        setAlert(null);
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setLoading(FaTemperatureLow);

        async function submit () {
            setAlert(null);

            try {

                if (newRepo === "") {
                    throw new Error("Você precisa indicar um repositório!");
                }

                const response = await api.get(`repos/${newRepo}`);

                const data = {
                    name: response.data.full_name,
        
                }
                
                const hasRepo = repositorios.find(repo => repo.name === newRepo);

                if (hasRepo) {
                    throw new Error("Repositório já adicionado na lista!");
                }

                setRepositorios([...repositorios, data]);
                setNewRepo("");

            } catch (error) {
                setAlert(true);
                console.log(error);
            } finally {
                setLoading(false);
            }

        }

        submit();

    }, [newRepo, repositorios]);

    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo)
        setRepositorios(find);
    }, [repositorios]);


    return (
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus repositórios
            </h1>

            <Form onSubmit={handleSubmit} error={alert}>
                <input 
                    type="text" 
                    placeholder="Adicionar repositórios"
                    value={newRepo}
                    onChange={handleinputChange}/>
                
                <SubmitButton loading={loading ? 1 : 0}>
                    {
                        loading ? (
                            <FaSpinner color="#FFF" size={14}/>
                        ) : (
                            <FaPlus color="#FFF" size={14}/>
                        )
                    }
                </SubmitButton>
            </Form>

            <List>
                {
                    repositorios.map (repo => (
                        <li key={repo.name}>
                            <span>
                                <DeleteButton onClick={() => handleDelete(repo.name)}>
                                    <FaTrash size={12}/>    
                                </DeleteButton>
                                {repo.name}
                            </span>
                            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                                <FaBars size={20} />
                            </Link>
                        </li>
                    ))
                }
            </List>

        </Container>
    )
}