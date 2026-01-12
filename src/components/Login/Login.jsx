import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './../../calendarService.js';
import auth from './../../utils/auth.js';

export default function Login(props) {
  const initialState = {
    email: '',
    password: '',
  };

  let navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = state;
    const user = { email, password };
    const res = await login(user);
    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      props.setIsAuthenticated(true);
      auth.login(() => navigate('/calendar'));
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <section>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="your email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="your password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
    </section>
  );
}
