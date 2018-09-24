import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';


class DishDetail extends Component{
    constructor(props){
        super(props);
    }
    renderComments(dishComments){
        if(dishComments != null){
           const dishComment = dishComments.map((com) => {
               return (
                    <ListGroup key = {com.id}>
                        <ListGroupItem>{com.comment}<br/>--{com.author} 
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date (Date.parse(com.date)))} </ListGroupItem>
                    </ListGroup>
               );
           });
            return dishComment;
        }
        else{
            return (<div></div>);
        }
    }
    render(){
        if (this.props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                                <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {this.renderComments(this.props.dish.comments)}            
                        </div>
                    </div>
                </div>
            );
            }else{
            return(
                <div></div>
            );
        }
}
}
export default DishDetail;