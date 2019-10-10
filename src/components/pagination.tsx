import * as React from 'react'

export interface Props{
	totalPage:number;
	limit?:number;
	handleCurrentPageValue:any;
	
}

class paginAtion extends React.Component<Props,{pageCurr:number,groupCount:number,startPage:number}>{
	constructor(props:any){
		super(props);
		this.state = {
			pageCurr:1,
			groupCount:7,
			startPage:1,
		}
	}
	create(){
		const {  totalPage } = this.props;
		const {
			pageCurr,
			startPage,
			groupCount

		} = this.state;
		
		// let totalPage = total % limit == 0 ? total / limit : (total / limit + 1).toFixed(0);
		let i:number
		let pageAry:any[] = [];
		pageAry.push(
			<div key={0} onClick = { this.goPrev.bind(this) } className={pageCurr==1?'none':'pagination pagebtn prev cursor'}>
				<a href="javascript:void(0)">上一页</a>
			</div>
			);
		if(totalPage <= 10 ){
			for(i = 1;i<=totalPage;i++){
				pageAry.push(
				<div key={i} onClick = { this.go.bind(this,i) } className={pageCurr==i?'pagebtn active':'pagebtn'}><a href="javascript:void(0)" >{i}</a></div>
				);
			}
		}else{
			for(i = startPage;i<groupCount + startPage;i++){
				if(i <= totalPage - 2){
					pageAry.push(
					<div key={i} onClick = { this.go.bind(this,i) } className={pageCurr==i?'pagebtn active':'pagebtn'}><a href="javascript:void(0)" >{i}</a></div>
					);
				}
			}
			if(totalPage - startPage >= 9){
				
				pageAry.push(
				<div key={-1}  className='pagebtn'><a href="javascript:void(0)" >...</a></div>
				);
			}
			
			
			pageAry.push(<div key={totalPage - 1} onClick = { this.go.bind(this,totalPage - 1) } className={pageCurr==totalPage - 1?'pagebtn active':'pagebtn'}><a href="javascript:void(0)" >{totalPage - 1}</a></div>)
			pageAry.push(<div key={totalPage} onClick = { this.go.bind(this,totalPage) } className={pageCurr==totalPage?'pagebtn active':'pagebtn'}><a href="javascript:void(0)" >{totalPage}</a></div>)
			
		}
		
		pageAry.push(
			<div key={i + 1} onClick = { this.goNext.bind(this) } className={totalPage<=1 || pageCurr==totalPage?'none':'pagebtn lastborder next'}>
				<a href="javascript:void(0)">下一页</a>
			</div>
			);
		return pageAry;
	}
	go(pageCurr:number){
		const {
			groupCount
		} = this.state;
		// 处理下一页的情况
		// console.log(pageCurr % groupCount);
		if(pageCurr % groupCount === 1){
			this.setState({
				startPage:pageCurr
			})
		}
	
		// 处理上一页的情况
		if(pageCurr % groupCount === 0){
			this.setState({
				startPage:pageCurr - groupCount + 1
			})
			
		}
		 // 点击最后两页时重新计算 startPage
		 if(this.props.totalPage - pageCurr < 2){
			this.setState({
				startPage:this.props.totalPage - groupCount,
			})
		}
		this.setState({
			pageCurr:pageCurr
		});
		this.props.handleCurrentPageValue(pageCurr);
	}
	goPrev(){
		let {
			pageCurr,
		} = this.state;
		if(--pageCurr === 0){
			return;
		}
		this.go( pageCurr )
	}
	// 页面向后
	goNext(){
		let {
			pageCurr,
		} = this.state;
		if(++pageCurr > this.props.totalPage){
			return;
		}
		this.go( pageCurr )
	}
	render(){
		const pageAry = this.create.bind(this)();
		return (
			<div className="paginationbox clearfix text-center">

				{pageAry}
			</div>
		)
	}
}


export default paginAtion;

