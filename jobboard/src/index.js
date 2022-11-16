import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './Pages/Home/Home';
import SignUp from './Pages/SignUp/FormSignup';
import Profile from './Pages/Profile/Profile';
import PasswordModified from './Pages/PasswordModified/PasswordModified';
import BackOffice from './Pages/BackOffice/BackOffice';
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail';
import EditProfile from './Pages/Profile/EditProfile';
import FormLogin from './Pages/SignUp/FormLogin';
import FormForgot from './Pages/SignUp/FormForgot';
import CreatePostCheck from './Pages/CreatePost/CreatePostCheck';
import CreateComment from './Pages/CreateComment';
import EditPostCheck from './Pages/CreatePost/editPostCheck';
import UserComments from './Pages/UserComments';
import UserOffers from './Pages/UserOffers';
import OfferApplications from './Pages/offerApplications';
import 'materialize-css/dist/css/materialize.min.css';
import SingleOffer from './Pages/singleOffer';
import EditCommentCheck from './Pages/CreatePost/editCommentCheck';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

      {
        path: '/',
        element: <Home />
      },
      {
        path: '/SignUp',
        element: <SignUp />
      },
      {
        path: '/FormLogin',
        element: <FormLogin />
      },
      {
        path: '/FormForgot',
        element: <FormForgot />
      },
      {
        path: '/Profile',
        element: <Profile />
      },
      {
        path: '/resetpassword/:token',
        element: <PasswordModified />
      },
      {
        path: '/BackOffice',
        element: <BackOffice />
      },
      {
        path: '/verifyemail/:token',
        element: <VerifyEmail />

      },
      {
        path: '/CreatePost',
        element: <CreatePostCheck />
      },
      {
        path: '/editPost/:id',
        element: <EditPostCheck />
      },
      {
        path: '/editComment/:id',
        element: <EditCommentCheck />
      },
      {
        path:'/offer/:id',
        element: <SingleOffer />
      },
      {
        path: '/EditProfile/:id',
        element: <EditProfile />
      },
      {
        path: '/CreateComment/:id',
        element: <CreateComment />
      },
      {
        path: '/MyComments/:id',
        element: <UserComments />
      },
      {
        path: '/MyOffers/:id',
        element: <UserOffers />
      },
      {
        path: '/application/:id',
        element: <OfferApplications />
      }

    ]
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


