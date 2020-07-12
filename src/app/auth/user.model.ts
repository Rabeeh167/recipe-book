export class User{
   constructor(public email, public id, private _token, private _tokenexpirationdate){}

   //getter is a property where we can write code which will be executed when we try to access the property
   get token(){
       if(!this._tokenexpirationdate && new Date() > this._tokenexpirationdate){
           return null;
       }
       else{
           return this._token
       }
   }
    
}