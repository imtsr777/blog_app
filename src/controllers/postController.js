import path from 'path'
const ADDPOST = async(req,res)=>{

    try{

        const {userid,role} = req.userInfo
        if(role !== 'user') res.status(400).json({message:"Only admin can add post"})
        let mimeTypes = ['image/jpeg','image/svg+xml','image/png']
        
        if(!req.files) res.status(400).json({message:"You must upload image"})
        const{file} = req.files
        const {title,category} = req.body

        if(!title) res.status(400).json({message:"Title enter"})
        if(!title) res.status(400).json({message:"Category enter"}) 
        if(!file) res.status(400).json({message:"You must upload image"})
        if(!file.name) res.status(400).json({message:"No file name"})
        if(!mimeTypes.includes(file.mimetype)) res.status(400).json({message:"Only photo"})
        
        const [newPost] = await req.fetch(`
        insert into posts(userId,imageUrl,title,category) values(
            $1,$2,$3,$4)
            returning postId
        `,userid,file.name,title,category)

        file.mv(path.join(process.cwd(),"images",file.name))

        res.json({
            status: 201,
            message: "Post added!",
        })

    }
    catch(error){
        res.json({
            status: 201,
            message:error.message,
        })
    }   
}

const GETPOST = async(req,res)=>{
    const newPost = await req.fetch(`
        select p.imageurl,p.title,p.createddata,c.categoryname,
        concat(u.firstname,' ',u.lastname) as fullname from posts p
         inner join categories c on p.category = c.categoryid
         inner join users u on p.userid = u.userid order by p.createddata desc
        `)
        
    res.json(newPost)
}

export default{
    ADDPOST,
    GETPOST
}
