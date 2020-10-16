using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace LockDown.Hubs
{
    public class LockDownHub : Hub
    {
        public async Task Send(string name, string message, string warning, string RoomLockdown)
        {
            // Call the broadcastMessage method to update clients. broadcastMessage is the name of a method defined on the client in JavaScript. Clients.All.SendAsync will send an asynchronous message to the broadcastMessage method on all connected clients. That message contains the name and message. We can send more...............
            await Clients.All.SendAsync("broadcastMessage", name, message, warning, RoomLockdown);
        }
    }
}