import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useIcons } from "../../utilities/hook";
//
export default function PostItemFooter() {
    const Icons = useIcons();
    return (
        <ListGroup horizontal>
            <ListGroup.Item as='button' variant='light'>
                <Icons.ThumbsUp />
                <span>Like</span>
            </ListGroup.Item>
            <ListGroup.Item as='button' variant='light'>
                <Icons.CommentAlt />
                <span>Comment</span>
            </ListGroup.Item>
            <ListGroup.Item as='button' variant='light'>
                <Icons.Share />
                <span>Share</span>
            </ListGroup.Item>
        </ListGroup>
    );
}
