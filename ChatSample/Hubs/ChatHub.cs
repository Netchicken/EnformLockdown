using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace LockDown.Hubs
{
    public class LockDownHub : Hub
    {
        public async Task Send(string name, string message)
        {
            // Call the broadcastMessage method to update clients.
            await Clients.All.SendAsync("broadcastMessage", name, message);
        }
    }
}