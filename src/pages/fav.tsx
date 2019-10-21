// 首页

import * as React from 'react';
import {observer} from "mobx-react"
import {observable} from "mobx"
@observer
class Cart extends React.Component<{},{}>{
	@observable phone:string;
	constructor(props:any){
		super(props);
		
	}

	componentDidMount(){
		
	}
	
	render(){
	
		return (
			<div>收藏在开发中....</div>
		)
	}
}


export default Cart;