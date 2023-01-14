import {Link, useParams} from 'react-router-dom'
import '../stylesheets/Filter.css'
import { filterBlogs } from './BlogList';

const Filter = ()=>{
    const {keyword} = useParams();
    const blogs = filterBlogs(keyword)
    let body;
    if(keyword=="null") {
        body = <div className='body'>
            <h1 className='heading'>No Keyword Entered !</h1>
        </div>
    }
    else {
        body = <div className='body'>
            <h1 className='heading'>{blogs.length} Filter results found on {keyword}</h1>
            {blogs}
        </div> 
    }
    return (
        <div className="Filter">
            <button className="home">
                <Link to="/">All Comics</Link>
            </button>
            {body}
        </div>
    )
}

export default Filter;