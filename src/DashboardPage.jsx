// src/pages/DashboardPage.jsx
import { useState, useEffect } from "react";
import { useNavigate }            from "react-router-dom";
import { motion }                 from "framer-motion";
import {
  onAuthChange,
  fetchUserProfile,
  doSignOut,
} from "./firebaseConfig";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Menu   as MenuIcon,
  X      as XIcon,
  HomeIcon,
  CreditCardIcon,
  ClockIcon,
  UserIcon,
  LifeBuoyIcon,
  LogOutIcon,
  PlusIcon,
  RefreshCwIcon,
  DownloadIcon,
} from "lucide-react";
import Navbar from "./Navbar";

export default function DashboardPage() {
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading,     setLoading]     = useState(true);
  const [userData,    setUserData]    = useState({
    uid: "", name:"", email:"", phone:"", photoUrl:"",
    cards:[], transactions:[], activity:[]
  });

  // subscribe → redirect → fetch profile
  useEffect(() => {
    console.log("Dashboard useEffect triggered.");
    const unsub = onAuthChange(async user => {
      if (!user) {
        nav("/login", { replace: true });
        return;
      }
      const p = await fetchUserProfile(user.uid);
      setUserData({
        uid:      user.uid,
        name:     p?.fullName || user.email,
        email:    p?.email    || user.email,
        phone:    p?.phone    || "",
        photoUrl: p?.photoUrl || "",
        cards:         p?.cards         || [],
        transactions:  p?.transactions  || [],
        activity:      p?.activity      || [],
      });
      setLoading(false);
    });
    return unsub;
  }, [nav]);

  // pivot‑loader
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <motion.img
          src="/images/king-front1.png"
          alt="Loading card"
          className="w-24"
          animate={{ rotateY: [-30,30,-30] }}
          transition={{ duration:1.2, repeat:Infinity, ease:"easeInOut" }}
        />
      </div>
    );
  }

  // sign‑out
  const handleSignOut = () => {
    doSignOut().then(() => nav("/login", { replace: true }));
  };

  // widgets…
  const QuickActions = () => (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-4">
      <h3 className="font-semibold">Quick Actions</h3>
      <button onClick={() => nav("/signup")}
        className="flex w-full items-center gap-3 px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700">
        <PlusIcon /> Link New Card
      </button>
      <button onClick={()=>window.location.reload()}
        className="flex w-full items-center gap-3 px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700">
        <RefreshCwIcon /> Refresh Cards
      </button>
      <button onClick={()=>alert("Downloading…")}
        className="flex w-full items-center gap-3 px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700">
        <DownloadIcon /> Download Cards
      </button>
    </div>
  );
  const StatsChart = ({ data }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
      <h3 className="font-semibold mb-2">Monthly Activity</h3>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={{ backgroundColor:"#333", border:"none" }}/>
          <Line type="monotone" dataKey="count" stroke="#F97316" strokeWidth={2}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  const ProfileSummary = ({ profile }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-1">
      <h3 className="font-semibold">Profile</h3>
      <div><strong>Email:</strong> {profile.email}</div>
      <div><strong>Phone:</strong> {profile.phone||"—"}</div>
    </div>
  );
  const TransactionsTable = ({ data }) => (
    <div className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-xl">
      <table className="min-w-full table-auto">
        <thead className="bg-white/10">
          <tr>
            {["Date","Card","Amount","Status"].map(h=>(
              <th key={h} className="px-4 py-2 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(tx=>(
            <tr key={tx.id} className="hover:bg-white/10">
              <td className="px-4 py-2">{tx.date}</td>
              <td className="px-4 py-2">{tx.card}</td>
              <td className="px-4 py-2">${tx.amount.toFixed(2)}</td>
              <td className="px-4 py-2">{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Navbar />

      {/* mobile hamburger */}
      {!sidebarOpen && (
        <button
          className="fixed top-16 left-4 z-50 p-2 bg-zinc-800 rounded-md md:hidden"
          onClick={()=>setSidebarOpen(true)}
        ><MenuIcon size={24}/></button>
      )}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={()=>setSidebarOpen(false)}
        />
      )}

      {/* sidebar */}
      <aside className={`
        fixed top-16 bottom-0 left-0 w-64 bg-zinc-900 p-6
        transform transition-transform z-30
        md:relative md:translate-x-0
        ${sidebarOpen?"translate-x-0":"-translate-x-full"}
      `}>
        <button
          onClick={()=>setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1 bg-zinc-800 rounded md:hidden"
        ><XIcon size={20}/></button>
        <p className="text-gray-400 text-sm">Signed in as</p>
        <p className="text-lg font-semibold mb-6">{userData.name}</p>
        <nav className="space-y-4">
          {[
            ["Dashboard","/dashboard",<HomeIcon/>],
            ["Cards","/cards",<CreditCardIcon/>],
            ["Activity","/activity",<ClockIcon/>],
            ["Profile","/profile",<UserIcon/>],
            ["Support","/support",<LifeBuoyIcon/>],
          ].map(([label,to,icon])=>(
            <button key={label}
              onClick={()=>{nav(to);setSidebarOpen(false)}}
              className="flex items-center gap-3 text-gray-200 hover:text-white w-full"
            >{icon}<span>{label}</span></button>
          ))}
          <button onClick={handleSignOut}
            className="mt-6 flex items-center gap-3 text-red-400 hover:text-red-500"
          ><LogOutIcon/> Sign out</button>
        </nav>
      </aside>

      {/* main */}
      <main className="flex-1 pt-16 md:pt-20 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {userData.name.split(" ")[0]}
        </h1>

        {/* photo + card */}
        <div className="flex flex-col items-center mb-8 space-y-4">
          {userData.photoUrl
            ? <img
                src={userData.photoUrl}
                className="w-24 h-24 rounded-full border-2 border-orange-500"
              />
            : <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-zinc-600">
                <UserIcon size={32} className="text-zinc-500"/>
              </div>
          }
          {userData.cards[0] && (
            <div className="w-64 h-40 bg-transparent rounded-xl">
              <img
                src={userData.cards[0].image}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QuickActions />
          <StatsChart data={userData.activity} />
          <ProfileSummary profile={userData} />
        </div>

        {/* transactions */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <TransactionsTable data={userData.transactions}/>
        </section>
      </main>
    </div>
  );
}
