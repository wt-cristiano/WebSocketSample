using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;

namespace netCore_Angular_Websocket{


    [Route("api/message")]
    public class MessageController : Controller{

        private IHubContext<MessageHub> _messageHubContext;
        public MessageController(IHubContext<MessageHub> messageHubContext)
        {
            _messageHubContext = messageHubContext;
        }


        public IActionResult Post([FromBody] RequestBody request)
        {
            _messageHubContext.Clients.All.SendAsync("Send", new {message="Mensagem: "+request.message, date=DateTime.Now});
            return Ok();
        }
    }

    public class RequestBody
    {
        public string message { get; set; }
    }

}