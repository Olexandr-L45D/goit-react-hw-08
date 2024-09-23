
import css from './App.module.css';
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Navigation = lazy(() => import("../Navigation/Navigation"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() => import("../../pages/RegistrationPage/RegistrationPage"));
const MaviesPage = lazy(() => import("../../pages/MaviesPage/MaviesPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

import React, { useEffect } from "react";
import WrapperGeneral from "../WrapperGeneral/WrapperGeneral";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import LoginList from "../LoginList/LoginList"
import { fetchContact } from '../../redux/contacts/operations';
import { useDispatch, useSelector } from 'react-redux';
import { RestrictedRoute } from '../../components/RestrictedRoute';
import { PrivateRoute } from '../../components/PrivateRoute';
import Loader from "../Loader/Loader";
import Error from "../Error/Error";


export default function App() {
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <WrapperGeneral>
      <Suspense fallback={<div>LOADING list of movies...</div>}>
        <Navigation />
      </Suspense>
      <h1 className={css.title}>My phone contacts</h1>
      <Suspense fallback={<div>LOADING Ditails...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/register' element={<RestrictedRoute redirectTo='/contacts' component={<RegistrationPage />} />} />
          <Route path='/login' element={<RestrictedRoute redirectTo='/contacts' component={<LoginPage />} />} />
          <Route path='/contacts' element={<PrivateRoute redirectTo='/login' component={<MaviesPage />} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <LoginList />
      <ContactForm />
      {loading && <Loader>Loading message</Loader>}
      {error && <Error>Error message</Error>}
      <SearchBox />
      <ContactList />

    </WrapperGeneral>
  )
};


// {/* <Route path='/movies/:movieId' element={<MovieDetailsPage />} >
//   <Route path="cast" element={<MovieCast />} />
//   <Route path="reviews" element={<MovieReviews />} />

// {/* <Route path='/movies' element={<MaviesPage />} /> */}
// </Route> */}
// {/* <Route path="*" element={<NotFoundPage />} /> */}
// return (
//   <main className={css.container}>
//     <h1>HTTP requests with Redux</h1>
//     <TaskForm />
//     {loading && <Loader>Loading message</Loader>}
//  {/* {loading && !error && <b>Request in progress...</b>} */}
//     {error && <Error>Error message</Error>}
//     <TaskList />
//   </main>
// );



















// const items = useSelector((state) => state.locale.items); // приклад до спрощення
// const items = useSelector(selectContacts); // повертає шматок стану зі слайсу (selectContact = функція стану)
// const name = useSelector(selecFilter); // повертає шматок стану зі слайсу


// const [filter, setFilter] = useState('');
// const [tasks, setTasks] = useState(() => {
//   const savClicks = window.localStorage.getItem("my-clicks");
//   return savClicks !== null ? JSON.parse(savClicks) : objects
// });

// useEffect(() => {
//   const isLocalStorData = Boolean(localStorage.getItem("my-clicks"));
//   if (isLocalStorData) {
//     const data = localStorage.getItem("my-clicks");
//     setTasks(JSON.parse(data));
//   }
// }, []);

// useEffect(() => {
//   window.localStorage.setItem("my-clicks", JSON.stringify(tasks));
// }, [tasks]);

// const addTask = (newTask) => {
//   setTasks((prevTasks) => {
//     return [...prevTasks, newTask];
//   });
// };
// const deleteTask = (taskId) => {
//   setTasks((prevTasks) => {
//     return prevTasks.filter((task) => task.id !== taskId);
//   });
// };
// const visibleTasks = tasks.filter((task) =>
//   task.name.toLowerCase().includes(filter.toLowerCase()));
//  <h1 className={css.title}>Phonebook</h1>
//       <Suspense fallback={<div>LOADING list of movies...</div>}>
//         <Routes>
//           <Route path="/" element={<ContactForm />} />
//           <Route path="*" element={<NotFoundCard />} />
//         </Routes>
//       </Suspense>
// {/* <ContactForm onAdd={addTask} />
//         <SearchBox value={filter} onFilter={setFilter} />
//         <ContactList tasks={tasks} objects={objects} onDelete={deleteTask} /> */}


