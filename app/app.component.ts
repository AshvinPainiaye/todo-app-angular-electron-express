import { Component } from '@angular/core';



@Component({
  selector: 'my-app',
  template: `
    
    <h1 class="text-center">{{title}}</h1>
    <tasks></tasks>  
    `,
})
export class AppComponent  {
  title = 'Todo-list';
 }
