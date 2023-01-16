import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.sass']
})
export class PriceComponent implements OnInit {
  radPrice: any;
  labPrice: any;
  price: any;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getRadPrice();
    this.getLabPrice();
  }

  getRadPrice(){
    this.http.get(apiUrl+'/RadPrice').subscribe(
      data=>{
        this.radPrice=data;
      },
      error=>{
        alert(error);
      }
    );
  }
  getLabPrice(){
    this.http.get(apiUrl+'/LabPrice').subscribe(
      data=>{
        this.labPrice=data;
      },
      error=>{
        alert(error);
      }
    );
  }

  updaterad(id){
    Swal.fire({
      title: 'Submit The Price',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: login => {
        this.price=login;
        console.log(this.price)
        return this.http.put(apiUrl+'/RadPrice/'+id,{"price": login})
          .subscribe(response => {
            return response
          },
          error => {
            Swal.showValidationMessage(`Request failed: There is An Error please try Again!`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        this.radPrice.forEach(element => {
          if(element.id==id){
            element.price=this.price;
          }          
        });
        Swal.fire({
          title: 'Succuessfully Edited'
        });
      }
    });
  }
  updatelab(id){
    Swal.fire({
      title: 'Submit The Price',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: login => {
        this.price=login;
        console.log(this.price)
        return this.http.put(apiUrl+'/LabPrice/'+id,{"price": login})
          .subscribe(response => {
            return response
          },
          error => {
            Swal.showValidationMessage(`Request failed: There is An Error please try Again!`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        this.labPrice.forEach(element => {
          if(element.id==id){
            element.price=this.price;
          }          
        });
        Swal.fire({
          title: 'Succuessfully Edited'
        });
      }
    });
  }
}
