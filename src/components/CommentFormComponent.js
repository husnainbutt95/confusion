import React, { Component } from 'react';
import { Button, Modal, ModalHeader , ModalBody, Label, Row, Col } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

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
        alert(`Current state is ${JSON.stringify(values)}`);
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
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".name" id="name" name="name" placeholder="Enter your full name" className="form-control"
                                validators= {{
                                    required, maxLength: maxLength(15),minLength: minLength(2)
                                }} />
                                <Errors
                                    model=".name"
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
export default CommentForm;