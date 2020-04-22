import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLog } from '../../actions/logActions';

const EditLogModal = ({ current, updateLog }) => {
  const [log, setLog] = useState({
    message: '',
    tech: '',
    attention: false,
  });
  console.log(log);
  useEffect(() => {
    if (current) setLog(current);
  }, [current]);

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
      updateLog(log);
      setLog({
        message: '',
        tech: '',
        attention: false,
      });
    }
  };

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
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
                Select Technician
              </option>
              <option value='John Doe'> John Doe </option>
              <option value='Sam Smith'> Sam Smith </option>
              <option value='Baruch Berg'> Baruch Berg </option>
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

const enterBtnStyle = {
  margin: 'auto',
  display: 'block',
  maxWidth: '97px',
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

EditLogModal.propTypes = {
  updateLog: PropTypes.func.isRequired,
  current: PropTypes.object,
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
