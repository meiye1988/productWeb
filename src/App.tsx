

import * as React from 'react';
import { Router, Route,Switch,Redirect} from 'react-router-dom';
import history from './history';
import Header from './components/header';
import Footer from './components/footer';
import Routers from './Router'
import PubSub from 'pubsub-js'
import './css/reset.css';
import './css/common.css';
import {Provider} from "mobx-react"
import  {stores}  from "./store";
class App extends React.Component<{},{}>{
	public is_indexPage:boolean;
	public is_showHeader:boolean;
	getSearchWord(name:any){
		PubSub.publish('PubSub_searchWord',name);  
	}
	componentWillMount(){
		let pathname = history.location.pathname;
		if(pathname!="/" && pathname.indexOf('/home') <= -1){
			this.is_indexPage = false;
		}else{
			this.is_indexPage = true;
		}
		if(pathname.indexOf('/login') > -1){
			this.is_showHeader = false;
		}else{
			this.is_showHeader = true;
		}
		console.log(this.is_showHeader);
		history.listen((route:any)=>{
			console.log('route.pathname',route.pathname);
			if(route.pathname!="/" && route.pathname.indexOf('/home') <= -1){
				this.is_indexPage = false;
			}else{
				this.is_indexPage = true;
			}
			if(route.pathname.indexOf('/login') > -1){
				this.is_showHeader = false;
			}else{
				this.is_showHeader = true;
			}
			this.setState({
				is_indexPage :this.is_indexPage,
				is_showHeader :this.is_showHeader,
			});
		}); 
		
	}
 render() {
	 let accountStore = stores.accountStore;
	 console.log(accountStore.isLogin());
	 let islogin = accountStore.isLogin();
    return (
		<Provider {...stores}>
			<div>
			
			<Router history={history}>
				<Header handleSearchWordValue={this.getSearchWord} isIndexPage={this.is_indexPage} isShowHeader={this.is_showHeader}  />
				<Switch>
					{
						Routers.map((item:any,index:number)=>{
							return <Route key={index} path={item.path} exact={item.exact || false} 
							render={()=>(!item.auth?(<item.component />):(islogin?(<item.component />):<Redirect to={{
								                   pathname: '/login',
								                   
								                 }} />))}
							
							/>
						})
					}
				{/* <Route path="/" exact={true} component={Home} />{}
				<Route path="/home"  component={Home} />
				<Route path="/login"  component={Login} />
				<Route path="/cart"  component={Cart} />
				<Route path="/search/:name" component={Search} />
				<Route path="/productDetail/:id" component={ProductDetail} /> */}
				</Switch>
				<Footer  />
			</Router>
			
		</div>
	</Provider>
    );
  }
}

export default App;
