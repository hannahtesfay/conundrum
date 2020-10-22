import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Transition, Image } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY } from '../utilities/graphql'

function Home() {

    const { user } = useContext(AuthContext)

    const {
        loading,
        data: { getPosts: posts }={}
      } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row>
                <Image src="https://i.imgur.com/GsUG3l0.jpg" fluid style={{borderRadius:10}} alt='Banner image showing clipart of two confused faces'/>
                <h1 className='hero-text'>Conundrum</h1>
                <h2 className='hero-description'>Think outside the box</h2>
                <h2 className='hero-instructions'>Submit your own riddles, or join the discussion and search for the answer!</h2>
            </Grid.Row>
                <Grid.Row className="card-container">
                    { user && (
                        <Grid.Column>
                            <PostForm/>
                        </Grid.Column>
                    )}
                    {loading ? (
                        <h1>Loading posts...</h1>
                    ) : (
                        <Transition.Group>
                            {posts && posts.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                <PostCard post={post}/>
                            </Grid.Column>
                        ))}
                        </Transition.Group>
                    )}
                </Grid.Row>
        </Grid>

    )
}


export default Home;