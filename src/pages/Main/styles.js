import styled, {keyframes, css} from "styled-components"

export const Container = styled.div`
    background: #d4d4d4;
    padding: 20px 15px;
    max-width: 700px;
    margin: 80px auto;
    border-radius: 5px;

    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
            margin-right: 10px;
        }
    }
`;


export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid ${props => (props.error ? "#FF0000" : "#DDD")};
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 17px;
    }
`;

//Criando animação do botão

const animate = keyframes`
    from {
        tranform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs(props => ({
    type: "submit",
    disabled: props.loading
}))`
    cursor: pointer;
    display: flex;
    background: #0D2636;
    border: 0;
    border-radius: 5px;
    margin-left: 10px;
    padding: 0 15px;
    justify-content: center;
    align-items: center;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${props => props.loading && 
    css`
        svg {
            animation: ${animate} 2s linear infinite;
        }
    `}
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;
    padding: 5px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        & + li {
            border-top: 1px solid #bbb;
        }

        a {
            color: #0D2636;
            text-decoration: none;
        }
    }`;

export const DeleteButton = styled.button.attrs({
    type: "button"
})`
    margin-right: 5px;
    background: transparent;
    color: #0D2636;
    border: 0px;
    padding: 8px;
`;