using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace netCore_Angular_Websocket{
    public class MessageHub : Hub{
        public Task Send(string message)
        {
            return Clients.All.SendAsync("Send", message);
        }
    }
}