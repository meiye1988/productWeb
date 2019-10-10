// 首页

import * as React from 'react';
import {fixTokenPost} from '../lib/http'
import HotProduct from '../components/hotProduct';
import ProductLayout from '../components/productLayout'
import linespic from '../img/line-spic.png'
class Home extends React.Component<{},{specialList:any[]}>{
	constructor(props:any){
		super(props);
		this.state = {specialList:[]}
	}
	componentDidMount(){
		this.fetchData();
	}
	fetchData(){
		fixTokenPost('productinfo/list',{limit:15,page:1,isSpecial:2}).then((res:any) => {
			let list:any[] = res.object;
			let data = {specialList:list};
			this.setState(data);
		});
	}
	render(){
		const {specialList} = this.state;
		return (
			<div>
				<HotProduct />
				<div className="w100 bottombgcolor">
					<div className="container clearfix ">
						<div className="line-spic mt-30 mb-20 fontsize0">
							<img src={linespic} />
						</div>
						<div className="productContent">
						{
								specialList.map((item:any,key:number)=>{
									return (
										<ProductLayout  product={item} key={item.id} />
									)
								})
							}
								
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default Home;