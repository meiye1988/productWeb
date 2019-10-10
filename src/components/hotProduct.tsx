import * as React from 'react';
import {fixTokenPost} from '../lib/http'
import ProductLayout from './productLayout'
// import Pagination from './pagination'
import linehot from '../img/line-hot.png'

class HotProduct extends React.Component<{},{hotProductList:any[]}>{
	constructor(props:any){
		super(props);
		this.state = {hotProductList:[]}
	}
	componentDidMount(){
		this.fetchData();
	}
	fetchData(){
		fixTokenPost('productinfo/list',{limit:5,page:1,isLow:2}).then((res:any) => {
			let list:any[] = res.object;
			let data = {hotProductList:list};
			this.setState(data);
		});
	}
	getCurrentPage(val:number){
		console.log('val',val);
	}
	render(){
		const {hotProductList} = this.state;
		return (
			<div>
				<div className="w100" style={{background:'white'}}>
					<div className="container clearfix fontsize0">
						<img src={linehot} alt="" className="linehot" />
					</div>
				</div>
			<div className="w100 pb-30" style={{background:'white'}}>
					<div className="container clearfix backhotimg">
						<div className="productContent">
							{
								hotProductList.map((item:any,key:number)=>{
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
export default  HotProduct;

