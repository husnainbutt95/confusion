import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

    function RenderDish({dish}){
        if(dish != null){
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        <CardText>{dish.comments[0].author}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }else{
            return (
                <div></div>
            );
        }
    }
    function RenderComments({comments}){
        if(comments != null){
           const dishComment = comments.map((com) => {
               return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4> 
                    <ListGroup key = {com.id}>
                        <ListGroupItem>{com.comment}<br/>--{com.author} 
                        </ListGroupItem>
                    </ListGroup>          
                </div>
               );
           });
            return dishComment;
        }
        else{
            return (<div>No comments</div>);
        }
    }
    const DishDetail = (props) => {
        if(props != null){
            return (
                <div className="container">
                    <div className="row">
                        <RenderDish dish={props.dish} />
                    </div>
                </div>
            );
        }else{
            return (<div></div>);
        }
    }
export default DishDetail;