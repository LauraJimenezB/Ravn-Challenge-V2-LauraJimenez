import './App.css';
import { useQuery, gql } from '@apollo/client';

  const allPeopleData = gql`
  query ExampleQuery {
    allPeople {
      people {
        name
        id
        species {
          name
        }
        homeworld {
          name
        }
        eyeColor
        hairColor
        skinColor
        birthYear
        vehicleConnection {
          vehicles {
            name
          }
        }
      }
    }
  }
`;

function PeopleList(props) {
  const { loading, error, data} = useQuery(allPeopleData);

  if (loading) return (<div><p>Loading</p></div>);
  if (error) return (<div><p>Failed to Load Data</p></div>);

  return data.allPeople.people.map( person => (
    <div key={person.id} onClick={()=>props.setPerson(person)}>
        <div>
            <p>{person.name}</p>
            <span>{person.species ? person.species.name : "Human"} from {person.homeworld.name}</span>
        </div>
    </div>
  ));
}


export default PeopleList;