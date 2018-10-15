import { injectGlobal } from 'styled-components';
import { colorsDark } from './palette';

const setGlobalStyles = () =>
  injectGlobal`
    * {
      box-sizing: border-box;
    }

    html, body {
      font-family: Lato,Helvetica-Neue,Helvetica,Arial,sans-serif;
      width: 100vh;
      overflow-x: hidden;
      margin: 0;
      padding: 0;
      background-color: ${colorsDark.background};
    }

    ul {
      list-style: none;
      padding: 0;
    }

    a {
      text-decoration: none;

      &:visited {
        color: inherit;
      }
    }
  `;

export default setGlobalStyles
