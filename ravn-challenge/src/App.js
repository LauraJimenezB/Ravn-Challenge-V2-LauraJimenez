import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import Person from './person';
import PeopleList from './people'
import { useState } from 'react';
import { offsetLimitPagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: offsetLimitPagination()
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: cache
  });


function App() {
  const [person, setPerson] = useState("");

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header>
          <p>Ravn Star Wars Registry</p>
        </header>
        <main>
          <aside>
            <PeopleList setPerson={setPerson}/>
          </aside>
          <section>
            <Person person={person}/>
          </section>
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;