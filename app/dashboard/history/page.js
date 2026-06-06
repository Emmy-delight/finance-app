"use client";

import { db } from "@/config/firebase.config";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";

export default function History() {
  const { data: session } = useSession();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  if (!session) redirect("/login");

  useEffect(() => {
    if (!session?.user?.id) return;

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", session.user.id)
    );

    return onSnapshot(q, (snapshot) => {
      setTransactions(
        snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort(
            (a, b) =>
              new Date(b.timeCreated?.toDate?.() || b.timeCreated) -
              new Date(a.timeCreated?.toDate?.() || a.timeCreated)
          )
      );

      setLoading(false);
    });
  }, [session]);

  const isWithdrawal = (t) => t.type === "withdrawal";

  const formatAmount = (n) =>
    Number(n).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    });

  const formatDate = (d) =>
    d
      ? new Date(d?.toDate?.() || d).toLocaleDateString("en-NG", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  const totals = transactions.reduce(
    (acc, t) => {
      const amount = Number(t.amount);

      isWithdrawal(t)
        ? (acc.withdrawals += amount)
        : (acc.deposits += amount);

      return acc;
    },
    { deposits: 0, withdrawals: 0 }
  );

  const balance = totals.deposits - totals.withdrawals;

  const filtered = transactions.filter((t) =>
    filter === "all"
      ? true
      : filter === "withdrawal"
      ? isWithdrawal(t)
      : !isWithdrawal(t)
  );

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      await deleteDoc(doc(db, "transactions", deleteId));
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  const cards = [
    ["Balance", balance, balance >= 0 ? "bg-blue-700" : "bg-red-600"],
    ["Deposits", totals.deposits, "bg-green-600"],
    ["Withdrawn", totals.withdrawals, "bg-red-500"],
  ];

  return (
    <main className="min-h-screen max-w-2xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction History
      </h1>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {cards.map(([title, value, bg]) => (
          <div key={title} className={`${bg} rounded-xl p-4 text-center`}>
            <p className="text-xs text-white/70 uppercase">{title}</p>
            <p className="text-lg font-bold text-white">
              {formatAmount(value)}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs
        value={filter}
        onChange={(_, v) => setFilter(v)}
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="All" value="all" />
        <Tab label="Deposits" value="deposit" />
        <Tab label="Withdrawals" value="withdrawal" />
      </Tabs>

      {/* Transactions */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : !filtered.length ? (
        <Typography className="text-center text-gray-400">
          No transactions found.
        </Typography>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((t) => {
            const withdrawal = isWithdrawal(t);

            return (
              <div
                key={t.id}
                className="flex items-center justify-between bg-white border rounded-xl p-4"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    withdrawal
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {withdrawal ? (
                    <FiArrowDown size={18} />
                  ) : (
                    <FiArrowUp size={18} />
                  )}
                </div>

                <div className="flex-1 ml-3">
                  <p className="font-semibold capitalize">{t.description}</p>

                  <p className="text-xs text-gray-400">
                    {t.category && (
                      <span className="mr-2 bg-gray-100 px-2 rounded-full">
                        {t.category}
                      </span>
                    )}

                    {formatDate(t.timeCreated)}
                  </p>
                </div>

                <div className="text-right mr-3">
                  <p
                    className={`font-bold ${
                      withdrawal ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {withdrawal ? "-" : "+"} {formatAmount(t.amount)}
                  </p>

                  <p className="text-xs text-gray-400">
                    {withdrawal ? "withdrawal" : "deposit"}
                  </p>
                </div>

                <button
                  onClick={() => setDeleteId(t.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <FiTrash2 size={17} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Modal */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Transaction</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete this transaction?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>

          <Button
            color="error"
            variant="contained"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}