// import * as React from 'react';
// import './App.css';

// import logo from './logo.svg';

// class App extends React.Component {
	
//  render() {
// 	console.log('App');
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.tsx</code> and save to reload.
//         </p>
// 		{this.props.children}
//       </div>
//     );
//   }
// }

import * as React from 'react';
// import { HashRouter as Router, Route,Switch,Redirect} from 'react-router-dom';
import { Router, Route,Switch} from 'react-router-dom';
import history from './history';
// import App from './App';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Search from './pages/search';
import PubSub from 'pubsub-js'
import './css/reset.css';
import './css/common.css';
class App extends React.Component<{},{}>{
	getSearchWord(name:any){
		PubSub.publish('PubSub_searchWord',name);  
	}
 render() {
    return (
		<div>
		
		<Router history={history}>
			<Header handleSearchWordValue={this.getSearchWord} />
			<Switch>
			<Route path="/" exact={true} component={Home} />{/* 为了避免home组件一直渲染，我们可以添加属性exact */}
			<Route path="/home"  component={Home} />
			<Route path="/search/:name" component={Search} />
			</Switch>
			<Footer  />
		</Router>
		
	</div>
    );
  }
}

export default App;
