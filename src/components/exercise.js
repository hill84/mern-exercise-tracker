import React from 'react';
import { Link } from 'react-router-dom';

const Exercise = props => {
  const { deleteExercise, exercise } = props;

  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0,10)}</td>
      <td>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link to={`/edit/${exercise._id}`}>edit</Link> | <a href="#" onClick={() => deleteExercise(exercise._id)}>delete</a>
      </td>
    </tr>
  );
}
 
export default Exercise;