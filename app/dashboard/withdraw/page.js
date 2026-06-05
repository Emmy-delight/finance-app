  "use client"
import { db } from "@/config/firebase.config";
import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { addDoc, collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import * as yup from "yup";

export default function Withdraw (){
const [balance ,setBalance] = useState(0);
const [loading, setLoading] = useState(false);
const [open,setOpen] = useState(false);
const {data : session} = useSession();

   //making balance available
   useEffect(()=>{
    if(!session?.user?.id) return

     const q = query(collection(db,"transactions"),where("user", "==", session?.user?.id));
     const unsubscribe =  onSnapshot(q,(snapshot)=>{
      const transactions = snapshot.docs.map((doc)=>doc.data());

      const totalDeposits = transactions.filter((t)=> t.type === "deposits" || !t.type)
      .reduce((sum,t)=> sum + Number(t.amount), 0);

      const totalWithdrawals = transactions.filter((t)=> t.type === "withdrawal")
      .reduce((sum,t)=> sum + Number(t.amount),0);

      setBalance(totalDeposits - totalWithdrawals);
      
     });
     return () => unsubscribe();
    
   },[session]);

   const schema = yup.object().shape({
    amount: yup.number().required("Amount is required").min(100,"minimum withdrawal is ₦100").max(balance, `Insufficient funds, your balance is  ₦ ${balance}`),
    description: yup.string().required('Description is required').min(5, "atleast 5 characters"),
   });
   const closeModal = () => setOpen(false);

  const {handleChange, handleSubmit,values,touched,errors} = useFormik({
    initialValues:{
      amount: "",
      description: "",
    },
    onSubmit:async (values, {resetForm})=>{
         try{
          setLoading(true)
          await addDoc(collection(db,"transactions"),{
            user: session?.user?.id,
            type: "withdrawal",
            amount:Number(values.amount),
            description: values.description,
            timeCreated: new Date(),
          })
          setOpen(true)
          setLoading(false);
          resetForm();
         }
         catch(errors){
           console.error("unables to withdraw funds:",errors); 
           resetForm()
         }
    },
    validationSchema: schema,
  })
    return (
        <main className="min-h-screen flex justify-center items-center px-20 py-10">
            <Card sx={{width: 380, height: 400}}>
                <CardHeader sx={{textAlign: "center"}}
                title="Withdraw Funds"
                subheader="Withdraw money from your account" />
              <div>
                 <p className="text-xs font-medium text-gray-500 uppercase text-center">Available balance</p>
                 <p className={`text-xl font-bold mt-0.5 text-center ${balance > 0 ? "text-blue-700" : "text-red-500"}`}>₦{balance.toLocaleString()}</p>
              </div>  
            
              <CardContent>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                     <div>
                       <TextField
                         fullWidth
                         size="small"
                         id="amount"
                         label="Withdrawal Amount"
                         type="number"
                         placeholder="Enter withdrawal amount"
                         onChange={handleChange}
                         value={values.amount}
                       />
                       {touched.amount && errors.amount ? <span className="text-xs text-red-500">{errors.amount}</span> : null}
                     </div>
                     <div>
                        <TextField
                         fullWidth
                         multiline
                         rows={2}
                         type="text"
                         id="description"
                         label="descripton"
                         placeholder="Enter withdrawal notes"
                         onChange={handleChange}
                         value={values.description}
                        />
                        {touched.description && errors.description ? <span className="text-xs text-red-500">{errors.description}</span> : null}
                     </div>
                     <button className="w-full h-10 bg-[#1D4ED8] text-white rounded-md cursor-pointer " type="submit">{loading ? "Withdrawing...." : "Withdraw Funds"}</button>
                  </form>
              </CardContent>
          </Card>
          <Dialog open={open} onClose={closeModal}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <Typography>Withdrawal successful</Typography>
                </DialogContent>
                <DialogActions>
                      <Button onClick={closeModal} >close</Button>
                </DialogActions>
          </Dialog>
        </main>
    )
}