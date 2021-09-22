import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Axios from 'axios';

function App() {

  const [name,setName] = useState('');
  const [age,setAge] = useState(0);
  const [position,setPosition] = useState('');
  const [country,setCountry] = useState('');
  const [wage,setWage] = useState(0);
  const [employeesList,setEmployeesList] = useState([]);
  const [message,setMessage] = useState('');

  const showemployees = () => {
    Axios.get('http://home420.trueddns.com:57523/employees').then((response)=>{
      setEmployeesList(response.data);
      setMessage(response.data.message);
    })
  }

  const addemployees = () => {
    Axios.post('http://home420.trueddns.com:57523/addemployee',{
      name:name,
      age:age,
      position:position,
      country:country,
      wage:wage,
    }).then(()=>{
      setEmployeesList([
        ...employeesList,{
          name:name,
          age:age,
          position:position,
          country:country,
          wage:wage,
        },
      ])
    })
  }
  
  const deletemployee = (id) => {
    Axios.delete(`http://home420.trueddns.com:57523/deleteemployee/${id}`).then(()=>{
      setEmployeesList(
        employeesList.filter((val)=>{
          return val.id !== id
        })
      )
    })
  }

 setInterval(() => {
    showemployees()
  }, 3000)
  

  return (
    <div className="App container">
    
      <h1>Employeesystem</h1>

      <form action="">
        
        <div className="mb3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" id="name" className="form-control" placeholder="INPUT NAME" required onChange={(event)=>{
          setName(event.target.value)
        }}></input>
        </div>

        <div className="mb3">
        <label htmlFor="age" className="form-label">Age:</label>
        <input type="number" id="age" className="form-control" placeholder="INPUT AGE" required onChange={(event =>{
          setAge(event.target.value)
        })}></input>
        </div>

        <div className="mb3">
        <label htmlFor="position" className="form-label">Positon:</label>
        <input type="text" id="posion" className="form-control" placeholder="INPUT POSITION" required onChange={(event) => 
        setPosition(event.target.value)
        }></input>
        </div>

        <div className="mb3">
        <label htmlFor="country" className="form-label">Country:</label>
        <input type="text" id="country" className="form-control" placeholder="INPUT COUNTRY" required onChange={(event)=>{
          setCountry(event.target.value)
        }}></input>
        </div>

        <div className="mb3">
        <label htmlFor="wage" className="form-label">Wage:</label>
        <input type="number" id="wage" className="form-control" placeholder="INPUT WAGE" required onChange={(event)=> {
          setWage(event.target.value)
        }}></input>
        </div>
        <br></br>
        <button className="btn btn-success" onClick={addemployees}>ADD EMPLOYEE</button>

      </form>
        <br></br>
      <button className="btn btn-primary" onClick={showemployees}>SHOW EMPLOYEES</button>
      <br></br>
      <br></br>
      
      
      <h3>{message}</h3>
        {employeesList.map((val,key)=> {
          if(val.status === 0){
            return(
              <div className="container">
                <h3>{message}</h3>
              </div>
            )
          }else{
            return(
              <div className="container">
                  <div className="card" style={{width:"18rem"}}>
                    <div className="card-body">
                      <p className="card-text">Name: {val.emp_name}</p>
                      <p className="card-text">Age: {val.emp_age}</p>
                      <p className="card-text">Position: {val.emp_position}</p>
                      <p className="card-text">Country: {val.emp_country}</p>
                      <p className="card-text">Wage: {val.emp_wage}</p>
                      <button className="btn btn-danger" onClick={deletemployee(val.emp_id)}>DELETE</button>

                    </div>
                  </div>
                  <br></br>
                      <br></br>
              </div>
            )
          }
          })
        
        }
    </div>
  );
}

export default App;
