using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MessageRepository(DataContext context, IMapper mapper) //as we want to return MessageDto thus we need to inject IMapper also
        {
            _context = context;
            _mapper = mapper;
        }
        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            //To store the query
            var query = _context.Messages
                .OrderByDescending(x => x.MessageSent)//to get recent msg first
                .AsQueryable();

            //Using switch to use which Container we are trying to access
            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.RecipientUsername == messageParams.Username
                    && u.RecipientDeleted == false),
                "Outbox" => query.Where(u => u.SenderUsername == messageParams.Username
                    && u.SenderDeleted == false),
                _ => query.Where(u => u.RecipientUsername == messageParams.Username 
                && u.RecipientDeleted == false && u.DateRead == null) //Default case for unread msgs
            };

            var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);

            return await PagedList<MessageDto>
                .CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string RecipientUserName)
        {
            var messages = await _context.Messages
                .Include(u => u.Sender).ThenInclude(p => p.Photos) //We are using thenInclude for photos bcz photos are related entity for AppUser
                .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                .Where(
                    m => m.RecipientUsername == currentUserName && m.RecipientDeleted == false &&
                    m.SenderUsername == RecipientUserName ||  // small r
                    m.RecipientUsername == RecipientUserName && m.SenderDeleted == false &&  // small r
                    m.SenderUsername == currentUserName
                )
                .OrderBy(m => m.MessageSent)
                .ToListAsync();

            //We are fetching the msgs from in memory only we 
            //are not going into database as the msgs are already there in query
            var unreadMessages = messages.Where(m => m.DateRead == null
                && m.RecipientUsername == currentUserName).ToList();

            if(unreadMessages.Any())
            {
                foreach ( var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow;
                }

                await _context.SaveChangesAsync(); // Save changes back to DB
            }

            return _mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}