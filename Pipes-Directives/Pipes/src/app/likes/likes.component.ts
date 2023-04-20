import { Component } from '@angular/core';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent {


  constructor(){}  
  someNumber: number = 1800;
  todayDate: Date = new Date();
  carPrice: number=500000;

  PlayerHeight : number = 5;

ngOnInit():void{

}
}
