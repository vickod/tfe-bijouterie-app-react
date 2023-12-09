import React from 'react';
import ReactDOM from 'react-dom/client';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './screens/Home';
import DetailArticle from './screens/DetailArticle';
import Panier from './screens/Panier';
import LoginTest from './screens/LoginTest';
import Register from './screens/Register';
import  store from './store';
import { Provider } from 'react-redux';
import HomeTest from './screens/HomeTest'
import Verification from './screens/Verification';
import PrivateRoute from './components/PrivateRoute';
import Payement from './screens/Payement';
import Commande from './screens/Commande';
import DetailsCommande from './screens/DetailsCommande';
import Profile from './screens/Profile';
import AdminRoute from './components/AdminRoute'
import CommandesList from './screens/admin/CommandesList';
import MesCommandes from './screens/membre/MesCommandes';
import ArticlesList from './screens/admin/ArticlesList';
import EditArticle from './screens/admin/EditArticle';
import UtilisateursList from './screens/admin/UtilisateursList';
import EditUtilisateur from './screens/admin/EditUtilisateur';
import LivreurRoute from './components/LivreurRoute'
import Alivrer from './screens/livreur/Alivrer';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route index={true} path='/' element={<Home />} /> 
        <Route path='/articles/:id' element={<DetailArticle />} /> 
        <Route path='/panier' element={<Panier />} />
        <Route path='/login' element={<LoginTest />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/forgot/:token' element={<ResetPassword />} />

        {/* PRIVATE ROUTE */}
        <Route path='' element={<PrivateRoute/>}>
          <Route path='/verification' element={<Verification />} />
          <Route path='/payement' element={<Payement />} />
          <Route path='/commande' element={<Commande />} />
          <Route path='/commandes/:id' element={<DetailsCommande />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/mes_commandes' element={<MesCommandes />} />
        </Route>

        {/* ADMIN ROUTE */}
        <Route path='' element={<AdminRoute/>}>
          <Route path='/admin/commandes_list' element={<CommandesList />} />
          <Route path='/admin/articles_list' element={<ArticlesList />} />
          <Route path='/admin/articles/:id/edit' element={<EditArticle />} />
          <Route path='/admin/utilisateurs_list' element={<UtilisateursList />} />
          <Route path='/admin/utilisateurs/:id/edit' element={<EditUtilisateur />} />
        </Route>

        {/* LIVREUR ROUTE */}
        <Route path='' element={<LivreurRoute/>}>
          <Route path='/livreur/commandes_list' element={<Alivrer />} />
        </Route>
        {/* <Route path='/test' element={<HomeTest />} /> */}
    </Route>
)
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />  
    </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
