import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Router, Route,Switch} from 'react-router-dom';
// import history from './history';
// import Header from './components/header';
// import Footer from './components/footer';
// import Home from './pages/home';
// import Search from './pages/search';
import App from './App';
import './css/reset.css';
import './css/common.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	(
		<App />
		// <div>
		
		// 	<Router history={history}>
		// 		<Header getSearchWord={this.handleSearchWordValue} />
		// 		<Switch>
		// 		<Route path="/" exact={true} component={Home} />{/* 为了避免home组件一直渲染，我们可以添加属性exact */}
		// 		<Route path="/home"  component={Home} />
		// 		<Route path="/search/:name"  component={Search} />
		// 		</Switch>
		// 		<Footer  />
		// 	</Router>
			
		// </div>
	),
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
