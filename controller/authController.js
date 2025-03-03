export const login = (req,res) => {
    const {name,email} = req.body

    if (!name || !email ){
        res.json({success:false,message:"Name or Email are required"})
    }

    


}