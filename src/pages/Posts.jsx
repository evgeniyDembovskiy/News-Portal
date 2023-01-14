import React, { useEffect, useState } from "react";
import "./../styles/App.css"
import PostList from './../components/PostList';
import PostForm from "./../components/PostForm";
import PostFilter from './../components/PostFilter';
import MyModal from './../components/UI/modal/MyModal';
import MyButton from './../components/UI/button/MyButton';
import { usePosts } from "./../hooks/usePosts";

import PostService from "./../API/PostService";
import Loader from "./../components/UI/loader/Loader";
import { useFetching } from "./../hooks/useFetching";
import { getPageCount, getPagesArray } from "./../utils/pages";
import Pagination from "./../components/UI/pagination/Pagination";
import Navbar from './../components/UI/navbar/Navbar';
import { Outlet } from "react-router-dom";


function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: "", query: ""});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers["x-total-count"];
        setTotalPages(getPageCount(totalCount, limit));
    })

    useEffect(() => {
        fetchPosts();
    }, [page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const changePage = (page) => {
        setPage(page);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    };

    return (
        <>
            <Navbar/>
            <div className="App">
                <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                    Создать пост
                </MyButton>
                <MyModal visible={modal} setVisible={setModal}>
                    <PostForm create={createPost}/>
                </MyModal>
                <hr style={{margin: "15px 0"}}/>
                <PostFilter 
                    filter={filter}
                    setFilter={setFilter}
                />
                {postError && 
                    <h1>Произошла ошибка ${postError}</h1>
                }
                {isPostsLoading
                    ?   <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/> </div> 
                    :   <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список новостей"/>
                }
                <Pagination 
                    page={page} 
                    changePage={changePage} 
                    totalPages={totalPages}/>
            </div>
        </>
        
    );
}

export default Posts;
