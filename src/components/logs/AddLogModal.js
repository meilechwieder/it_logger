import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions';
import TechSelectOptions from '../techs/TechSelectOptions';

const AddLogModal = ({ addLog }) => {
  const [log, setLog] = useState({
    message: '',
    tech: '',
    attention: false,
  });

  const { message, tech, attention } = log;

  const onChange = (e) => {
    if (e.target.name === 'attention') {
      setLog({
        ...log,
        attention: !attention,
      });
      return;
    }
    setLog({
      ...log,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      log.date = new Date();
      console.log(log);
      addLog(log);
      M.toast({ html: 'Log added' });

      setLog({
        message: '',
        tech: '',
        attention: false,
      });
    }
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={onChange}
            />
            <label htmlFor='message' className='active'>
              Log Message
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <select name='tech' onChange={onChange} value={tech}>
              <option value='' disabled>
                {' '}
                Select Technician{' '}
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={onChange}
                  name='attention'
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
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
  );
};

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
};

const enterBtnStyle = {
  margin: 'auto',
  display: 'block',
  maxWidth: '97px',
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

export default connect(null, { addLog })(AddLogModal);
