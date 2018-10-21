import List from 'components/List';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { colorsDark } from 'styles/palette';

import { Title, Wrapper } from './styles';

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={colorsDark}>
        <div>
          <Wrapper>
            <Title>My Reader</Title>
            <List />
          </Wrapper>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
