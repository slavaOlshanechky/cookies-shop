import React, { useEffect, useState } from 'react';
import validator from '../../../utils/validator';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getLoginStatus, login } from '../../../store/auth';
import Button from '../../common/button';
import TextField from '../../common/form/textField';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Please enter email',
      },
      isEmail: {
        message: 'Please enter a correct email',
      },
    },
    password: {
      isRequired: {
        message: 'Please enter password',
      },
    },
  };

  const validate = () => {
    const errors = validator(formData, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [formData]);

  useEffect(() => {
    setErrors({});
  }, []);

  const handleChange = ({ name, value }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    const redirect = history.location.state ? history.location.state.from.pathname : '/';
    dispatch(login(formData, redirect));
  };

  const isLogin = useSelector(getLoginStatus());

  if (isLogin) return <Redirect to="/" />;

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <TextField
          name="email"
          value={formData.email}
          type="email"
          onChange={handleChange}
          label="Email"
          error={errors.email}
        />
        <TextField
          name="password"
          value={formData.password}
          type="password"
          onChange={handleChange}
          label="Password"
          error={errors.password}
        />

        <Button size="lg" content="Login" disabled={!isValid} type="submit" />
      </form>
    </>
  );
};
export default LoginForm;
