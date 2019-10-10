
import * as React from 'react';
import { HashRouter as Router, Route,Switch} from 'react-router-dom';
 
import Home from './pages/home';
import Search from './pages/search';
 
class MyRouter extends React.Component<{},{}> {
	render () {
	  return (
		<Router>
			<Switch>
			{/* 为了避免home组件一直渲染，我们可以添加属性exact */}
			  <Route path="/" exact component={Home} />
			  <Route path="/home"  component={Home} />
			  <Route path="/search" component={Search} />
			</Switch>
		</Router>
	  )
  
	}
  }

export default MyRouter