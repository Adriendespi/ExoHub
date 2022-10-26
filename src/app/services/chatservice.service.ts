import { Injectable } from '@angular/core';
import * as signalr from '@microsoft/signalr'
import { HttpClient } from '@angular/common/http';
import { message } from '../models/chatmodel';

@Injectable({
  providedIn: 'root'

})
export class ChatserviceService {


  myHub! : signalr.HubConnection
  apiurl : string = "https://localhost:7060/"
  
  

  constructor(private httpClient: HttpClient) { }

  connection() {
    this.myHub = new signalr.HubConnectionBuilder().withUrl(this.apiurl+"chat").build()
    this.myHub.start()
  }
  getmessage()
  {
    return this.httpClient.get<message[]>(this.apiurl+'api/Chat');
  }

}
