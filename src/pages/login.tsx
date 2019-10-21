// 首页

import * as React from 'react';
import {observer,inject} from "mobx-react"
import {observable} from "mobx"
import history from '../history';
import l_phone from '../img/l_phone.jpg'
// import l_code from '../img/l_code.jpg'
import '../css/register.css';
import { IAccountStore } from "../store/accountStore";
export interface Props{
	accountStore?: IAccountStore | null,
}
@inject('accountStore')
@observer
class Login extends React.Component<Props,{}>{
	@observable phone:string;
	constructor(props:any){
		super(props);
		// this.phone = '';
		this.phoneChange = this.phoneChange.bind(this);
		this.loginClick = this.loginClick.bind(this);
	}

	componentDidMount(){
		
	}
	phoneChange(event:any){
		this.phone = event.target.value;
	}
	loginClick(){
		this.props.accountStore!.set(this.phone);
		history.replace('/');
	}
	render(){
	
		return (
			<div className="w100 middlemainbox">
			<div className="registerfrom bgwhite">
					<div className="title">注册登录</div>
					<div className="inputbox pre">
						<img src={l_phone} className="phoneimg" />
						<input type="number" placeholder="请输入手机号" value={this.phone} onChange={this.phoneChange} />
					</div>
					{/* <div className="inputbox pre">
							<img src={l_code} className=" codeimg" />
						<input type="text" placeholder="请输入验证码" />
					</div> */}
					<div className="inputbox pre">
						<button type="button" className="button loginbtn" onClick={this.loginClick}>登录</button>
					</div>
				</div>

	</div>
		)
	}
}


export default Login;