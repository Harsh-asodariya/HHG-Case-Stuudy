import EmployeeTable from './Containers/Table/table';
import Counter from './Containers/Counter/counter';
import NavigationItems from './Components/Navigation/navigation';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  let routes = (
    <Switch>
      <Route path='/counter' exact render={() => <Counter />} />
      <Route path='/employees' exact render={() => <EmployeeTable />} />
      <Route path='/hhgcasestudy' exact render={() => <></>} />
      <Redirect to='/hhgcasestudy' />
    </Switch>
  )

  return (
    <div>
      <NavigationItems />
      {routes}
    </div>
  );
}

export default App;
