import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddTechModal = () => {
  const [tech, setTech] = useState({
    firstName: '',
    lastName: '',
  });

  const { firstName, lastName } = tech;

  const onChange = (e) => {
    setTech({
      ...tech,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    if (firstName === '' || lastName === '') {
      M.toast({ html: 'Please enter a first and last name' });
    } else {
      console.log(tech);
      setTech({
        firstName: '',
        lastName: '',
      });
    }
  };

  return (
    <div id='add-tech-modal' className='modal'>
      <div className='modal-content'>
        <h4>Add a Technician</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={onChange}
            />
            <label htmlFor='firstName' className='active'>
              First Name
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={onChange}
            />
            <label htmlFor='lastName' className='active'>
              Last Name
            </label>
          </div>
        </div>
        <div className='modal-footer'>
          <a
            style={enterBtnStyle}
            href='#!'
            onClick={onSubmit}
            className='modal-close waves-effect waves-green btn blue'
          >
            Enter
          </a>
        </div>
      </div>
    </div>
  );
};

const enterBtnStyle = {
  margin: 'auto',
  display: 'block',
  maxWidth: '97px',
};

export default AddTechModal;
