import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, TextField, Button } from '@material-ui/core';
import Comments from './Comments';
import SendIcon from '@material-ui/icons/Send';
import "../style/Post.css";

function Post() {
    return (
        <div className="post">
            <div className="post__header">
                <ListItem>
                    {/* <ListItemAvatar>
                        <Avatar className="post__avatar" src="https://source.unsplash.com/random" alt="User" />
                    </ListItemAvatar> */}
                    <ListItemText primary={"username"} secondary="Abu Dhabi, UAE" />
                </ListItem>
                <h4 className="post__text"><strong>username: </strong>caption</h4>
                <div className="post__comments">
                    <Comments />
                </div>
                <form className="post__form">
                    <TextField
                        label="add comment"
                        size="small"
                        variant="outlined"
                        className="post__input"
                        placeholder="add comment"
                    />
                    <Button
                        variant="contained"
                        size="small"
                        endIcon={<SendIcon />}
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Post
