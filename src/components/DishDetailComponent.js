import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react';

    function RenderDish({dish}){
        if(dish != null){
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
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
           const dishComment = comments.map((comments) => {
               return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4> 
                    <ListGroup key = {comments.id}>
                        <ListGroupItem>{comments.comment}<br/>--{comments.author} 
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
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }else{
            return (<div></div>);
        }
    };
export default DishDetail;