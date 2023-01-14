import Blog from "./Blog";
import { Blogs } from "../data/Blogs";
import '../stylesheets/BlogList.css'
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";


const filterBlogs = (keyword, blogs)=>{
    keyword = keyword.toLowerCase();
    return null;
    // let filterList = Blogs.filter(blog=>{
    //     return blog.title.toLowerCase().includes(keyword) || blog.author.toLowerCase().includes(keyword) ||
    //     blog.genre.toLowerCase().includes(keyword) || blog.plot.toLowerCase().includes(keyword);
    // })
    // let FilterBlogs = filterList.map(blog=>{
    //     return <Blog title={blog.title} author={blog.author} img={blog.img} plot={blog.plot} genre={blog.genre} year={blog.publishedON}/>
    // })
    // return FilterBlogs; 
}

const BlogList = ()=>{
    const sizeOfPage = 4;
    const [blogs, setBlogs] = useState(null);
    const [keyword, setKeyword] = useState(null);
    const [currPage, setPage] = useState(1);

    useEffect(()=>{
        async function fetchData() {
          const response = await axios.get('http://localhost:5000/blogs');
          const {data} = response
          setBlogs(data)
        }
        fetchData()
    }, [])

    const deleteBlog = (index)=>{
        if(!blogs) return;
        let newBlogs = blogs;
        newBlogs.splice(index, 1);
        setBlogs([...newBlogs]);
    }
    
    let currBlogs = null;
    if(blogs) {
        currBlogs = blogs.filter((blog, index)=>{
        return index>=sizeOfPage*(currPage-1) && index<sizeOfPage*currPage;
    })}
    let allBlogs = null;
    if(currBlogs) {
        allBlogs = currBlogs.map((blog, index)=>{
        return <Blog 
        title={blog.title} 
        author={blog.author}
        img={blog.img}
        plot={blog.plot}
        genre={blog.genre}
        year={blog.publishedON}
        delete={()=>deleteBlog(index)}
        />
    })}

    let totalPages = 0;
    let allPages = []
    let prevPage = null, nextPage = null;
    let paging = [];
    if(blogs) {
        totalPages = Math.ceil(blogs.length/sizeOfPage);
        for(let i=1;i<=totalPages;i++) allPages.push(i);
        let curPageStyle = {
            color: 'black',
            backgroundColor: 'darkseagreen'
        };

        if(currPage>1) prevPage = <p className="prevpage" onClick={()=>setPage(currPage-1)}>⏮️Previous</p>
        if(currPage<totalPages) nextPage = <p className="nextpage" onClick={()=>setPage(currPage+1)}>Next⏭️</p>
        paging = allPages.map(page=>{
            if(currPage==page)
            return <p className="page" style={curPageStyle} onClick={()=>setPage(page)}>{page}</p>
            else
            return <p className="page" onClick={()=>setPage(page)}>{page}</p>
        })
    }
    
    return (
        <div className="BlogList">
            <h1 className="headline">📚Comic Collection Library🛒</h1>
            <button className="summary">
                <Link to="/summary">Compressed View</Link>
            </button>
            <div className="filter">
                <input type="text" className="FilterInput" onChange={
                    event=>setKeyword(event.target.value)
                } placeholder="Type keywords to search"/>
                {keyword!=null && keyword.length>0 && <button><Link to={"/search/"+keyword}>SEARCH</Link></button>}
            </div>

            {allBlogs}
            
            <div className="pagination">
                {prevPage}
                {paging}
                {nextPage}
            </div>
        </div>
    )
}

export {BlogList, filterBlogs};