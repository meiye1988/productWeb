// 首页

import * as React from 'react';
import {fixTokenPost} from '../lib/http'
import HotProduct from '../components/hotProduct';
import ProductLayout from '../components/productLayout'
import linespic from '../img/line-spic.png'
import {observer} from "mobx-react"
import {observable} from "mobx"
import Swiper from '../components/swiper'
@observer
class Home extends React.Component<{},{specialList:any[]}>{
	public saveRef:any;
	public refDom:any;
	@observable categoryHeight:number;
	@observable producttypelist:any;
	constructor(props:any){
		super(props);
		this.state = {specialList:[]}
		this.saveRef = (ref:any) => {this.refDom = ref};
		this.categoryHeight = 0;
		this.producttypelist  = [];
	}

	componentDidMount(){
		this.fetchCategoryData();
		this.fetchData();
	}
	fetchData(){
		fixTokenPost('productinfo/list',{limit:15,page:1,isSpecial:2}).then((res:any) => {
			let list:any[] = res.object;
			let data = {specialList:list};
			this.setState(data);
		});
	}
	fetchCategoryData(){
			
		fixTokenPost('sysdict/list',{limit:100,page:1,type:1}).then((res:any) => {
			 let ary:any[] = [];
			const requestData = async()=>{
				for(let item of res.object){
					const resultData = await this.fetchCategoryChildData(item.id);
					ary.push({dictId:item.id,dictName:item.value,diyLogoImg:item.remark,list:resultData.object});
				}
				this.producttypelist = ary;
				const {clientHeight} = this.refDom;
				this.categoryHeight = clientHeight;

			}
			requestData();
			
		})
	  }
	  fetchCategoryChildData(dictId:number){
		const result =  fixTokenPost('producttype/list',{limit:100,page:1,dictId:dictId}).then((res:any)=>{
			return res;
		});
		return result;
	  }
	render(){
		const {specialList} = this.state;
		let imgAry = [
			{imgurl:'https://img.zcool.cn/community/01a6b45cda215da80121416848e962.gif',id:1},
			{imgurl:'https://img.zcool.cn/community/0170e05cb44238a8012141682ca029.jpg@1280w_1l_0o_100sh.jpg',id:2},
			{imgurl:'https://img.zcool.cn/community/013e295bc19133a8012099c8efc4af.jpg@1280w_1l_2o_100sh.jpg',id:3},
		]
		return (
			<div>
				
				<div className='w100 categoryallbox'>
					<div className='container clearfix flex fontsize0'>
						<div className="cbox inline-block " id="navbottombox" ref={this.saveRef}>
							{
								this.producttypelist.map((item:any,key:number)=>{
									return (
										<div className="cmbox flex" key={item.dictId}>
											<div className="cmicon">
													<img src={item.diyLogoImg} className="auto" style={{width:'20px'}} /> 
											</div>
											<div className="ccgto">
												<div className="cctitle">
												{item.dictName}
												</div>
												<div className="cccontent">
													{
														item.list.map((items:any,keys:number)=>{
															return (
																<span className="cursor" key={items.id}>{items.title}</span>
															)
														})
													}
												</div>
											</div>
										</div>
									)
								})
							}	
							</div><div className="swiperParent inline-block pre overhidden fontsize0">
							<Swiper  items={imgAry} categoryHeight={this.categoryHeight}></Swiper>
								
							</div>
						</div>
					</div>
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