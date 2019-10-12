import * as React from 'react';
import {fixTokenPost} from '../lib/http'
import {isBlank} from '../lib/util'
import {  Link } from "react-router-dom"
import history from '../history';
import {observer} from "mobx-react"
import {observable} from "mobx"
// import Swiper from './swiper'

import iconpin from '../img/iconpin.png'
import iconshipy from '../img/iconshipy.png'
import logo from '../img/logo.png'
import iconseach from '../img/iconseach.png'
import iconfk from '../img/iconfk.png'

export interface Props{
	isIndexPage:boolean,
	handleSearchWordValue:any
}

@observer
class Header extends React.Component<Props,{hotSearchList:any[],producttypelist:any[],showIndex:number,searchWord:string,redirect:boolean}>{
	@observable searchWord:any;
	@observable is_indexPage:boolean;
	@observable categoryHeight:number;
	constructor(props:Props){
		super(props);
		this.state = {hotSearchList:[],producttypelist:[],showIndex:-1,searchWord:'',redirect:false};
		this.clickHotSearch = this.clickHotSearch.bind(this);
		this.searchWord = "";
		
	}
	componentWillMount() {
		
		console.log(this.props.isIndexPage);
		this.fetchHotLabelData();
		this.fetchCategoryData();
	  }
	  fetchHotLabelData(){
		fixTokenPost('hotlabel/list',{}).then((res:any) => {
			let list:any[] = res.object;
			let rom:number = Math.floor((Math.random()*res.object.length)+1);
			var hotSearchList:any[]  = [];
		     hotSearchList.push(list[rom-1]);
			 if(rom == res.object.length){
			 	hotSearchList.push(res.object[0]);
			 }else{
			 	hotSearchList.push(res.object[rom]);
			 }
			let data = {hotSearchList:hotSearchList};
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
				let data = {producttypelist:ary};
				this.setState(data);

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
	  ToggleShow(index:number){
		if(this.state.showIndex > -1){
			this.setState({showIndex:-1})
		}else{
			this.setState({showIndex:index})
		}
		
	  }
	  gosearch(){
		const searchWord = this.searchWord;
		if(history.location.pathname.indexOf('/search') > -1){
			if(!isBlank(searchWord)){
				this.props.handleSearchWordValue(searchWord);
				
			}
		}else{
			if(!isBlank(searchWord)){
				history.push('/search/'+searchWord);
				
			}
		}
	  }
	  clickHotSearch(event:any){
		const searchWord  = event.target.getAttribute('data-searchword');
		if(!isBlank(searchWord)){
			this.searchWord = searchWord;
			this.gosearch();
		}
	  }
	  inputChangedHandler(event:any){
		
		this.searchWord  = event.target.value;
		
	  
	  }
	render() {
		const {hotSearchList,producttypelist,showIndex} = this.state;
		
		return (
			<div>
				<div className="w100 topnavbox">
					<div className="container clearfix pre">
						<div className="topheader fl">
							<span>
								<img src={iconpin} className="auto" />	
							</span>
							<span><span id="cityname">在定位中</span>&nbsp;<span id="areaname"></span></span>
							<span className="gcolor cursor"  v-show="!common.isUser">账户登录</span>
							<span className="gcolor cursor" v-show="common.isUser">123123,您好</span>
							<span className="cursor hovercolor" v-show="common.isUser" >退出</span>
						</div>
						<div className="rightnav">
							<span><img src={iconshipy} className="auto" /></span>
							<span><a href="javascript:void(0)" >购物车</a></span>
							<span><a href="javascript:void(0)"  >我的收藏</a></span>
							<span><a href="javascript:void(0)" >我的订单</a></span>
							<span><a href="javascript:void(0)" ><span >会员</span></a></span>
							<span><a href="javascript:void(0)">关于修修狐</a></span>
						</div>
					</div>
				</div>
				<div className="w100">
					<div className="container header clearfix pre">
						<div className="logo fl fontsize0">
								<img src={logo} className="auto" />
						</div>
						<div className="searchbox fl pre fontsize0">
							<input type="text" className="searchinput" id="keyword" value={this.searchWord} onChange={(event)=>this.inputChangedHandler(event)} />
							<button  type="button" className="searchbutton button" onClick={this.gosearch.bind(this)}>搜索</button>
							<img src={iconseach} alt="" className="auto searchicon" />
							<div className="searchTab">
								{
									hotSearchList.map((item:any,key:number)=>{
										return (
											<span className="cursor" data-searchword={item.labelName} onClick={this.clickHotSearch} key={item.id}>{item.labelName}</span>
										)
									})
								}
								
							</div>
						</div>
						<div className="rightbuttonbox fontsize0">
							<div className="button cursor">
								<img src={iconshipy} className="auto" />&nbsp;购物车 <span>3</span>
							</div><div className="button2 cursor">我的订单</div>
						</div>
					</div>
				</div>
				<div className="w100 headernav  fontsize0">
					<div className="container clearfix">
						<div className="allcategory fl cursor pre">
							<img src={iconfk} className="auto allcimg" />全部分类
							<div className={!this.props.isIndexPage?'categoryallbox w100 noindex fontsize0':'none'}>
								<div className="cbox inline-block " style={{width:'85%'}} id="navbottombox">
									{
										producttypelist.map((item:any,key:number)=>{
											return (
												<div className="cmbox flex" key={item.dictId}>
													<div className="cmicon">
														 <img src={item.diyLogoImg} className="auto" style={{width:'20px'}} /> 
													</div>
													<div className="ccgto">
														<div className="cctitle" onClick={this.ToggleShow.bind(this,key)}>
														{item.dictName}
														</div>
														<div className={showIndex==key?"cccontent ":"cccontent none"}>
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
									</div>
								</div>
						</div>
						<div className="nav fl "> 
							<div className="navbox">
								<span><Link to="/home">首页</Link></span>
								<span><a href="javascript:void(0)">DIY</a></span>
								<span><a href="javascript:void(0)">上门快修</a></span>
								<span><a href="javascript:void(0)">私人定制</a></span>
								<span><a href="javascript:void(0)">店铺</a></span>
							</div>
						</div>
					</div>
				</div>
				
						
			</div>
		);
	}
}

export default Header;