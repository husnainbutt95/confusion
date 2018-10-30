import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader , ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
 
class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values){
        this.toggleModal;
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render(){
        return (
            <React.Fragment>
            <Button outline onClick={this.toggleModal}>Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    <h3>Add Comments</h3>
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row >
                            <Col md={12} className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" className="form-control" name="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                            <Col md={12} className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" placeholder="Enter your full name" className="form-control"
                                validators= {{
                                    required, maxLength: maxLength(15),minLength: minLength(2)
                                }} />
                                <Errors
                                    model=".author"
                                    className="text-danger"
                                    show="touched"
                                    messages = {{
                                        required : 'Required',
                                        maxLength: 'Must be 15 characters or less',
                                        minLength: 'Must be greater than 2'
                                    }}
                                />
                            </Col>
                            <Col md={12} className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" name="message" className="form-control" rows={4} />
                            </Col>
                            <Col md={12} className="form-group">
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
        );
    }
}

    function RenderDish({dish}){
        if(dish != null){
            return (
                <React.Fragment>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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
    function RenderComments({comments, addComment, dishId}){
        if(comments != null){
            return  (
                <React.Fragment>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {
                            comments.map((comment) => {
                                return(
                                    <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author} {comment.date}</p></li>
                                );
                            })
                        }
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </React.Fragment>
            );
        }
        else{
            return (<div>No comments</div>);
        }
    }
     const DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>    
                </div>
            );
        }
        else if (props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>    
                </div>
            );
        }
        else if(props != null){
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
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                        </div>
                    </div>
                </div>
            );
        }else{
            return (<div></div>);
        }
    };
export default DishDetail;