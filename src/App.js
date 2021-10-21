import './App.css';
import YoutubeForm from './components/Formik/YoutubeForm.jsx';
import FormikContainer from './components/Formik-Container/FormikContainer.js';
import LoginForm from './components/Formik-Container/LoginForm.js'
import RegistrationForm from './components/Formik-Container/RegistrationForm.js'
import EnrollmentForm from './components/Formik-Container/EnrollmentForm.js'
import { ChakraProvider } from "@chakra-ui/react"


function App() {
  return (
    <ChakraProvider>
    <div className="App">
      {/*<YoutubeForm />*/}
      {/*<FormikContainer />*/}
      <LoginForm />
      {/*<RegistrationForm />*/}
      {/*<EnrollmentForm />*/}
    </div>
    </ChakraProvider>
  );
}

export default App;
