import './App.css';

function Person(props) {
  const person = props.person;

  function firstLetterUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
  <div key={person.id} className="person">
    {person ? (
      <div>
        <h2>General Information</h2>
        <div className='person-items'>
          <p>Eye Color</p>
          <span>{firstLetterUpperCase(person.eyeColor)}</span>
        </div>
        <div className='person-items'>
          <p>Hair Color</p>
          <span>{firstLetterUpperCase(person.hairColor)}</span>
        </div>
        <div className='person-items'>
          <p>Skin Color</p>
          <span>{firstLetterUpperCase(person.skinColor)}</span>
        </div>
        <div className='person-items'>
          <p>Birth Year</p>
          <span>{person.birthYear}</span>
        </div>
        <h2>Vehicles</h2>
        <div>
          {person.vehicleConnection ? person.vehicleConnection.vehicles.map((vehicle)=>(
          <div key={vehicle.name} className='person-items'>
            <p>{vehicle.name}</p>
          </div>
        )): ""}
        </div>
      </div>
    ) : ""}    
  </div>
  );
}

export default Person;