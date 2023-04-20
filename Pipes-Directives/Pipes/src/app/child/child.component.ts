import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {

  @Input() userData: any;
  @Output() userAddedAge: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    console.log("This was the data coming from parent to child");
    console.log(this.userData);

    setTimeout(()=>{
      this.addAge(this.userData);
      },5000);
  }

  addAge(data: any) {
    data.forEach((element: any) => {
      element.age = 21;
    });
    this.userAddedAge.emit(data);
  }

}
