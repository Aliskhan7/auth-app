import React, { useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";
function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      console.log(response.data);
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <h1>{store.isAuth ? "Пользователь авторизован" : "Авторизуйтесь"}</h1>
      <h2>
        {store.user.isActivated ? "Аккаунт подтвержден" : "Активируйте аккаунт"}
      </h2>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
        {users.map((user) => {
          return <div key={user.email}>{user.email}</div>;
        })}
      </div>
    </div>
  );
}

export default observer(App);
