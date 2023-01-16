import { AuthService } from './../../shared/security/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from './../../shared/security/role';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import { AuthLoginInfo } from 'src/app/shared/security/login-info';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/environments/environment';
import { Patient } from 'src/app/reception/patients/allpatients/patient.model';
import { Observable } from 'rxjs';
import { $ } from 'protractor';
import { parse } from 'querystring';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage :string = null;
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  loginForm: FormGroup;
  pid: any;
  submitted = false;
  error = "";
  hide = true;
  formBuilder: any;
  status: boolean;
  constructor(private router:Router,private http: HttpClient,private authService: AuthService, private tokenStorage: TokenStorageService) { }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    window.sessionStorage.clear();
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
   });
   
  }
  
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    console.log(this.loginForm.controls);
    console.log(this.f.username.value);
 
    this.loginInfo = new AuthLoginInfo(
      
      this.f.username.value,
      this.f.password.value);
    
      this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.savedType(data.dType);
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);
          window.sessionStorage.setItem('user-id',String(data.id));

   
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
           const role = this.roles[0]
           this.status = data.status;
           console.log(this.tokenStorage.getdType());
           if(!this.status){
            this.errorMessage="Account InActivated";
            }else if (role === "ROLE_ADMIN") {

            localStorage.setItem('STATE', 'true');
            localStorage.setItem('ROLE', "Admin");
            this.router.navigate(['/admin/dashboard/main']);
            //this.router.navigate(['/admin/patients/edit-patient']);

          } else if (role === "ROLE_DOCTOR") {
            localStorage.setItem('STATE', 'true');
            localStorage.setItem('ROLE', "Doctor")
            this.router.navigate(['/doctor/dashboard']);
          }

          else if (role === "ROLE_RECEPTION") {
            localStorage.setItem('STATE', 'true');
            localStorage.setItem('ROLE', "Reception")
            this.router.navigate(['/reception/dashboard']);
          }
          
          else if (role === "ROLE_OPD") {
            localStorage.setItem('STATE', 'true');
            localStorage.setItem('ROLE', "Opd")
            this.router.navigate(['/opd/dashboard']);
          }
        
          else if (role === "ROLE_LAB") {
            localStorage.setItem('STATE', 'true');
            localStorage.setItem('ROLE', "Lab")
            this.router.navigate(['/laboratory/dashboard']);
          }

          else if (role === "ROLE_RAD") {
            localStorage.setItem('STATE', 'true');
            localStorage.setItem('ROLE', "Rad")
            this.router.navigate(['/radiology/dashboard']);
          }
          else if (role === "ROLE_ROOM") {
            localStorage.setItem('STATE', 'true');
            localStorage.setItem('ROLE', "Room")
            this.router.navigate(['/Room/dashboard']);
          }
          else if (role === "ROLE_PATIENT") {
            localStorage.setItem('STATE', 'true');
            localStorage.setItem('ROLE', "Patient");
            this.getPatients(data.id);
            this.router.navigate(['/patient/dashboard']);
          }
        },
        error => {
          console.log(error);
          if (error.error.error = "Unauthorized"){
            this.errorMessage = "Incorrect username or password";
            this.isLoginFailed = true;
          } else {
          this.errorMessage = error.error.error;
          this.isLoginFailed = true;
          }
        }
      );
    }
  reloadPage() {
    window.location.reload();
  }
  getAllPatients(id: number): Observable<any> {
    const url =apiUrl+'/Patient/user/'+id;
    return this.http.get(url).pipe(
        )
  }
  getPatients(id: number): void {
  this.getAllPatients(id).subscribe(
      data => {
        this.pid = data[0].patient_ID;
        console.log(data);
        console.log(this.pid)
        localStorage.removeItem('visitpId');
        localStorage.removeItem('patientId');
        localStorage.setItem('visitpId',data[0].v);
        localStorage.setItem('patientId',this.pid);
      },
      _ => console.log('Get Patient Failed')
  );
  }
}