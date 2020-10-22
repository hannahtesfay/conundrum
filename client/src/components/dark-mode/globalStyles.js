import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  .content {
    background-colour: ${({ theme }) => theme.cardBackground} !important;
  }

  .massive {
    background-color: ${({ theme }) => theme.menuBackground};
  }

  .card-container, .form-container {
    background-color: ${({ theme }) => theme.cardBackground};
  }

  .item {
    color: ${({ theme }) => theme.menuText};
  }

  .ui.card {
    background-color: ${({ theme }) => theme.postBackground};
    color: ${({ theme }) => theme.text};
  }

  .ui.card>.content>.header, .ui.cards>.card>.content>.header, 
  .ui.card>.content>.description, .ui.cards>.card>.content>.description, 
  .ui.form .field>label {
    color: ${({ theme }) => theme.text};
  }

  .ui.card .meta, .ui.cards>.card .meta {
    color: ${({ theme }) => theme.descriptionText};
  }

  .ui.basic.teal.label, .ui.basic.blue.label {
    background-color: ${({ theme }) => theme.postBackground};
  }
  `