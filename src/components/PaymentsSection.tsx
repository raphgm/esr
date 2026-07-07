import { PageBanner } from "./PageBanner";
import { CategoryTabs } from "./CategoryTabs";
import React, { useState } from "react";
import {
  CreditCard,
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Wallet,
  RefreshCcw,
} from "lucide-react";

export default function PaymentsSection() {
  const [balance, setBalance] = useState(1250000); // in kobo or local equivalent, let's display NGN format
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "receive",
      amount: 45000,
      sender: "TechCorp Logistics",
      date: "Today, 10:24 AM",
      status: "completed",
    },
    {
      id: 2,
      type: "send",
      amount: 15000,
      receiver: "John Doe (Freelancer)",
      date: "Yesterday, 3:15 PM",
      status: "completed",
    },
    {
      id: 3,
      type: "send",
      amount: 120000,
      receiver: "Equipment Supplier HQ",
      date: "Jul 2, 09:00 AM",
      status: "pending",
    },
    {
      id: 4,
      type: "receive",
      amount: 80000,
      sender: "Acme Consulting",
      date: "Jun 28, 1:45 PM",
      status: "completed",
    },
  ]);
  const [showTransferMode, setShowTransferMode] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferAmount || !transferRecipient) return;

    const amountNum = parseFloat(transferAmount);
    setTransactions([
      {
        id: Date.now(),
        type: "send",
        amount: amountNum,
        receiver: transferRecipient,
        date: "Just now",
        status: "pending",
      },
      ...transactions,
    ]);
    setBalance(balance - amountNum);
    setShowTransferMode(false);
    setTransferAmount("");
    setTransferRecipient("");
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageBanner
        title="ESTARR Payments"
        subtitle="DIGITAL WALLETS & TRANSFERS"
        description="Secure digital wallets for managing gig income and peer-to-peer transfers."
        icon={Wallet}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Balance Card */}
        <div className="lg:col-span-1 bg-slate-950 text-white border border-slate-200 p-6 shadow-sm rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono font-bold text-slate-300 font-medium tracking-wide">
                Available Balance
              </span>
              <Wallet className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-4xl font-bold font-mono tracking-tighter">
              ₦{balance.toLocaleString()}
            </h3>
            <p className="text-[10px] text-slate-9000 font-mono mt-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Insured
              by ESTARR Trust
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setShowTransferMode(true)}
              className="flex-1 bg-purple-500 hover:bg-white text-white hover:text-slate-900 border border-transparent hover:border-slate-200 py-2.5 px-3 flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Transfer
            </button>
            <button className="flex-1 bg-transparent border border-slate-700 hover:border-white py-2.5 px-3 flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider text-white">
              <RefreshCcw className="w-3.5 h-3.5" /> Fund
            </button>
          </div>
        </div>

        {/* Transfer Form OR Main Activity */}
        <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-xl flex flex-col">
          {showTransferMode ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b border-slate-200/10 pb-4">
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  Initiate Transfer
                </h3>
                <button
                  onClick={() => setShowTransferMode(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleTransfer} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-slate-900 font-medium tracking-wide">
                    Recipient (@username or Wallet ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={transferRecipient}
                    onChange={(e) => setTransferRecipient(e.target.value)}
                    placeholder="@janedoe"
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:outline-none focus:bg-white font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-slate-900 font-medium tracking-wide">
                    Amount (₦)
                  </label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="10000"
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:outline-none focus:bg-white font-mono font-bold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-950 hover:bg-purple-500 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider cursor-pointer transition-all shadow-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 mt-2 text-xs flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" /> Secure Transfer
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="p-4 border-b-2 border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold uppercase tracking-tight text-sm">
                  Recent Transactions
                </h3>
                <button className="text-[10px] font-bold text-purple-500 hover:text-slate-900 uppercase tracking-wider cursor-pointer">
                  View All
                </button>
              </div>
              <div className="flex flex-col divide-y-2 divide-slate-950/5">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 ${tx.type === "receive" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                      >
                        {tx.type === "receive" ? (
                          <ArrowDownLeft className="w-5 h-5" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-xs">
                          {tx.type === "receive" ? tx.sender : tx.receiver}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {tx.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-mono font-bold text-sm ${tx.type === "receive" ? "text-emerald-600" : "text-slate-900"}`}
                      >
                        {tx.type === "receive" ? "+" : "-"}₦
                        {tx.amount.toLocaleString()}
                      </p>
                      <span
                        className={`inline-block mt-1 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider border border-slate-200 ${tx.status === "completed" ? "bg-slate-100 text-slate-700" : "bg-purple-500 text-white"}`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
