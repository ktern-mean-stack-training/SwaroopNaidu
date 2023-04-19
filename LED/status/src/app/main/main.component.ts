import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  lightstatus: string = "OFF"
  bulbstatus: string = "ON"
  bs: boolean=false

  lighton(){
    this.lightstatus="ON"
  }
  lightoff(){
    this.lightstatus="OFF"
  }

  lightswitch(){
    this.bs =! this.bs
    if(this.bs){
      this.bulbstatus="ON"
    }
    else{this.bulbstatus="OFF"}
  }
}
