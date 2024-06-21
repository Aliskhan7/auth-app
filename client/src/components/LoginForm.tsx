import React, { FC, useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  return (
    <div className="content">
      <div className="form form-block">
        <h2 className="form-block_title">Войти</h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />
        <button className="btn" onClick={() => store.login(email, password)}>
          Войти
        </button>
        <p className="form-block_link">
          Нет аккаунта?{" "}
          <span onClick={() => store.registration(email, password)}>
            Зарегистрироваться
          </span>
        </p>
      </div>
    </div>
  );
};

export default observer(LoginForm);
