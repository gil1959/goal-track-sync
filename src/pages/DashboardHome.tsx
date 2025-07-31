import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, TrendingUp, Target, DollarSign, CheckCircle2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { id } from "date-fns/locale";

interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  completedTodos: number;
  totalTodos: number;
  upcomingTodos: Array<{
    title: string;
    deadline: string;
    completed: boolean;
  }>;
  goals: Array<{
    title: string;
    target_amount: number;
    current_amount: number;
    deadline: string;
  }>;
}

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    completedTodos: 0,
    totalTodos: 0,
    upcomingTodos: [],
    goals: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        // Fetch financial data
        const { data: transactions } = await supabase
          .from('transactions')
          .select('amount, type')
          .eq('user_id', user.id);

        // Fetch todos data
        const { data: todos } = await supabase
          .from('todos')
          .select('title, deadline, completed')
          .eq('user_id', user.id)
          .order('deadline', { ascending: true })
          .limit(5);

        // Fetch goals data
        const { data: goals } = await supabase
          .from('goals')
          .select('title, target_amount, current_amount, deadline')
          .eq('user_id', user.id)
          .limit(3);

        // Calculate financial stats
        const income = transactions?.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
        const expense = transactions?.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0) || 0;

        // Calculate todo stats
        const completedTodos = todos?.filter(t => t.completed).length || 0;
        const totalTodos = todos?.length || 0;

        setStats({
          totalBalance: income - expense,
          totalIncome: income,
          totalExpense: expense,
          completedTodos,
          totalTodos,
          upcomingTodos: todos || [],
          goals: goals || []
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const getDateBadge = (deadline: string) => {
    const date = new Date(deadline);
    if (isPast(date) && !isToday(date)) {
      return <Badge variant="destructive">Terlambat</Badge>;
    }
    if (isToday(date)) {
      return <Badge variant="secondary">Hari ini</Badge>;
    }
    if (isTomorrow(date)) {
      return <Badge variant="outline">Besok</Badge>;
    }
    return <Badge variant="outline">{format(date, 'dd MMM', { locale: id })}</Badge>;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Selamat Datang Kembali!</h1>
        <p className="text-muted-foreground">
          Berikut ringkasan aktivitas keuangan dan produktivitas Anda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(stats.totalBalance)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total pemasukan - pengeluaran
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(stats.totalIncome)}
            </div>
            <p className="text-xs text-muted-foreground">
              Semua sumber pemasukan
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(stats.totalExpense)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total semua pengeluaran
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tugas Selesai</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.completedTodos}/{stats.totalTodos}
            </div>
            <Progress 
              value={stats.totalTodos > 0 ? (stats.completedTodos / stats.totalTodos) * 100 : 0} 
              className="mt-2" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Todos */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Tugas Mendatang
            </CardTitle>
            <CardDescription>
              Tugas dengan deadline terdekat
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats.upcomingTodos.length > 0 ? (
              <div className="space-y-3">
                {stats.upcomingTodos.map((todo, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      {todo.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div>
                        <p className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {todo.title}
                        </p>
                        {todo.deadline && (
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(todo.deadline), 'dd MMMM yyyy', { locale: id })}
                          </p>
                        )}
                      </div>
                    </div>
                    {todo.deadline && getDateBadge(todo.deadline)}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Belum ada tugas yang ditambahkan
              </p>
            )}
          </CardContent>
        </Card>

        {/* Financial Goals */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Target Finansial
            </CardTitle>
            <CardDescription>
              Progress menuju tujuan keuangan Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats.goals.length > 0 ? (
              <div className="space-y-4">
                {stats.goals.map((goal, index) => {
                  const progress = (goal.current_amount / goal.target_amount) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{goal.title}</p>
                        <Badge variant="outline">
                          {Math.round(progress)}%
                        </Badge>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            notation: 'compact',
                          }).format(goal.current_amount)}
                        </span>
                        <span>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            notation: 'compact',
                          }).format(goal.target_amount)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Belum ada target finansial yang ditetapkan
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;