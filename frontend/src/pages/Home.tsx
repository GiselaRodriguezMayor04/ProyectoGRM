import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import Menu from '../components/Menu';
import Dahsboard from '../components/Dashboard';

function Home() {
  const userData = useSelector((state: RootState) => state.authenticator)
  console.log(userData)
  
  return (
    <>
    <Menu/>
    <Dahsboard/>
    </>
  );
}

export default Home;