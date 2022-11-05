import React, {useEffect, useState} from "react";
import styles from './Register.module.scss';
import {AiOutlineArrowUp, AiOutlineMail} from "react-icons/ai";
import {RiLockPasswordLine} from "react-icons/ri";
import useFormValidation from "../../hooks/useFormValidation";
import {FaTelegramPlane} from "react-icons/fa";
import {registerUser} from "../../utils/auth";
import {BiLoaderAlt} from "react-icons/bi";

const Regiser = () => {
  const [isValidInputs, setIsValidInputs] = useState({
    email: false,
    password: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {values, errors, handleChange} = useFormValidation();

  const setValidEmail = () => {
    setIsValidInputs({...isValidInputs, email: true})
  }

  const setValidPassword = () => {
    setIsValidInputs({...isValidInputs, password: true})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    registerUser(values.email, values.password)
      .then(res => {
        if(res.data){
          setIsSuccess(true);
        }
      })
      .catch(e => {
        console.log(e);
        setIsSuccess(false);
      })
      .finally(() => setIsLoading(false));
  }



  return (
    <div className={styles.register}>
      <div className={styles.top}>
        <h2>Sign Up</h2>
        <p>Fill information</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`${styles.form} form`}
        noValidate
      >
        <div className={`${styles.input} ${styles.email} ${isValidInputs.email ? `${styles.email_filled}` : ``}`}>
          <label>
            <input
              value={values.email || ''}
              onChange={handleChange}
              type="email"
              name='email'
              required
              placeholder='Enter email'
              className={`input`}
            />
            <span>{errors.email}</span>
          </label>
          <div className={styles.button}>
            <AiOutlineMail className={(errors.email === undefined || errors.email) ? `${styles.button_down}` : `${styles.button_down} ${styles.button_down_filled}`}/>
            <button
              onClick={setValidEmail}
              type='button'
              className={(errors.email === undefined || errors.email) ? `${styles.button_up}` : `${styles.button_up} ${styles.button_up_filled}`}>
              <AiOutlineArrowUp/>
            </button>
          </div>
        </div>
        <div className={`${styles.input} ${styles.password} ${isValidInputs.email ? `${styles.password_filled}` : ''} ${(isValidInputs.password && !isLoading) ? `${styles.password_active}` : ''}`}>
          <label>
            <input
              value={values.password || ''}
              onChange={handleChange}
              type="password"
              name='password'
              required
              minLength='3'
              placeholder='Enter password'/>
            <span>{errors.password}</span>
          </label>
          <div className={styles.button}>
            <RiLockPasswordLine className={(errors.password === undefined || errors.password) ? `${styles.button_down}` : `${styles.button_down} ${styles.button_down_filled}`}/>
            <button
              onClick={setValidPassword}
              type='submit'
              className={(errors.password === undefined || errors.password) ? `${styles.button_up}` : `${styles.button_up} ${styles.button_up_filled}`}>
              { isLoading ? <BiLoaderAlt className={styles.loader}/> : <FaTelegramPlane/>}
            </button>
          </div>
        </div>
        {isSuccess && <div className={`${styles.success} ${styles.success_active}`}>
          <p>ACCOUNT CREATED</p>
        </div>}
      </form>
    </div>
  );
};

export default Regiser;