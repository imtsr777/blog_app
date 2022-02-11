const GET=async(req,res)=>{
    const users =await req.fetch(`
    select * from users
    `)
    res.json(users)
}

export default{
    GET
}