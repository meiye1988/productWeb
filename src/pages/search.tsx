// 搜索页

import * as React from 'react';
import {RouteComponentProps,withRouter } from 'react-router';
import HotProduct from '../components/hotProduct';
import Pagination from '../components/pagination'
import ProductLayout from '../components/productLayout'
import {isBlank} from '../lib/util'
import {fixTokenPost} from '../lib/http'
import {observer} from "mobx-react"
import {observable} from "mobx"
import PubSub from 'pubsub-js'//订阅与发布模式
//测试下加密crypto库
import CryptoJS from 'crypto-js'
import '../css/search.css';
export interface Props extends RouteComponentProps<any> {
	name?: any;
  }
//   export interface searchObject{
// 	  searchWord:string,
// 	  page:number,
// 	  searchList:any[],
//   }
@observer
class Search extends React.Component<Props,{}>{
	@observable page:number;
	@observable searchWord:string;
	@observable searchList:any[];
	@observable totalPage:number;
	constructor(props:Props){
		super(props);
		this.page = 1;
		this.totalPage = 0;
		this.searchList = [];
		this.searchWord = "";
		this.getCurrentPage = this.getCurrentPage.bind(this);
	}
	componentDidMount() {
		let self = this;
		const key =  CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); 
		const iv =  CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); 
		const word = 'adbsd';
		let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
		let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
		console.log(decryptedStr);

		PubSub.subscribe('PubSub_searchWord', function (name:any,message:any) { 
			self.searchWord = message;
			self.page = 1;
			self.fetchData();

		  }.bind(this));  
		  console.log(this.props.match);
		this.searchWord = this.props.match.params.name;
		console.log('组件search=='+this.searchWord);
		this.fetchData();

	  }
	  componentWillUnmount(){  
		PubSub.unsubscribe('PubSub_searchWord');  
	  }
	  fetchData(){
		  if(!isBlank(this.searchWord)){
			
			fixTokenPost('productinfo/list',{limit:25,page:this.page,title:this.searchWord}).then((res:any) => {
				let list:any[] = res.object;
				this.searchList = list;
				if(this.page==1){
					this.totalPage = res.page.totalPage;
				}
			});
		}
		
	  }
	  getCurrentPage(val:number){
		this.page = val;
		this.fetchData();

	  }
	render(){
		return (
			<div>
				<HotProduct />
				<div className="w100 bottombgcolor pb-40">
					<div className="container clearfix">
						<div className="searchtitle">
							全部结果
						</div>
						<div className="productContent">
						{
								this.searchList.map((item:any,key:number)=>{
									return (
										<ProductLayout  product={item} key={item.id} />
									)
								})
							}
						</div>
						<Pagination totalPage={this.totalPage}  handleCurrentPageValue={this.getCurrentPage} />
					</div>
				</div>
				
			</div>
		)
		
	}
}
export default withRouter(Search);;
