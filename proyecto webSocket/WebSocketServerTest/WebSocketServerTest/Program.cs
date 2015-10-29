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

        public static int extraCount = 0;
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
                    ret = "&&I:5:101475:0:78117:1:1111:0:12;19;48;55;81;15;28;51;61;83;17;34;53;63;86:13;22;45;56;76;16;25;50;64;79;18;32;52;65;82:2;21;42;58;75;11;29;44;60;87;14;30;54;62;89:1;24;40;66;73;3;26;43;69;80;7;33;46;70;90:-1:-1:1:-1##";
                    break;
                case "W#":
                    extraCount = 0;
                    ret = "&&W:101455:3:78117:22;50;79;62;40;82;90;19;56;7;16;17;13;48;25;52;12;73;55;45;76;18;87;75;1;15;32;63;14;83:1:35:7;8;9;10:0:0:[[],[16],[],[]]:[[0, 0, 4, [16]], [1, 1, 3, [3, 4, 12, 13]], [1, 2, 3, [1]]]:0:0##";
                    break;
                case "GE":
                    switch (extraCount)
                    {
                        case 0:
                            ret = "&&GEB:101280:3:78119:60:1:36:-1:[[],[16],[],[]]:[[0, 0, 4, [16]], [1, 1, 3, [3, 4, 12, 13]], [1, 2, 3, [1]]]##";
                        break;
                        case 1:
                            ret = "&&GEB:101100:3:78120:30:1:38:-1:[[],[16],[],[]]:[[0, 0, 4, [16]], [1, 1, 3, [3, 4, 12, 13]], [1, 2, 3, [1]]]##";
                            break;
                        case 2:
                            ret = "&&GEB:100910:6:78122:81:1:39:-1:[[16],[16],[],[]]:[[1, 1, 3, [3, 4, 12, 13]], [1, 2, 3, [1]]]##";
                            break;
                        default:
                            ret = "&&GEB:100715:321:78124:64:1:45:-1:[[16],[3,4,12,13],[],[]]:[[1, 2, 3, [0]]]##";
                            break;
                    }
                    extraCount++;
                    break;
                case "CE":
                    if(extraCount == 0)
                    {
                        ret = "&&CEB:100555:78020:58;25;52;74;21;88;4;32;15;80;7:40;3;8;3;110;200;1500;0;0;3;0##";
                    }
                    else
                    {
                        ret = "&&CEB:102320:78124:42;21;65;2;58;26;69:0;0;1500;0;3;0;3##";
                    }
                    extraCount = 0;
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
