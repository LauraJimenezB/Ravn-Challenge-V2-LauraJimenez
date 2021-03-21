import './App.css';
import { useQuery, gql } from '@apollo/client';
import loadingIcon from './images/loading-icon.svg'
import arrow from './images/arrow.svg'

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

  if (loading) return (<div className="loading"><img src={loadingIcon} alt='loading-icon'/><p>Loading</p></div>);
  if (error) return (<div className="error"><p>Failed to Load Data</p></div>);

  return data.allPeople.people.map( person => (
    <div key={person.id} onClick={()=>props.setPerson(person)} className="list-item">
        <div className="list-item-text">
            <p>{person.name}</p>
            <span>{person.species ? person.species.name : "Human"} from {person.homeworld.name}</span>
        </div>
        <div className="img-container">    
            <img src={arrow} alt='arrow'/>
        </div>
    </div>
  ));
}


export default PeopleList;