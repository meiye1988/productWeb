

import * as React from 'react';
import { Router, Route,Switch} from 'react-router-dom';
import history from './history';
// import App from './App';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Search from './pages/search';
import ProductDetail from './pages/productDetail';
import PubSub from 'pubsub-js'
// import {observer} from "mobx-react"
// import {observable} from "mobx"
import './css/reset.css';
import './css/common.css';
class App extends React.Component<{},{}>{
	public is_indexPage:boolean;
	getSearchWord(name:any){
		PubSub.publish('PubSub_searchWord',name);  
	}
	componentWillMount(){
		if(history.location.pathname!="/" && history.location.pathname.indexOf('/home') <= -1){
			this.is_indexPage = false;
		}else{
			this.is_indexPage = true;
		}
		history.listen((route:any)=>{
			console.log('route.pathname',route.pathname);
			if(route.pathname!="/" && route.pathname.indexOf('/home') <= -1){
				this.is_indexPage = false;
			}else{
				this.is_indexPage = true;
			}
			this.setState({
				is_indexPage :this.is_indexPage
			});
		}); 
	}
 render() {
	 console.log(this.is_indexPage);
    return (
		<div>
		
		<Router history={history}>
			<Header handleSearchWordValue={this.getSearchWord} isIndexPage={this.is_indexPage}  />
			<Switch>
			<Route path="/" exact={true} component={Home} />{/* 为了避免home组件一直渲染，我们可以添加属性exact */}
			<Route path="/home"  component={Home} />
			<Route path="/search/:name" component={Search} />
			<Route path="/productDetail/:id" component={ProductDetail} />
			</Switch>
			<Footer  />
		</Router>
		
	</div>
    );
  }
}

export default App;
