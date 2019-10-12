import * as React from 'react';
import {  Link } from "react-router-dom"
import memberprice from '../img/memberprice.jpg'
// proudct  产品信息   
export interface Props{
	product:any
}

class ProductLayout extends React.Component<Props,{}>{
	render(){
		const {product} = this.props;
		return (
			<div className="productconation" key={product.id} >
				<Link to={'/productDetail/'+product.id} target="_blank"rel="noopener noreferrer">
				<div className="productbox pre cursor" >
					<div className="pimg">
						<img src={getProductImg(product.logoImg)} alt="" />
					</div>
					<div className="ptitle">
					{product.title}
					</div>
					<div className="pricebox">
						<div><img src={memberprice} className="auto memberpriceicon" /></div>
						<div className="memberprice gcolor">会员价 ￥{product.vipPrice}</div>
						<div className="normalprice gcolor">￥{product.originalPrice}</div>
					</div>
					<div className="joinCart">
						<button className="button" type="button" >加入购物车</button>
					</div>
				</div>
				</Link>
			</div>
		)

	}
}
export default ProductLayout

function getProductImg(imgurl:string){
	let width:number = document.body.clientWidth;
	let imgwidth:number = 0;
	let imgheight:number = 0;
	if(width <= 1450){
		imgheight = 110;
		imgwidth = 184;
	}else if(width  > 1700){
		imgheight = 126;
		imgwidth = 210;
	}else{
		imgheight = 110;
		imgwidth = 184;
	}
	return imgurl+'?imageView2/1/w/'+imgwidth+'/h/'+imgheight+'/q/100';
}