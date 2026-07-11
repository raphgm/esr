import { PageBanner } from "./PageBanner";
import { CategoryTabs } from "./CategoryTabs";
import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Wallet,
  RefreshCcw,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { db, saveUserProfile } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserProfile } from "../types";
import confetti from "canvas-confetti";

interface PaymentsSectionProps {
  userProfile?: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
  isNewAccount?: boolean;
}

export default function PaymentsSection({ userProfile, onUpdateProfile, isNewAccount }: PaymentsSectionProps) {
  // Default fallback transaction data
  const defaultTxs = [
    {
      id: "tx-init-1",
      type: "receive" as const,
      amount: 45000,
      sender: "TechCorp Logistics",
      date: "Jul 10, 10:24 AM",
      status: "completed" as const,
      description: "Milestone payment for Enterprise Cloud Migration"
    },
    {
      id: "tx-init-2",
      type: "send" as const,
      amount: 15000,
      receiver: "John Doe (Freelancer)",
      date: "Jul 09, 03:15 PM",
      status: "completed" as const,
      description: "Sub-contractor payout for front-end integration"
    },
    {
      id: "tx-init-3",
      type: "send" as const,
      amount: 120000,
      receiver: "Equipment Supplier HQ",
      date: "Jul 02, 09:00 AM",
      status: "pending" as const,
      description: "GPU Cluster Rental deposit"
    },
    {
      id: "tx-init-4",
      type: "receive" as const,
      amount: 80000,
      sender: "Acme Consulting",
      date: "Jun 28, 01:45 PM",
      status: "completed" as const,
      description: "Contractor sign-on retainer bonus"
    }
  ];

  // Dynamic values derived from Firestore profile or fallback values
  const balance = userProfile ? (userProfile.walletBalance ?? (isNewAccount ? 0 : 1250000)) : 1250000;
  const transactions = userProfile ? (userProfile.walletTransactions ?? (isNewAccount ? [] : defaultTxs)) : defaultTxs;

  const [showTransferMode, setShowTransferMode] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");
  const [isTransferLoading, setIsTransferLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Funding Modal States
  const [showFundingModal, setShowFundingModal] = useState(false);
  const [fundingAmount, setFundingAmount] = useState("");
  const [isFundingLoading, setIsFundingLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferAmount || !transferRecipient) return;
    if (!userProfile || !onUpdateProfile) {
      alert("Please sign in to make a real-time persistent transfer.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsTransferLoading(true);

    const amountNum = parseFloat(transferAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setErrorMessage("Please enter a valid transfer amount.");
      setIsTransferLoading(false);
      return;
    }

    if (balance < amountNum) {
      setErrorMessage(`Insufficient funds! Your available balance is $${balance.toLocaleString()}.`);
      setIsTransferLoading(false);
      return;
    }

    let cleanRecipient = transferRecipient.trim();
    if (cleanRecipient.startsWith("@")) {
      cleanRecipient = cleanRecipient.substring(1);
    }

    try {
      // Look up recipient in Firestore
      const usersCol = collection(db, "users");
      const qHandle = query(usersCol, where("handle", "==", cleanRecipient));
      const qEmail = query(usersCol, where("email", "==", cleanRecipient));
      const qName = query(usersCol, where("name", "==", cleanRecipient));

      const [snapHandle, snapEmail, snapName] = await Promise.all([
        getDocs(qHandle),
        getDocs(qEmail),
        getDocs(qName)
      ]);

      const recipientDoc = snapHandle.docs[0] || snapEmail.docs[0] || snapName.docs[0];
      const txId = "tx_" + Date.now();
      const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

      if (recipientDoc) {
        // Real-time peer-to-peer transfer updates both users in Firestore!
        const recipientUid = recipientDoc.id;
        const recipientData = recipientDoc.data() as UserProfile;
        
        const rBalance = recipientData.walletBalance ?? 0;
        const rTxs = recipientData.walletTransactions ?? [];

        const newRecipTx = {
          id: txId,
          type: "receive" as const,
          amount: amountNum,
          sender: userProfile.name || userProfile.email || "ESTARR Member",
          date: dateStr,
          status: "completed" as const,
          description: `Transfer from @${userProfile.handle || userProfile.name || "member"}`
        };

        // Persist to recipient document
        await saveUserProfile(recipientUid, {
          walletBalance: rBalance + amountNum,
          walletTransactions: [newRecipTx, ...rTxs]
        });

        // Update sender (current user) state & document
        const newSenderTx = {
          id: txId,
          type: "send" as const,
          amount: amountNum,
          receiver: recipientData.name || recipientData.email || cleanRecipient,
          date: dateStr,
          status: "completed" as const,
          description: `Transfer to @${recipientData.handle || cleanRecipient}`
        };

        await onUpdateProfile({
          ...userProfile,
          walletBalance: balance - amountNum,
          walletTransactions: [newSenderTx, ...transactions]
        });

        setSuccessMessage(`Successfully transferred $${amountNum.toLocaleString()} directly to ${recipientData.name}!`);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        // Handle simulation or pending holds for unregistered user handles
        const newSenderTx = {
          id: txId,
          type: "send" as const,
          amount: amountNum,
          receiver: transferRecipient,
          date: dateStr,
          status: "pending" as const,
          description: `Pending escrow transfer to off-platform handle @${cleanRecipient}`
        };

        await onUpdateProfile({
          ...userProfile,
          walletBalance: balance - amountNum,
          walletTransactions: [newSenderTx, ...transactions]
        });

        setSuccessMessage(`Recipient not yet registered. We've created a pending Escrow hold of $${amountNum.toLocaleString()} for @${cleanRecipient}. Once they join, they can claim this transfer.`);
      }

      setTransferAmount("");
      setTransferRecipient("");
      setTimeout(() => {
        setShowTransferMode(false);
        setSuccessMessage("");
      }, 4500);

    } catch (err: any) {
      console.error("Transfer error:", err);
      setErrorMessage("An error occurred while routing the transfer. Please try again.");
    } finally {
      setIsTransferLoading(false);
    }
  };

  const handleFundWallet = async (amount: number) => {
    if (!userProfile || !onUpdateProfile) {
      alert("Please sign in to fund your wallet securely.");
      return;
    }

    setIsFundingLoading(true);
    try {
      const txId = "tx_" + Date.now();
      const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

      const newTx = {
        id: txId,
        type: "receive" as const,
        amount,
        sender: "External Bank / Card",
        date: dateStr,
        status: "completed" as const,
        description: "Wallet Refill / Funding"
      };

      await onUpdateProfile({
        ...userProfile,
        walletBalance: balance + amount,
        walletTransactions: [newTx, ...transactions]
      });

      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.7 }
      });

      setShowFundingModal(false);
      setFundingAmount("");
    } catch (err: any) {
      console.error("Funding error:", err);
      alert("Failed to fund wallet.");
    } finally {
      setIsFundingLoading(false);
    }
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
        <div className="lg:col-span-1 bg-slate-950 text-white border border-slate-800 p-6 shadow-xl rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Available Balance
              </span>
              <Wallet className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-4xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] text-emerald-400 font-mono mt-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Insured by ESTARR Trust Protocols
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => {
                setErrorMessage("");
                setSuccessMessage("");
                setShowTransferMode(true);
              }}
              className="flex-1 bg-purple-600 hover:bg-white text-white hover:text-slate-950 py-2.5 px-3 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs font-bold uppercase tracking-wider rounded-lg shadow-md hover:scale-[1.02]"
            >
              <Send className="w-3.5 h-3.5" /> Transfer
            </button>
            <button
              onClick={() => setShowFundingModal(true)}
              className="flex-1 bg-slate-900 border border-slate-700 hover:border-purple-500 py-2.5 px-3 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white rounded-lg hover:scale-[1.02]"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Fund
            </button>
          </div>
        </div>

        {/* Transfer Form OR Main Activity */}
        <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-xl flex flex-col">
          {showTransferMode ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-slate-900">
                    Initiate Transfer
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono">SECURE REAL-TIME SETTLEMENT</p>
                </div>
                <button
                  onClick={() => setShowTransferMode(false)}
                  className="text-xs font-bold text-slate-500 hover:text-rose-600 uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-start gap-2 animate-shake">
                  <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-start gap-2 animate-fade-in">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleTransfer} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                    Recipient (@username, handle, or registration email)
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isTransferLoading}
                    value={transferRecipient}
                    onChange={(e) => setTransferRecipient(e.target.value)}
                    placeholder="e.g. @chinedu_creates or recipient@estarrapp.com"
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:outline-none focus:border-purple-500 focus:bg-white font-medium rounded-lg transition-colors"
                  />
                  <p className="text-[9px] text-slate-400 font-mono italic">
                    Type a registered handle to perform an instant transfer. Unregistered names will route through secure Escrow.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    disabled={isTransferLoading}
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="Enter amount (e.g. 15000)"
                    className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:outline-none focus:border-purple-500 focus:bg-white font-mono font-bold rounded-lg transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isTransferLoading}
                  className="w-full bg-slate-950 hover:bg-purple-600 disabled:bg-slate-300 text-white py-3.5 rounded-lg font-bold uppercase tracking-wider cursor-pointer transition-all shadow-md hover:shadow-lg text-xs flex items-center justify-center gap-2 mt-2"
                >
                  {isTransferLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Resolving Ledger & Transferring...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Authorize Secure P2P Transfer
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 rounded-t-xl">
                <h3 className="font-bold uppercase tracking-tight text-slate-900 text-xs">
                  Recent Ledger Transactions
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Live Firestore Registry
                </span>
              </div>
              
              {transactions.length === 0 ? (
                <div className="p-8 text-center flex flex-col items-center justify-center gap-3">
                  <Wallet className="w-10 h-10 text-slate-300" />
                  <p className="text-slate-500 text-xs font-mono">No transactions recorded on this account yet.</p>
                  <button 
                    onClick={() => setShowFundingModal(true)}
                    className="text-xs font-bold text-purple-600 hover:underline"
                  >
                    Fund your wallet to begin
                  </button>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
                  {transactions.map((tx: any) => (
                    <div
                      key={tx.id}
                      className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                            tx.type === "receive" 
                              ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                              : "bg-rose-50 border-rose-100 text-rose-600"
                          }`}
                        >
                          {tx.type === "receive" ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-900">
                            {tx.type === "receive" ? (tx.sender || "Credit") : (tx.receiver || "Debit")}
                          </p>
                          {tx.description && (
                            <p className="text-[10px] text-slate-500 leading-tight font-medium">
                              {tx.description}
                            </p>
                          )}
                          <p className="text-[9px] text-slate-400 font-mono mt-0.5">
                            {tx.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-mono font-bold text-xs ${
                            tx.type === "receive" ? "text-emerald-600" : "text-slate-900"
                          }`}
                        >
                          {tx.type === "receive" ? "+" : "-"}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded border ${
                            tx.status === "completed" 
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                              : "bg-amber-50 border-amber-200 text-amber-700"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Funding Modal Overlay */}
      {showFundingModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative">
            <button
              onClick={() => setShowFundingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold"
            >
              ✕
            </button>
            <div className="flex flex-col gap-1.5 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">
                Fund Digital Wallet
              </h3>
              <p className="text-slate-500 text-xs">
                Refill your spendable wallet balance securely. Choose a quick preset or define a custom amount.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[1000, 5000, 20000, 50000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setFundingAmount(preset.toString())}
                  className={`py-3 border rounded-xl text-xs font-bold transition-all ${
                    fundingAmount === preset.toString()
                      ? "border-purple-600 bg-purple-50 text-purple-700 font-extrabold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  ${preset.toLocaleString()}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const amt = parseFloat(fundingAmount);
                if (!isNaN(amt) && amt > 0) {
                  handleFundWallet(amt);
                }
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Custom Funding Amount ($)
                </label>
                <input
                  type="number"
                  min="10"
                  required
                  placeholder="e.g. 5000"
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white font-mono font-bold"
                />
              </div>

              <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowFundingModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isFundingLoading || !fundingAmount}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 text-xs"
                >
                  {isFundingLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Refilling...
                    </>
                  ) : (
                    "Authorize Refill"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
