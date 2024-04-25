namespace API.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string Username { get; set; } //Currently logged in user
        public string Container { get; set; } = "Inbox";
    }
}