import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {

  userDataParent = [
    {
      firstname: "Swaroop",
      lastname: "Naidu"
    },
    {
      firstname: "Madhan",
      lastname: "Mohan"
    },
    {
      firstname: "Rahul",
      lastname: "Rishi"
    }
  ]

  updatedUserData(updatedData: any) {
    console.log("Data from child to parent")
    console.log(updatedData)
  }
}
