import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public WebSocket: signalR.HubConnection;
  public isConnect = false;
  onMessageReceived: BehaviorSubject<any>;

  constructor() { 
    this.onMessageReceived = new BehaviorSubject({});
  }


  configureToWebsocket(url){
    this.WebSocket = new signalR.HubConnectionBuilder()
                        .withUrl(url)
                        .build();
  }

  public subscribeHubs(){
    this.WebSocket.on("Send", (result) => this.onMessageReceived.next(result));
  }

  public removeSubscribeHubs(){
    this.WebSocket.off("Send");
  }

  connect(){
    this.WebSocket.start().then(() =>{
      if(!this.isConnect){
        this.isConnect = true;
        this.removeSubscribeHubs();
        this.subscribeHubs();
      }
    }).catch(() => {
      this.isConnect = false;
      this.removeSubscribeHubs();
      console.log("Error: Não foi possível conectar no websocket");
    });
  }
}
