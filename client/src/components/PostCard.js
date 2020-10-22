import React, { useContext } from 'react';
import { Card, Button, Icon, Label, Image, Popup } from 'semantic-ui-react'
import { Link }  from 'react-router-dom'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton'
import moment from 'moment'

function PostCard({post: { body, createdAt, id, username, likeCount, commentCount, likes }}){

    const { user } = useContext(AuthContext);

    return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://accessit.net.au/wp-content/uploads/2015/02/user-512.png'
          alt='User avatar'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{id, likeCount, likes}} />
        <Popup content='Comment on post' inverted trigger={
            <Button labelPosition='right' as={Link} to={`/posts/${id}`} aria-label='Comment button'>
              <Button color='blue' basic aria-label='Comment button'>
                <Icon name='comment'/>
              </Button>
              <Label basic color='blue' pointing='left'>
                  {commentCount}
              </Label>
            </Button>
        } />
        {user && user.username === username && <DeleteButton postId={id}/> }
      </Card.Content>
    </Card>
    );
}

export default PostCard;