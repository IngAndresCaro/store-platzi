import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzi-store';

  items = ['nicolas', 'julian', 'andres']

  addItem(){
    this.items.push('nuevo item')
  }

  deleteItem(index: number){
    this.items.splice(index, 1)
  }
}
