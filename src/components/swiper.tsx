//轮播组件

import * as React from 'react';
import {observer} from "mobx-react"
import {observable,toJS} from "mobx"

export interface Props{
	items:any,
	is_showDot?:boolean,
	is_showArrows?:boolean,
	is_autoplay?:boolean,
	time?:number,
	categoryHeight:number,

}
@observer
class Swiper extends React.Component<Props,{}>{
	@observable is_autoplay:boolean | undefined;
	@observable time:number | undefined;
	@observable animateStyle:any;
	@observable currentIndex:number;
	
	@observable itemLength:number;
	public timer:any;
	public itemStyle:any;
	public imgStyle:any;
	public refDom:any;
	public saveRef:any;
	public itemWidth:number;
	public categoryHeight:number;
	constructor(props:Props){
		super(props);
		this.is_autoplay = this.props.is_autoplay ? this.props.is_autoplay:true;
		this.time = this.props.time ? this.props.time:2000;
		this.currentIndex = 1;
	
		this.itemLength = this.props.items.length;
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
		this.dotgo = this.dotgo.bind(this);
		this.timer = null;
		this.itemWidth = 0;
		this.saveRef = (ref:any) => {this.refDom = ref};
		
		
	}
	componentDidMount(){
		const {clientWidth} = this.refDom;
		this.itemWidth = clientWidth;
		this.animateStyle = {
			transform: 'translate3d(0px, 0px, 0px)',
			transition: 'all 0.25s ease 0s',
			width:this.itemWidth * 3 +'px'
		}
		this.itemStyle = {
			width:this.itemWidth +'px',
		}
		if(this.is_autoplay){
			this.autoplay();
		}		

	}
	componentWillReceiveProps(nextProps:any) {
		
		this.categoryHeight = nextProps.categoryHeight;
		this.imgStyle = {
			height:this.categoryHeight+'px'
		}
      }
	prev(){
		
		clearInterval(this.timer);
		this.currentIndex--;
		this.go(this.currentIndex);
		this.autoplay();
	}
	next(){
		clearInterval(this.timer);
		this.currentIndex++;
		this.go(this.currentIndex);
		this.autoplay();
	}
	dotgo(index:number){
		clearInterval(this.timer);
		this.currentIndex = index;
		this.go(index);
		this.autoplay();
	}
	autoplay(){
		this.timer = setInterval(() => {
			this.currentIndex++;
			this.go(this.currentIndex);
		}, this.time);
	}
	go(index:number){
		if(index > this.itemLength){
			this.currentIndex = index = 1;
			
		}else if(index <= 0){
			this.currentIndex = index = this.itemLength;
		}
		let lefts = (index-1)*this.itemWidth;
		this.animateStyle.transform = 'translate3d(-'+lefts+'px, 0px, 0px)';
	}
	render(){
		let str = [];
		for(let i:number=0;i<this.itemLength;i++){
           str.push(<button role="button" onClick={()=>{this.dotgo(i+1)}} key={i} className={this.currentIndex==(i+1)?'owl-dot active':'owl-dot'}><span></span></button>)
		}
		return (
			<div className="swiper pre" ref={this.saveRef}>
				<div className="owl-stage-outer" style={toJS(this.animateStyle)}>
					<div className="owl-stage">
						{
							this.props.items.map((item:any,key:any)=>{
								return (
									<div className="swiper-item" key={item.id} style={this.itemStyle}>
										<img src={item.imgurl} style={this.imgStyle} />
									</div>
								)
							})
						}
					</div>
				</div>
				<div className="owl-nav">
					<button onClick={this.prev} type="button" role="presentation" className="owl-prev"><span></span></button>
					<button type="button" onClick={this.next} role="presentation" className="owl-next"><span></span> </button>
				</div>
				<div className="owl-dots">
					{str}
				</div>
			</div>
		)
	}
}

export default Swiper;
