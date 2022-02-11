const GET_CATEGORY = async(req,res)=>{
    const category =  await req.fetch(`
    select * from categories
    `)
    res.json(category)
}

const UPDATE_CATEGORY = async(req,res)=>{
    try{
        const {userid,role} = req.userInfo
        console.log(userid,role)
        if(role !== 'admin') res.status(400).json({message:"Only admin can add post"})

        const {categoryId,categoryName} = req.body
        const updated =  await req.fetch(`
        update categories set categoryName=$1, createdData=now() where categoryid=$2
        returning categoryid
        `,categoryName,categoryId)

        if(updated) res.status(200).json({message:"Updated!!!!!"})
        else res.status(400).json({message:"Something wrong"})

    }
    catch(error){
        return res.status(400).json({message:error.message})
    }

}

export default{
    GET_CATEGORY,
    UPDATE_CATEGORY
}