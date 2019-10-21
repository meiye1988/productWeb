import {observable, action} from 'mobx'
export interface IAccountStore{
	userName:string | null,
	isLogin():boolean,
	get():string | null,
	set(value:string):void,
	test():void,
	clear():void,
}
export class AccountStore implements IAccountStore{

    @observable userName = ""

	@action.bound
	test(){
		this.userName = "23";
	}
    @action.bound
	get(){
		return localStorage.getItem('userName') ?  localStorage.getItem('userName'):''
	}
	@action.bound
	set(value:string){
		localStorage.setItem('userName',value)
	}
	@action.bound
	isLogin(){
		return this.get() ? true : false
	}
	@action.bound
	clear(){
		localStorage.removeItem('userName')
	}
	
}