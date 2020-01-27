import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const EditExercise = props => {
  const { match } = props;
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const userInput = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/exercises/${match.params.id}`).then(res => {
      setUsername(res.data.username);
      setDescription(res.data.description);
      setDuration(res.data.duration);
      setDate(new Date(res.data.date));
    }).catch(err => console.log(err));

    axios.get('http://localhost:5000/users/').then(res => {
      if (res.data.length > 0) {
        setUsers(res.data.map(user => user.username));
      }
    }).catch(err => console.log(err));
  }, [match.params.id]);

  const onChangeUsername = e => setUsername(e.target.value);
  const onChangeDescription = e => setDescription(e.target.value);
  const onChangeDuration = e => setDuration(e.target.value);
  const onChangeDate = date => setDate(date);

  const onSubmit = e => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date
    };

    console.log(exercise);

    axios.post(`http://localhost:5000/exercises/update/${match.params.id}`, exercise).then(res => {
      console.log(res.data)
    }).catch(err => console.log(err));

    window.location = '/';
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>

        <div className="form-group">
          <label>Username: </label>
          <select ref={userInput}
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map(user => <option key={user} value={user}>{user}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>

        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker 
              selected={date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>

      </form>
    </div>
  );
};
 
export default EditExercise;