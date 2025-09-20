import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const profiles = [
    {
      id: 1,
      name: 'Анна',
      age: 25,
      location: '2 км от вас',
      image: '/img/f917f180-2c0e-4f60-9cb2-e782fb658ce7.jpg',
      bio: 'Люблю путешествия и фотографию. Ищу интересного собеседника для долгих прогулок по городу.',
      interests: ['Фотография', 'Путешествия', 'Кофе']
    },
    {
      id: 2,
      name: 'Дмитрий',
      age: 28,
      location: '1.5 км от вас',
      image: '/img/5b451051-e6fc-4693-891e-444fee9b4bc2.jpg',
      bio: 'IT-специалист, увлекаюсь спортом и готовкой. Ценю чувство юмора и искренность.',
      interests: ['Программирование', 'Спорт', 'Кулинария']
    },
    {
      id: 3,
      name: 'Елена',
      age: 23,
      location: '3 км от вас',
      image: '/img/a2e853df-7a0e-4280-9087-0300c0b5cba5.jpg',
      bio: 'Дизайнер и любитель искусства. Всегда в поиске новых впечатлений и креативных идей.',
      interests: ['Дизайн', 'Искусство', 'Музыка']
    }
  ];

  const AuthDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gradient-bg text-white font-medium px-8 py-3 rounded-full">
          Войти
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Добро пожаловать!</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-4">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Пароль" type="password" />
            <Button className="w-full gradient-bg text-white" onClick={() => setCurrentUser({ name: 'Пользователь' })}>
              Войти
            </Button>
          </TabsContent>
          <TabsContent value="register" className="space-y-4">
            <Input placeholder="Имя" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Пароль" type="password" />
            <Input placeholder="Возраст" type="number" />
            <Button className="w-full gradient-bg text-white" onClick={() => setCurrentUser({ name: 'Пользователь' })}>
              Зарегистрироваться
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );

  const ProfileCard = ({ profile }: { profile: any }) => (
    <Card className="relative overflow-hidden rounded-3xl card-hover bg-white shadow-lg">
      <div className="relative h-96">
        <img 
          src={profile.image} 
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-green-500 text-white border-0">
            <Icon name="MapPin" size={12} className="mr-1" />
            {profile.location}
          </Badge>
        </div>
      </div>
      <CardContent className="absolute bottom-0 left-0 right-0 text-white p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold">{profile.name}, {profile.age}</h3>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 rounded-full">
              <Icon name="X" size={20} className="text-white" />
            </Button>
            <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 rounded-full">
              <Icon name="Heart" size={20} className="text-white" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-white/90 mb-3">{profile.bio}</p>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest: string, index: number) => (
            <Badge key={index} variant="secondary" className="bg-white/20 text-white border-0">
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const Navigation = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {[
          { key: 'home', icon: 'Home', label: 'Главная' },
          { key: 'search', icon: 'Search', label: 'Поиск' },
          { key: 'messages', icon: 'MessageCircle', label: 'Сообщения' },
          { key: 'favorites', icon: 'Heart', label: 'Избранное' },
          { key: 'profile', icon: 'User', label: 'Профиль' }
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === item.key 
                ? 'text-primary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon name={item.icon as any} size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );

  if (!currentUser) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col">
        <header className="p-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">❤️ LoveMatch</h1>
          <p className="text-white/90 text-lg">Найди свою вторую половинку</p>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <div className="max-w-sm w-full space-y-6">
            <div className="text-center text-white space-y-4">
              <Icon name="Heart" size={80} className="mx-auto text-white/80" />
              <h2 className="text-2xl font-bold">Начни знакомиться уже сегодня!</h2>
              <p className="text-white/80">
                Миллионы людей рядом с тобой ищут свою любовь. 
                Присоединяйся к нашему сообществу!
              </p>
            </div>
            
            <div className="space-y-4">
              <AuthDialog />
              <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
                Продолжить с Google
              </Button>
            </div>

            <div className="flex items-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={16} />
                <span>Поиск рядом</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Shield" size={16} />
                <span>Безопасно</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Zap" size={16} />
                <span>Быстро</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-xl font-bold text-primary">❤️ LoveMatch</h1>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <Icon name="Bell" size={20} />
            </Button>
            <Button size="icon" variant="ghost">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-20 max-w-md mx-auto">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Люди рядом с вами</h2>
              <p className="text-gray-600">Свайпайте вправо, если нравится!</p>
            </div>
            
            <div className="space-y-4">
              {profiles.map(profile => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Поиск</h2>
            <div className="space-y-4">
              <Input placeholder="Поиск по имени..." />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Возраст от</label>
                  <Input type="number" placeholder="18" />
                </div>
                <div>
                  <label className="text-sm font-medium">до</label>
                  <Input type="number" placeholder="35" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Радиус поиска</label>
                <Input placeholder="5 км" />
              </div>
              <Button className="w-full gradient-bg text-white">Применить фильтры</Button>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Сообщения</h2>
            <div className="text-center py-12">
              <Icon name="MessageCircle" size={60} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Пока нет сообщений</p>
              <p className="text-sm text-gray-400">Начните общаться с людьми, которые вам нравятся!</p>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Избранное</h2>
            <div className="text-center py-12">
              <Icon name="Heart" size={60} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Пока нет избранных</p>
              <p className="text-sm text-gray-400">Лайкайте профили, чтобы добавить их в избранное!</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Профиль</h2>
            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                  <Icon name="User" size={40} className="text-gray-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ваше имя</h3>
                  <p className="text-gray-600">25 лет</p>
                </div>
                <Button className="gradient-bg text-white">Редактировать профиль</Button>
              </div>
            </Card>
            
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="Settings" size={20} className="mr-3" />
                Настройки
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="Shield" size={20} className="mr-3" />
                Приватность
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="HelpCircle" size={20} className="mr-3" />
                Помощь
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-600" onClick={() => setCurrentUser(null)}>
                <Icon name="LogOut" size={20} className="mr-3" />
                Выйти
              </Button>
            </div>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
};

export default Index;