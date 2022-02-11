
const ADD_NEW_ADMIN = async (req,res)=>{
    try{
        const { id } = req.body
        const {userid,role} = req.userInfo

        if(!id) return res.status(400).json({message:"Enter user id"})
        if(role !== 'superadmin') return res.status(400).json({message:"Only super admin can add amin"})
        
        const chekUser = await req.fetch(`
        select * from users where userid = $1
        `,id)
        

        if(chekUser.length==0) return res.status(400).json({message:"No user in this username"})
        
        const addUser = await req.fetch(`
        update users set role='admin' where userid = $1
        returning userid
        `,id)

        if(addUser) return res.status(400).json({message:"New admin added by superadmin"})
    }
    catch(error){
        return res.status(400).json({message:error.message})
    }
 }

 const DELETE_ADMIN = async (req,res)=>{
    try{
        const { id } = req.body
        const {userid,role} = req.userInfo

        if(!id) return res.status(400).json({message:"Enter user id"})
        if(role !== 'superadmin') return res.status(400).json({message:"Only super admin can add amin"})
        
        const chekUser = await req.fetch(`
        select * from users where userid = $1
        `,id)

        if(chekUser.length==0) return res.status(400).json({message:"No user in this username"})
        
        const addUser = await req.fetch(`
        update users set role='user' where userid = $1
        returning userid
        `,id)

        if(addUser) return res.status(400).json({message:"Admin deleted by superadmin"})
    }
    catch(error){
        return res.status(400).json({message:error.message})
    }
 }

export default{
    ADD_NEW_ADMIN,
    DELETE_ADMIN
}