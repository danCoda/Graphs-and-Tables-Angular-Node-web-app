import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data;

  async retrieveData() {
    try {
      const response = await fetch("http://localhost:3001/api/retrieve-sales");
      const data = await response.json();    
      return data;
    } catch (e) {
      return e;
    }
  }

  constructor(private http:HttpClient) { 
    //this.data = this.retrieveData();
    //this.data = this.http.get("http://localhost:3001/api/retrieve-sales");
  }

  getData() {
    return this.http.get("http://localhost:3001/api/retrieve-sales");
    
  }
}
