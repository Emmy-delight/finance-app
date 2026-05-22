import { Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export default function AddFunds (){
    return(
        <main className="min-h-screen flex justify-center py-10 px-5">
            <Card sx={{width: 400,height: 370}}>
                <CardHeader
                sx={{textAlign: "center"}}
                title="Add Funds"
                subheader="Desposit money into your account"
                />
                <CardContent>
                    <form className="flex flex-col gap-3">
                       <div>
                          <TextField
                          fullWidth
                           label="Amount(₦)"
                           type="number"
                           size="small"
                           placeholder="Enter Amount"
                           id="amount"
                        />
                       </div>
                       <FormControl size="small">
                          <InputLabel id="category-label" >Category</InputLabel>
                          <Select
                           label="category"
                           id="category"
                           labelId="category-label"
                           name="category"
                          >
                             <MenuItem value="savings"> Savings</MenuItem>
                             <MenuItem value="Food"> Food</MenuItem>
                             <MenuItem value="Rent"> Rent</MenuItem>
                          </Select>
                       </FormControl>
                       <div>
                         <TextField
                          fullWidth
                          multiline
                          rows={3}
                          label="Description"
                          id="description"
                          size="small"
                          type="text"
                          placeholder="Description"
                         />
                       </div>
                       <button type="submit" className="w-full h-12 text-xl rounded-md shadow-md text-white bg-[#1D4ED8]">Add Funds</button>

                    </form>
                </CardContent>

            </Card>
        </main>
    )
}