import { Card, CardContent, CardHeader, TextField } from "@mui/material";

export default function Withdraw (){
    return (
        <main className="min-h-screen flex justify-center items-center px-20 py-10">
            <Card sx={{width: 380, height: 300}}>
                <CardHeader sx={{textAlign: "center"}}
                title="Withdraw Funds"
                subheader="Withdraw money from your account" />
            
              <CardContent>
                  <form className="flex flex-col gap-3">
                     <div>
                       <TextField
                         fullWidth
                         size="small"
                         id="amount"
                         label="Withdrawal Amount"
                         type="number"
                         placeholder="Enter withdrawal amount"
                       />
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
                        />
                     </div>
                     <button className="w-full h-10 bg-[#1D4ED8] text-white rounded-md cursor-pointer " type="submit">Withdraw Funds</button>
                  </form>
              </CardContent>
          </Card>
        </main>
    )
}