
import * as React from 'react';
import {fixTokenPost} from '../lib/http'
import {observer} from "mobx-react"
import {observable} from "mobx"
import {RouteComponentProps } from 'react-router';
import '../css/productDetail.css';
import memberprice from '../img/memberprice.jpg'
import fav from '../img/fav.jpg'
import favactive from '../img/fav_active.jpg'
export interface Props extends RouteComponentProps<any> {
	id?: any;
  }


@observer
class ProductDetail extends React.Component<Props,{}>{
	@observable id:number;
	@observable info:any;
	@observable number:number;//若换number类型会报错这是为何
	constructor(props:Props){
		super(props);
		this.id = 0;
		this.info = {argumentList:[],dictName:''};
		this.number = 1;
		this.minusNum = this.minusNum.bind(this);
		this.addNum = this.addNum.bind(this);
		this.joinCart = this.joinCart.bind(this);
		this.fav = this.fav.bind(this);
		this.buy = this.buy.bind(this);
		this.numberChange = this.numberChange.bind(this);
	}
	componentDidMount(){
		this.fetchData();
	}
	numberChange(event:any){
		console.log(this.number);
		this.number = event.target.value;
	}
	minusNum(){
		if(this.number > 1){
			this.number--;
		}
		
	}
	addNum(){
		this.number++;
	}
	joinCart(){
		
	}
	fav(){
		this.info.iscollection = this.info.iscollection==1?2:1;
	}
	buy(){
		
	}
	fetchData(){
		this.id = parseInt(this.props.match.params.id);
		if(!this.id) return;
		fixTokenPost('productinfo/info',{id:this.id}).then((res:any) => {
			this.info = res.object;
			this.info.bigimg = res.object.fileList[0].path;
		});
	}
	render(){
		return (
			<div id="app">

				<div className="w100">
					<div className="container productDetailBox fontsize0">
						<div className="mb10 mt20">
							<div className="catoly">
								分类 > 
								<select name="" id="" disabled>
									<option value="">{this.info.dictName}</option>
								</select>

								> 

								<select name="" id="" disabled>
										<option value="">{this.info.productTypeName}</option>
									</select>

								 <span className="toptitle">{this.info.brandName}</span>
							</div>
						</div>
						<div className="prdetailbox flex">
							<div className="primgblx pre" id="primgblx">
								<img src={this.info.bigimg} />
								{/* <div style="position: absolute;bottom:0;height:20px;background:#f2f2f2;width:100%;left:0;z-index: 10;"></div> */}
							</div>
							<div className="prmeterbox pre">
								<div className="metetitle">
									{this.info.title}
								</div>
								<div className="prmeters clearfix">
									{/* <div v-for="(items,indexs) in info.argumentList"><span>{{items.title}}:</span><span>{{items.content}}</span></div>
									<div v-show="info.isCharge==1">免费上门安装</div> */}
									<div>
										{
											this.info.argumentList.map((items:any,key:number)=>{
												return (
													
													<span key={items.id}><span>{items.title}:</span><span>{items.content}</span>
													<div className={this.info.isCharge==1?'':'none'}>免费上门安装</div></span>
												)
											})
										}
									</div>
								</div>
								<div className="priceBox">
									<div className="gcolor">
										<span><img src={memberprice} className="auto" 
										style={{width:'14px',verticalAlign:'top'}} /></span>
										<span>会员价 ￥{this.info.vipPrice}</span>
									</div>
									<div className="gcolor">
										<span>普通价</span>
										<span className="memberprice">￥{this.info.originalPrice}</span>
									</div>
								</div>
								<div className="pbtnBox fontsize0">
									<div className="pronumberBox">
										<span className="opbtn"  onClick={this.minusNum}>-</span><input   type="number"  value={this.number} onChange={this.numberChange} /><span className="opbtn cursor" onClick={this.addNum}>+</span>
									</div>
									<div className="btnBox">
										<div className="favBtn cursor" onClick={this.fav}>
											<img src={fav} className={this.info.iscollection==1?'auto':'none'} />
											<img src={favactive}  className={this.info.iscollection==2?'auto':'none'} />
											<span className={this.info.iscollection==1?'':'none'}>收藏</span>
											<span className={this.info.iscollection==2?'':'none'}>取消收藏</span>
										</div>
										<div className="joincartBtn cursor" onClick={this.joinCart}>加入购物车</div>
										<div className="copyBtn button cursor" onClick={this.buy}>立即购买</div>
									</div>
								</div>
							</div>
						</div>
						 {/* <div className="prdebottom">
					 	<div className="primgswiper swiper swiper2 pre" style={{padding:'10px 20px',height:'100px'}}>
						 		<div id="owl-topimg2" className="topswiper owl-carousel owl-theme">
						 			<a className="item" onClick={this.changeImg(index)}  href="javascript:void(0)">
						 				
						 			</a>
						 		</div>
						 	</div>
						</div> */}
						
					</div>
				</div>

				<div className="w100 bottombgcolor mt10">
					<div className="container clearfix">
						<div className="prodetailcontentbox">
							<div className="title">
								商品详情
							</div>
							<div className="content" dangerouslySetInnerHTML={{__html: this.info.content}} >
								</div>
						</div>
					</div>
				</div>
				</div>
		)
	}
}


export default ProductDetail;