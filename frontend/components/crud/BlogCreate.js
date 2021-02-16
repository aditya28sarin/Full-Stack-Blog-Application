import Link from 'next/link';
import {useState, useEffect} from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic'; //we will use react quill as our rich text editor, 
                                    //and it runs only in client side, we want to make sure it does not run ins erver so we use this,
                                    // to dynamically load the component
import {withRouter} from 'next/router';
import {getCookie, isAuth} from '../../actions/auth';
import {getCategories} from '../../actions/category';
import {getTags} from '../../actions/tag';
import {createBlog} from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), {ssr:false});
import '../../node_modules/react-quill/dist/quill.snow.css';

const BlogCreate = ({router}) => {

    const blogFromLS = () => {
        if(typeof window === 'undefined'){
            return false;
        }

        if(localStorage.getItem('blog')){
            return JSON.parse(localStorage.getItem('blog'));
        } else{
            return false;
        }
    }

    const [body, setBody] = useState(blogFromLS());
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [values, setValues] = useState({
        error:'',
        sizeError:'',
        success:'',
        formData:'',
        title:'',
        hidePublishButton:false
    })

    const {error, sizeError, success, formData, title, hidePublishButton} = values;
    
    useEffect(()=>{
        setValues({...values, formData: new FormData});
        initCategories();
        initTags();
    }, [router]);


    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
    };


    const publishBlog = (e) => {
        e.preventDefault();
        console.log('ready to publish blog.');
    }
    //this is a function returning another function 
    const handleChange = name => e => {
       // console.log(e.target.value);
        
       const value = name === 'photo' ? e.target.files[0] : e.target.value;
       formData.set(name, value);
       setValues({...values, [name]: value, formData:formData, error: ''});

    }

    const handleBody = e => {
        //console.log(e);
        setBody(e);
        formData.set('body',e);

        //we want to also save this in local storage so that it is not lost on refresh 

        if(typeof window !== 'undefined'){
            localStorage.setItem('blog',JSON.stringify(e));
        }
    }

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')}/>
                </div>

                <div className="form-group">
                    <ReactQuill modules={BlogCreate.modules} formats={BlogCreate.formats} value={body} placeholder="Type something.." onChange={handleBody} />
                </div>

                <div>
                    <button className="btn btn-primary" type="submit">Publish</button>
                </div>
            </form>
        )
    }
    
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {createBlogForm()}
                    <hr />
                    {JSON.stringify(title)}
                    <hr />
                    {JSON.stringify(body)}
                    <hr />
                    {JSON.stringify(categories)}
                    <hr />
                    {JSON.stringify(tags)}
                </div>
                <div className="col-md-4">
                    <div>
                        <h5>Categories</h5>
                        <hr />
                        <ul style={{maxHeight:'200px', overflowY:'scroll'}}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr />
                        <ul style={{maxHeight:'200px', overflowY:'scroll'}}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

BlogCreate.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};
 
BlogCreate.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];

export default withRouter(BlogCreate);