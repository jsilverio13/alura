using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace Alura.Filmes.App.Extensions
{
    public static class DbContextExtensions
    {
        public class SqlServerLogger : ILogger
        {
            public IDisposable BeginScope<TState>(TState state)
            {
                return null;
            }

            public bool IsEnabled(LogLevel logLevel)
            {
                return true;
            }

            public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
            {
                Console.WriteLine("");
                Console.WriteLine(formatter?.Invoke(state, exception));
                Console.WriteLine("");
            }
        }

        public class NullLogger : ILogger
        {
            public IDisposable BeginScope<TState>(TState state)
            {
                return null;
            }

            public bool IsEnabled(LogLevel logLevel)
            {
                return true;
            }

            public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
            {
                //não faz nada
            }
        }

        public class SqlServerLoggerProvider : ILoggerProvider
        {
            private readonly IList<string> categoriasASeremLogadas = new List<string>
            {
                DbLoggerCategory.Model.Name,
                DbLoggerCategory.Database.Command.Name,
                DbLoggerCategory.Model.Validation.Name
            };

            public static SqlServerLoggerProvider Create()
            {
                return new SqlServerLoggerProvider();
            }

            public ILogger CreateLogger(string categoryName)
            {
                if (categoriasASeremLogadas.Contains(categoryName))
                {
                    return new SqlServerLogger();
                }
                return new NullLogger();
            }

            public void Dispose()
            {
            }
        }

        public static void LogSQLToConsole(this DbContext contexto)
        {
            var serviceProvider = contexto.GetInfrastructure();
            var loggerFactory = serviceProvider.GetService<ILoggerFactory>();
            loggerFactory.AddProvider(SqlServerLoggerProvider.Create());
        }
    }
}