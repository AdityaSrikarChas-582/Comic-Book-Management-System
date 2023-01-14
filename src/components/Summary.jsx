import { useEffect, useState } from "react";
import { Blogs } from "../data/Blogs";
import "../stylesheets/Summary.css";
import {Link} from "react-router-dom"

const Summary = ()=>{
    const sizeOfPage = 4;
    const [currPage, setPage] = useState(1);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("")
    const [donor, setDonor] = useState("")
    const [location, setLocation] = useState("")
    const [available, setAvailable] = useState("")
    const [borrowerID, setBorrowerID] = useState("")
    const [borrowedMonth, setBorrowedMonth] = useState("")
    const [count, setCount] = useState(Blogs.length)
    const [myBlogs, setMyBlogs] = useState(null)
    const [results, setResults] = useState(null)

    const filterBlogs = (Title, Author, Genre, myDonor, Location, Available)=>{
        Title = Title.toLowerCase()
        Author = Author.toLowerCase()
        Genre = Genre.toLowerCase()
        myDonor = myDonor.toLowerCase()
        Location = Location.toLowerCase()
        Available = Available.toLowerCase()

        let allBlogs = Blogs.filter(blog=>{
            return (blog.title.toLowerCase().includes(Title) || blog.title =="") &&
            (blog.author.toLowerCase().includes(Author) || blog.author=="") &&
            (blog.genre.toLowerCase().includes(Genre) || blog.genre=="") &&
            (blog.Donor.toLowerCase().includes(myDonor) || blog.Donor=="") &&
            (blog.location.toLowerCase().includes(Location) || blog.location=="") &&
            (blog.available.toLowerCase().includes(Available) || blog.available=="")
        })
        return allBlogs;
    }

    const retreiveBlogs = (allBlogs)=>{
        if(allBlogs==null) return null;
        let currBlogs = allBlogs.filter((blog, index)=>{
            return index>=sizeOfPage*(currPage-1) && index<sizeOfPage*currPage;
        })
        return currBlogs
    }

    let totalPages = 0;
    if(results != null)
    totalPages = Math.ceil(results.length/sizeOfPage);
    let allPages = []
    for(let i=1;i<=totalPages;i++) allPages.push(i);
    let curPageStyle = {
        color: 'black',
        backgroundColor: 'darkseagreen'
    };

    let changePage = (page)=>{
        setPage(page)

        let processedBlog2 = retreiveBlogs(results);
        setMyBlogs(processedBlog2)
    }

    let paging = allPages.map(page=>{
        if(currPage==page)
        return <p className="page" style={curPageStyle} onClick={()=>changePage(page)}>{page}</p>
        else
        return <p className="page" onClick={()=>changePage(page)}>{page}</p>
    })

    let finalBlogs = (title, author, genre, donor, location, available)=>{
        setTitle(title)
        setAuthor(author)
        setGenre(genre)
        setDonor(donor)
        setLocation(location)
        setAvailable(available)
        let processedBlog1 = filterBlogs(title, author, genre, donor, location, available);
        let output = (processedBlog1.map((blog, index)=> (
        <tr className="tr">
            <td className="td">{(currPage-1)*sizeOfPage+1+index}</td>
            <td className="td">{blog.title}</td>
            <td className="td">{blog.author}</td>
            <td className="td">{blog.genre}</td>
            <td className="td">{blog.Donor}</td>
            <td className="td">{blog.location}</td>
            <td className="td">{blog.available}</td>
            <td className="td">{blog.borrowerID}</td>
            <td className="td">{blog.borrowedMonth}</td>
        </tr>
        )));
   
        setResults(output)
        setMyBlogs(retreiveBlogs(output))
        setCount(output.length)
    }

    let sortBlogs = ()=>{
        setPage(1)
        let type = document.getElementsByClassName('sorting').value;
        let processedBlog1 = filterBlogs(title, author, genre, donor, location, available);
        if(type=="title") processedBlog1 = processedBlog1.sort((a, b)=>{
            if(a.title.toLowerCase()>b.title.toLowerCase()) return 1;
            else return -1;
        })
        else if(type=="author") processedBlog1 = processedBlog1.sort((a, b)=>{
            if(a.author.toLowerCase()>b.author.toLowerCase()) return 1;
            else return -1;
        })
        else if(type=="genre") processedBlog1 = processedBlog1.sort((a, b)=>{
            if(a.genre.toLowerCase()>b.genre.toLowerCase()) return 1;
            else return -1;
        })
        else if(type=="available") {
            processedBlog1 = processedBlog1.sort((a, b)=>{
                if(a.available.toLowerCase()>b.available.toLowerCase()) return 1
                else return -1
            })
        }

        let output = (processedBlog1.map((blog, index)=> (
        <tr className="tr">
            <td className="td">{(currPage-1)*sizeOfPage+1+index}</td>
            <td className="td">{blog.title}</td>
            <td className="td">{blog.author}</td>
            <td className="td">{blog.genre}</td>
            <td className="td">{blog.Donor}</td>
            <td className="td">{blog.location}</td>
            <td className="td">{blog.available}</td>
            <td className="td">{blog.borrowerID}</td>
            <td className="td">{blog.borrowedMonth}</td>
        </tr>
        )));
   
        setResults(output)
        setMyBlogs(retreiveBlogs(results))

    }
    
    useEffect(()=>{
        finalBlogs("", "", "", "", "", "")
    }, [])

    return (
        <div className="Summary">
            <h1>Summary</h1>
            <button className="home">
            <Link to="/home">Original View</Link>
            </button>
            <div className="border">
                <div className="filter">
                    <b>Filter By : </b>
                    <input type="text" placeholder="Title" onChange={(event)=>finalBlogs(event.target.value, author, genre, donor, location, available)}/>
                    <input type="text" placeholder="Author" onChange={(event)=>(finalBlogs(title, event.target.value, genre, donor, location, available))}/>
                    <input type="text" placeholder="Genre" onChange={(event)=>(finalBlogs(title, author, event.target.value, donor, location, available))}/>
                    <input type="text" placeholder="Donated By" onChange={(event)=>(finalBlogs(title, author, genre, event.target.value, location, available))}/>
                    <input type="text" placeholder="Book Location" onChange={(event)=>(finalBlogs(title, author, genre, donor, event.target.value, available))}/>
                    <input type="text" placeholder="Available" onChange={(event)=>(finalBlogs(title, author, genre, donor, location, event.target.value))}/>
                </div>

                <div className="sorting">
                    <b>Sort By : </b>
                    <input type="radio" id="title" value="title" name="sorting" onClick={
                        ()=>{
                            document.getElementsByClassName('sorting').value = 'title'
                            sortBlogs()
                        }
                    }/>
                    <label>Title </label>
                    <input type="radio" id="author" value="author" name="sorting" onClick={
                        ()=>{
                            document.getElementsByClassName('sorting').value = 'author'
                            sortBlogs()
                        }
                    }/>
                    <label>Author </label>
                    <input type="radio" id="genre" value="genre" name="sorting" onClick={
                        ()=>{
                            document.getElementsByClassName('sorting').value = 'genre'
                            sortBlogs()
                        }
                    }/>
                    <label>Genre </label>
                    <input type="radio" id="available" value="available" name="sorting" onClick={
                        ()=>{
                            document.getElementsByClassName('sorting').value = 'available'
                            sortBlogs()
                        }
                    }/>
                    <label>Available </label>
                </div>
                <h4>Total Comics Found : {count}</h4>

            </div>
            <table className="table">
                <thead className="thead">
                    <tr className="tr">
                        <th className="th">ID</th>
                        <th className="th">Title</th>
                        <th className="th">Author</th>
                        <th className="th">Genre</th>
                        <th className="th">Donated By (Charity)</th>
                        <th className="th">Book Location</th>
                        <th className="th">Available</th>
                        <th className="th">BorrowerID</th>
                        <th className="th">BorrowedMonth</th>
                    </tr>
                </thead>
                {myBlogs}
            </table>

            <div className="pagination">
                {paging}
            </div>
        </div>
    )
}

export default Summary;