import '../stylesheets/Blog.css'

const Blog = (props)=>{
    return (
        <div className="blog">
            <img src={props.img}/>
            <h1 className='title'>📖{props.title}</h1>
            <h4 className='author'>{props.genre} Written by {props.author}✍️</h4>
            <p className='plot'>{props.plot}</p>
            <button className='delete' onClick={props.delete}>DELETE</button>
        </div>
    )
}

export default Blog;