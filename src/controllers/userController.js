const GET=async(req,res)=>{
    
    let { userid } = req.query
    if(!userid) userid = 0

    const users =await req.fetch(`
        select * from users
        where
        case
            when $1 > 0 then userid = $1
            else true
        end
    `,userid)

    res.json(users)
}

export default{
    GET
}