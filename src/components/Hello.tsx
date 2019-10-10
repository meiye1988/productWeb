// src/components/Hello.tsx

import * as React from 'react';

export interface Props{
	name:string;
	enthusiasmLevel?:number;  //?表示可选参数
}


// function Hello({ name, enthusiasmLevel = 1 }: Props) {
// 	if (enthusiasmLevel <= 0) {
// 	  throw new Error('You could be a little more enthusiastic. :D');
// 	}
  
// 	return (
// 	  <div className="hello">
// 		<div className="greeting">
// 		  Hello {name + getExclamationMarks(enthusiasmLevel)}
// 		</div>
// 	  </div>
// 	);
//   }
  

  
//第二种方式
class Hello extends React.Component<Props, object> {
	render() {
	  const { name, enthusiasmLevel = 1 } = this.props;
		console.log('123');
	  if (enthusiasmLevel <= 0) {
		throw new Error('You could be a little more enthusiastic. :D');
	  }
  
	  return (
		<div className="hello">
		  <div className="greeting">
			Hello {name + getExclamationMarks(enthusiasmLevel)}
		  </div>
		</div>
	  );
	}
  }

export default Hello;



  // helpers
  
  function getExclamationMarks(numChars: number) {
	return Array(numChars + 1).join('!');
  }
//   使用函数是React中定义组件的两种方式
//第一种方式
// function Welcome(props) {
// 	return <h1>Hello, {props.name}</h1>;
//   }

//第二种方式
// class Welcome extends React.Component {
// 	render() {
// 	  return <h1>Hello, {this.props.name}</h1>;
// 	}
//   }
