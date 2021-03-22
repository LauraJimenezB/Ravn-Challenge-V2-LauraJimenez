import './App.css';
import { useQuery, gql } from '@apollo/client';
import loadingIcon from './images/loading-icon.svg'
import arrow from './images/arrow.svg'
import {Waypoint} from 'react-waypoint';
import {useState, useEffect} from 'react'


  const allPeopleData = gql`
  query repoQuery ($after: String){
    allPeople (first:5, after: $after){
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

function PeopleList(props) {
  const [people, setPeople] = useState([]);
  const { loading,  error, data, fetchMore} = useQuery(allPeopleData, {
        variables: {after: null},
        notifyOnNetworkStatusChange: true  
  });

  useEffect(()=>{
      if(data && data.allPeople && data.allPeople.people) {
          setPeople(data.allPeople.people)
      }
  }, [data])

  const peopleList = people.map( (person, i, peopleArray) => (
    <div key={person.id}>
        {/* fetchMore (fetch 5 more people) after scrolling */}
        {i===(peopleArray.length-1) && <Waypoint onEnter={
            ()=>{
                const {endCursor} = data.allPeople.pageInfo;
                if(data.allPeople.pageInfo.hasNextPage){
                fetchMore({
                    variables:{after:endCursor},
                    updateQuery:(prevResult, {fetchMoreResult})=>{
                    fetchMoreResult.allPeople.people=[
                        ...prevResult.allPeople.people,
                        ...fetchMoreResult.allPeople.people
                    ];
                    return fetchMoreResult;
                    }
                })  
                } 
            }
        }/>} 
        <div onClick={()=>props.setPerson(person)} className="list-item">
            <div className="list-item-text">
                <p>{person.name}</p>
                <span>{person.species ? person.species.name : "Human"} from {person.homeworld.name}</span>
            </div>
            <div className="img-container">    
                <img src={arrow} alt='arrow'/>
            </div>
        </div>
    </div>
  ))


  return (
  <div>
    {peopleList}
    {loading && (<div className="loading"><img src={loadingIcon} alt='loading-icon'/><p>Loading</p></div>)}
    {error && (<div className="error"><p>Failed to Load Data</p></div>)}
  </div>)
}

export default PeopleList;