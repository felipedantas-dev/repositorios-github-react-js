import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    height: 100vh;
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    background: #d4d4d4;
    padding: 20px 30px;
    max-width: 700px;
    min-width: 300px;
    margin: 80px 20px;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

export const BackButton = styled(Link)`
    text-decoration: none;
    border: 0;
    outline: 0;
    background: transparent;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        max-width: 100px;
        margin: 20px 0;
        border-radius: 20%;
    }

    h1 {
        font-size: 30px;
        text-transform: capitalize;
    }

    p {
        margin: 10px 0px;
        font-size: 16px;
        text-align: center;
        line-height: 1.4;
    }
`;

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        align-items: center;
    }

    img {
        max-height: 35px;
        max-width: 35px;
        border-radius: 50%;
        border: 2px solid #eee;
    }

    div {
        flex: 1;
        margin-left: 15px;
    }

    strong {
        font-size: 15px;
        font-weight: normal;

        a {
            display: block;
            text-decoration: none;
            color: #222;
            transition: .2s ease all;
            font-weight: bold;

            &:hover {
                color: #0071db;
            }
        }
    }

    span {
        background: #303030;
        color: #FFF;
        padding: 2px 4px;
        border-radius: 5px;
        font-size: 11px;
        font-weight: 500;
        margin-right: 5px;
    }
`;

export const PageActions = styled.div`
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        outline: 0;
        border: 0;
        background: #348a5c;
        color: #FFF;
        border-radius: 5px;
        padding: 10px 20px;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;

export const FilterList = styled.div`
    margin: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        outline: 0;
        border: 0;
        padding: 8px;
        border-radius: 5px;
        margin: 0 3px;
        opacity: 0.7;

        &:nth-child(${props => props.active + 1}) {
            opacity: 1;
        }

        &:hover {
            opacity: 1;
        }
    }
`;
