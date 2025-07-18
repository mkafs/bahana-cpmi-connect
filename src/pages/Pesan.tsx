import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Plus, MessageSquare } from "lucide-react";
import type { UserRole } from "@/types/auth";

interface PesanProps {
  userRole?: UserRole;
  userName?: string;
}

export function Pesan({ userRole = "cpmi", userName = "User" }: PesanProps) {
  const conversations = [
    {
      id: 1,
      name: "Ustadz Muhammad",
      role: "Pengajar",
      lastMessage: "Assalamualaikum, tugas untuk minggu depan sudah siap",
      time: "10:30",
      unread: 2,
      avatar: "/avatars/ustadz.jpg"
    },
    {
      id: 2,
      name: "Admin Pusat",
      role: "Admin",
      lastMessage: "Pengumuman: Jadwal ujian telah diperbarui",
      time: "09:15",
      unread: 1,
      avatar: "/avatars/admin.jpg"
    },
    {
      id: 3,
      name: "Siti Nurhaliza",
      role: "CPMI",
      lastMessage: "Kapan jadwal piket kita?",
      time: "08:45",
      unread: 0,
      avatar: "/avatars/siti.jpg"
    },
    {
      id: 4,
      name: "Ibu Sari",
      role: "Pengajar",
      lastMessage: "Materi praktik hari ini sangat bagus",
      time: "Yesterday",
      unread: 0,
      avatar: "/avatars/sari.jpg"
    }
  ];

  const currentChat = {
    id: 1,
    name: "Ustadz Muhammad",
    role: "Pengajar",
    avatar: "/avatars/ustadz.jpg",
    messages: [
      {
        id: 1,
        sender: "Ustadz Muhammad",
        message: "Assalamualaikum warahmatullahi wabarakatuh",
        time: "10:25",
        isOwn: false
      },
      {
        id: 2,
        sender: "Ahmad Fauzi",
        message: "Waalaikumsalam warahmatullahi wabarakatuh, ustadz",
        time: "10:26",
        isOwn: true
      },
      {
        id: 3,
        sender: "Ustadz Muhammad",
        message: "Tugas untuk minggu depan sudah siap. Silakan dipelajari materi tentang adab berkomunikasi",
        time: "10:30",
        isOwn: false
      },
      {
        id: 4,
        sender: "Ahmad Fauzi",
        message: "Baik ustadz, insya Allah akan saya pelajari",
        time: "10:32",
        isOwn: true
      }
    ]
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Pengajar":
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Pengajar</Badge>;
      case "Admin":
        return <Badge className="bg-purple-100 text-purple-800 text-xs">Admin</Badge>;
      case "CPMI":
        return <Badge className="bg-green-100 text-green-800 text-xs">CPMI</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{role}</Badge>;
    }
  };

  return (
    <MainLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pesan</h1>
            <p className="text-muted-foreground">Komunikasi dengan pengajar dan sesama CPMI</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Pesan Baru
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversation List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Percakapan
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari pesan..."
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                        {getRoleBadge(conversation.role)}
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-red-500 text-white min-w-[20px] h-5 rounded-full text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentChat.avatar} />
                  <AvatarFallback>{currentChat.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{currentChat.name}</h3>
                  {getRoleBadge(currentChat.role)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {currentChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ketik pesan..."
                  className="flex-1"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}