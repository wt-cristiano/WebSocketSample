import { Component, OnInit, OnDestroy } from '@angular/core';
//import * as signalR from "@aspnet/signalr";
import { AppService } from './app.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  
  private _unsubscribe: Subject<any>;
  title = 'WebClient';
  animate = {
    type: 'expand',
    direction: 'down',
    duration: 500
  }
  show = false;
  showNoNotification = false;
  notificationsNumber = 0;
  listMessage = [];


  constructor(private AppService: AppService){
    this._unsubscribe = new Subject();
  }

  ngOnInit(): void {
    // let connection = new signalR.HubConnectionBuilder()
    //                       .withUrl('http://localhost:5000/message')
    //                       .build();

    this.AppService.configureToWebsocket('http://localhost:5000/message');
    this.AppService.connect();
    this.AppService.onMessageReceived
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(message => {
        console.log("message: ", message);
        if(message.message){
          this.messageReceived(message);
        }
      });
    // connection.start()
    //   .then(() => console.log('Connected'));

    // connection.on('Send', data => {
    //   console.log("Websocket: ", data);
    // });
  }

  messageReceived(message){
    this.listMessage.push(message);
    if(!this.showNoNotification){
      this.notificationsNumber++;
    }
  }

  ngOnDestroy(): void
  {
      this._unsubscribe.next();
      this._unsubscribe.complete();
  }

  

  ShowNotifications(){
    this.show = !this.show;
    if(this.show){
      this.notificationsNumber = 0;
      this.showNoNotification = !this.showNoNotification;
      this.show = !this.show;
    }
  }

  ShowNoNotifications(){
    this.showNoNotification = !this.showNoNotification;
  }


}
