import { Component, OnInit } from '@angular/core';
import { message } from 'src/app/models/chatmodel';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  newMessage : message = {};
  
  constructor(private service:ChatserviceService) { }

   massagelist!:message[];

  ngOnInit(): void {
    this.service.connection()
    this.service.getmessage().subscribe({
      next : (data : message[]) => this.massagelist = data
    })
    
    this.service.myHub.on('receiveMessage',(message)=>{
      this.massagelist.push(message)
    })
  }
  SendMessage()
  {
    this.newMessage.time = new Date();
    this.service.myHub.send('SendMessage',this.newMessage)
  }

}
