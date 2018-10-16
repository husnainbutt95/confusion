import React from 'react';
import CommentForm from './CommentFormComponent';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDish({dish}){
        if(dish != null){
            return (
                <React.Fragment>
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </React.Fragment>
            );
        }else{
            return (
                <div></div>
            );
        }
    }
    function RenderComments({comments}){
        if(comments != null){
           const dishComment = comments.map((comments) => {
               return (
                <React.Fragment> 
                    <ListGroup key = {comments.id}>
                        <ListGroupItem>{comments.comment}<br/>--{comments.author} 
                        </ListGroupItem>
                    </ListGroup>          
                </React.Fragment>
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
                        <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 ml-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 ml-1">
                            <h3>Comments</h3>
                            <RenderComments comments={props.comments} />
                            <CommentForm />
                        </div>
                    </div>
                </div>
            );
        }else{
            return (<div></div>);
        }
    };
export default DishDetail;