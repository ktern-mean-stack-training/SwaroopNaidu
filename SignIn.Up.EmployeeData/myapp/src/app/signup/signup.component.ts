import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public signupForm !: FormGroup;
  constructor(private formBuilder:FormBuilder, private http : HttpClient , private router:Router ){}

ngOnInit(): void{
  this,this.signupForm = this.formBuilder.group({
    fullname:[''],
    email:[''],
    password:[''],
    mobile : ['']

  })
}
signUp() {
  this.http.post<any>("http://localhost:3000/comments", this.signupForm.value)
    .subscribe(
      res => {
        alert("Signup Successfull");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      err => {
        alert("Something went Wrong")
      }
    ); // <-- add closing parenthesis here
}

}

