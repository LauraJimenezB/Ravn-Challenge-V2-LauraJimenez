import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import Person from './person';
import PeopleList from './people'
import { useState } from 'react';
import { offsetLimitPagination } from "@apollo/client/utilities";
import back from './images/back.svg'

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
          <img src={back} alt='back' onClick={()=>setPerson("")} className={person ? "shown" : "hidden"}/>
          <span>{person ? person.name : "People of Star Wars"}</span>
        </header>
        <main>
          <aside className={person ? "aside hidden" : "aside"}>
            <PeopleList setPerson={setPerson}/>
          </aside>
          <section className={person ? "section" : "hidden"}>
            <Person person={person}/>
          </section>
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;