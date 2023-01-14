import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './../components/UI/navbar/Navbar';
import { useEffect } from 'react';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import { useState } from 'react';
import Loader from '../components/UI/loader/Loader';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(id);
        setComments(response.data);
        
    })

    useEffect(() => {
        fetchPostsById(params.id);
        fetchComments(params.id);
        console.log(comments);
    }, [])

    return (
        <div className='post-page'>
            <Navbar/>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <>
                    <div>{post.id}.{post.title}</div>
                    <div>{post.body}</div>
                </>
            }
            <h1>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm => 
                        <div key={comm.id} style={{marginTop: 10}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                        )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;