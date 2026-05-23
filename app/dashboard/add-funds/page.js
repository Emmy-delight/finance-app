    "use client"
import { Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
    amount: yup.number().required("Amount required").min(1000),
    category: yup.string().oneOf(["savings","Food","Rent"]).required("category is required"),
    description: yup.string().required("Description is required").min(10),
});

export default function AddFunds (){
   const {handleSubmit,handleChange,values,errors,touched} = useFormik({
    initialValues:{
       amount: "",
       category: "",
       description: "",
    },
    onSubmit:()=>{
        alert(`I have deposited ₦ ${values.amount} for my ${values.category} `);
    },
    validationSchema:schema,
   })
    return(
        <main className="min-h-screen flex justify-center py-10 px-5">
            <Card sx={{width: 400,height: 390}}>
                <CardHeader
                sx={{textAlign: "center"}}
                title="Add Funds"
                subheader="Desposit money into your account"
                />
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                       <div>
                          <TextField
                          fullWidth
                           label="Amount(₦)"
                           type="number"
                           size="small"
                           placeholder="Enter Amount"
                           id="amount"
                           value={values.amount}
                           onChange={handleChange}
                        />
                        {touched.amount && errors.amount ? <span className="text-sm text-red-500">{errors.amount}</span>: null}
                       </div>
                       <FormControl size="small">
                          <InputLabel id="category-label" >Category</InputLabel>
                          <Select
                           label="category"
                           id="category"
                           labelId="category-label"
                           name="category"
                           value={values.category}
                           onChange={handleChange}
                          >
                             <MenuItem value="Savings"> Savings</MenuItem>
                             <MenuItem value="Food"> Food</MenuItem>
                             <MenuItem value="Rent"> Rent</MenuItem>
                          </Select>
                          {touched.category && errors.category ? <span className="text-sm text-red-500">{errors.category}</span>: null}
                       </FormControl>
                       <div>
                         <TextField
                          fullWidth
                          multiline
                          rows={2}
                          label="Description"
                          id="description"
                          size="small"
                          type="text"
                          placeholder="Description"
                          value={values.description}
                          onChange={handleChange}
                         />
                         {touched.description && errors.description ? <span className="text-sm text-red-500">{errors.description}</span>: null}
                       </div>
                       <button type="submit" className="w-full h-10 text-xl rounded-md shadow-md text-white bg-[#1D4ED8]">Add Funds</button>

                    </form>
                </CardContent>

            </Card>
        </main>
    )
}