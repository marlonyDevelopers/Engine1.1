using SuperSocket.SocketBase;
using SuperWebSocket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebSocketServerTest
{
    class Program
    {

        static void Main(string[] args)
        {
            Console.WriteLine("Iniciando ....");
            
            var appServer = new WebSocketServer();

            //Setup the appServer
            if (!appServer.Setup(2012)) //Setup with listening port
            {
                Console.WriteLine("Failed to setup!");
                Console.ReadKey();
                return;
            }


            appServer.NewMessageReceived += new SessionHandler<WebSocketSession, string>(appServer_NewMessageReceived);

            Console.WriteLine();

            //Try to start the appServer
            if (!appServer.Start())
            {
                Console.WriteLine("Failed to start!");
                Console.ReadKey();
                return;
            }

            Console.WriteLine("Servidor iniciado, precione 'q' para pararme!");

            while (Console.ReadKey().KeyChar != 'q')
            {
                Console.WriteLine();
                continue;
            }

            //Stop the appServer
            appServer.Stop();

            Console.WriteLine();
            Console.WriteLine("Servidor Terminado!");
        }

        private static void appServer_NewMessageReceived(WebSocketSession session, string value)
        {
            //Console.WriteLine("LLEGO MENSAJE: " + value+", SESSION : "+ session.SessionID);

            String type = getMessageType(value);
            String mess = getReturnMessage(type);
            session.Send(mess);

            Console.WriteLine("recibo " + value);
            Console.WriteLine("envio  " + mess);
        }

        private static String getMessageType(string value)
        {
            String ret = value.Substring(2, 2);//.Replace(":", "");
            return ret;
        }

        private  static Boolean changeNumber = false;
        private static String getReturnMessage(string type)
        {
            String ret = "";
            switch (type)
            {
                case "GC":
                    ret = "&&GC:99985:78020##";
                    break;
                case "L:":
                    ret = "&&L:LOGIN_OK##";
                    break;
                case "I#":
                    ret = "&&I:5:99985:0:78020:1:1111:0:7;22;40;57;75;15;30;51;61;80;16;32;53;65;86:6;21;41;60;74;12;25;49;62;79;13;28;52;67;88:1;26;37;55;76;8;29;39;68;83;10;36;46;72;89:4;20;43;58;77;11;23;44;59;84;17;35;48;64;87:-1:-1:1:-1##";
                    break;
                case "W#":
                    ret = "&&W:99965:118:78020:17;13;60;79;62;43;51;35;68;36;44;49;87;76;12;64;23;30;61;46;11;20;59;77;48;6;83;41;57;84:1:8:7;8;9;10:0:0:[[],[],[],[6,11,13]]:[[1, 1, 1, [17]], [3, 0, 0, [3]], [3, 0, 3, [9]]]:0:0##";
                    break;
                case "CE":
                    ret = "&&CEB:100555:78020:58;25;52;74;21;88;4;32;15;80;7:40;3;8;3;110;200;1500;0;0;3;0##";
                    break;
                case "CN":
                    if (!changeNumber)
                    {
                        changeNumber = true;
                        ret = "&&CN:1;20;41;58;77;5;28;42;64;84;6;29;47;69;90:3;25;38;59;85;8;32;40;60;87;16;35;54;66;88:7;19;44;61;74;12;26;52;62;81;13;36;53;72;83:9;22;37;57;75;10;27;45;63;79;18;34;46;68;80:##";
                    }
                    else
                    {
                        changeNumber = false;
                        ret = "&&CN:7;22;40;57;75;15;30;51;61;80;16;32;53;65;86:6;21;41;60;74;12;25;49;62;79;13;28;52;67;88:1;26;37;55;76;8;29;39;68;83;10;36;46;72;89:4;20;43;58;77;11;23;44;59;84;17;35;48;64;87:##";
                    }
                    break;
                default:
                    break;
            }
            return ret;
        }

    }
}
