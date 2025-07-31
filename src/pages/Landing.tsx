import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, TrendingUp, Target, CheckCircle, BarChart3, PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-primary/80 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Master Your <span className="text-primary-glow">Money</span> & <span className="text-primary-glow">Time</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Platform lengkap untuk mengelola keuangan pribadi dan produktivitas harian Anda. 
              Capai tujuan finansial sambil tetap terorganisir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/auth">Mulai Gratis</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
                <Link to="/auth">Masuk</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Semua yang Anda Butuhkan dalam Satu Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Kelola tugas, pantau keuangan, dan capai tujuan finansial dengan mudah
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CalendarDays className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">To-Do List Cerdas</CardTitle>
                <CardDescription>
                  Kelola tugas dengan deadline, reminder otomatis, dan tracking progress real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Reminder berbasis tanggal
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Prioritas tugas otomatis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Tracking produktivitas
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Cashflow Tracker</CardTitle>
                <CardDescription>
                  Monitor pemasukan dan pengeluaran dengan visualisasi data yang intuitif
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Grafik mingguan & bulanan
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Kategori pengeluaran
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Analisis tren keuangan
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Financial Goals</CardTitle>
                <CardDescription>
                  Set dan track tujuan finansial dengan progress bar dan timeline yang jelas
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <PiggyBank className="w-4 h-4 text-primary" />
                    Target menabung otomatis
                  </li>
                  <li className="flex items-center gap-2">
                    <PiggyBank className="w-4 h-4 text-primary" />
                    Progress visualization
                  </li>
                  <li className="flex items-center gap-2">
                    <PiggyBank className="w-4 h-4 text-primary" />
                    Milestone tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary-glow/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kenapa Memilih Platform Kami?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Gratis untuk memulai</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Akses kapan saja</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">🔒</div>
              <div className="text-muted-foreground">Data aman & terenkripsi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">📱</div>
              <div className="text-muted-foreground">Responsive semua device</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Mulai Mengelola Keuangan & Produktivitas Anda Hari Ini
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Bergabung dengan ribuan pengguna yang sudah merasakan manfaatnya
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/auth">Daftar Sekarang - Gratis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;