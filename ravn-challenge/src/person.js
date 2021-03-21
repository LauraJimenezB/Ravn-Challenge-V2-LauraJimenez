import './App.css';

function Person(props) {
  const person = props.person;


  return (
  <div key={person.id}>
    {person ? (
      <div>
        <h2>General Information</h2>
        <div>
          <p>Eye Color</p>
          <span>{person.eyeColor}</span>
        </div>
        <div>
          <p>Hair Color</p>
          <span>{person.hairColor}</span>
        </div>
        <div>
          <p>Skin Color</p>
          <span>{person.skinColor}</span>
        </div>
        <div>
          <p>Birth Year</p>
          <span>{person.birthYear}</span>
        </div>
        <h2>Vehicles</h2>
        <div>
          {person.vehicleConnection ? person.vehicleConnection.vehicles.map((vehicle)=>(
          <div key={vehicle.name}>
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