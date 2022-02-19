import React, {useState, useEffect} from "react"
import { Content, Loading, Container, Owner, FilterList, BackButton, IssuesList, PageActions } from "../Repositorio/styles"
import { FaArrowLeft } from "react-icons/fa";
import  api from "../../services/api"


export default function Repositorio ({match}) {

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState([
        {state: "all", label: "Todas", active: true},
        {state: "open", label: "Abertas", active: false},
        {state: "closed", label: "Fechadas", active: false}
    ]);
    const [filterIndex, setFilterIndex] = useState(0);

    useEffect(() => {

        async function loadRepository () {
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            //Realiza as duas requisições ao mesmo tempo e já armazena nas duas variavies
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: filters[filterIndex].state,
                        per_page: 5
                    }
                })
            ]);

            setRepositorio(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        loadRepository();

    }, [match.params.repositorio, filters, filterIndex]);


    useEffect(() => {

        async function loadIssue () {

            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: filters[filterIndex].state,
                    page: page,
                    per_page: 5
                }
            })

            setIssues(response.data);
            console.log(filterIndex);

        }

        loadIssue();

    }, [match.params.repositorio, page, filters, filterIndex]);

    function handlePage (action) {
        setPage(action === "back" ? page - 1 : page + 1);
    }

    function handleFilter (index) {
        setFilterIndex(index);
    }

    if (loading) {
        return ( 
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        );
    }

    return (
        <Content>
            <Container>

                <BackButton to="/">
                    <FaArrowLeft color="#404040" size={25} />
                </BackButton>

                <Owner>
                    <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
                    <h1>{repositorio.name}</h1>
                    <p>{repositorio.description}</p>
                </Owner>
                
                <FilterList active={filterIndex}>
                    {filters.map((filter, index) => (
                        <button 
                            type="button" 
                            key={filter.label}
                            onClick={() => handleFilter(index)}
                            >
                                {filter.label}
                            </button>
                    ))}
                </FilterList>

                <IssuesList>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />

                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                            </div>

                        </li>
                    ))}
                </IssuesList>

                <PageActions>
                    <button 
                        type="button" 
                        onClick={() => handlePage("back")}
                        disabled={page < 2}
                        >
                        Voltar
                    </button>
                    <button type="button" onClick={() => handlePage("next")}>
                        Próxima
                    </button>
                </PageActions>

            </Container>
        </Content>
    )
}