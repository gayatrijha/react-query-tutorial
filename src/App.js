import {QueryClientProvider, QueryClient} from "react-query";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {ReactQueryDevtools} from 'react-query/devtools'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { PaginatedQueriesPage } from "./components/PaginatedQueries.page";
import { RQSuperHeroPage } from "./components/RQSuperHero.page";
import { InfiniteQueriesPage } from "./components/InfiniteQueries.page";
// import { ParallelQueriesPage } from "./components/ParallelQueries.page";
// import { DynamicParallePage } from "./components/DynamicParallel.page";
// import { DependentQueriesPage } from "./components/DependentQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
       <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Switch>

          <Route path='/rq-infinite'>
            <InfiniteQueriesPage/>
          </Route>

          {/* <Route path='/rq-dependent'>
            <DependentQueriesPage email='jha.gayatri01@gmail.com'/>
          </Route>

          <Route path='/rq-dynamic-parallel'>
            <DynamicParallePage heroId={[1,3]}/>
          </Route> */}
          {/* 
          <Route path='/rq-parallel'>
            <ParallelQueriesPage/>
          </Route> */}

          {/* details page */}
          <Route path='/rq-super-heroes/:heroId'> 
              <RQSuperHeroPage/>
          </Route>

          <Route path='/rq-paginated'>
            <PaginatedQueriesPage/>
          </Route>
          <Route path='/super-heroes'>
            <SuperHeroesPage />
          </Route>
          <Route path='/rq-super-heroes'>
            <RQSuperHeroesPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
   
  )
}

export default App
