import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate'
import {Table} from 'react-bootstrap';
import Modal from 'react-modal';
import { Field, reduxForm } from 'redux-form';
import * as UserActions from '../_actions/user-actions';
import * as ModelActions from '../_actions/model-actions';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },
  cursor:{
    cursor: 'pointer'
  }
};

Modal.setAppElement('#root')

class Home extends Component{
	constructor(props){
		super(props)
		this.state = {
      message: ''
		}
    this.onPageChange = this.onPageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

	}
  componentDidMount(){
    this.props.leads();
  }
  onPageChange(){

  }
  doEdit = (lead) =>{
    this.props.editLead(lead)
    this.props.OPEN_MODEL()
  }
  handleClose = () => {
    this.props.CLOSE_MODEL()
  }
	
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }
  handleSubmit(values){
    if(values.email == '' || values.email == 'example@example.com'){
      this.setState({
        message: "Email Required."
      })
    }
    else{
     this.setState({
        message: ""
      })
     values.id = this.props.user.lead.id
     this.props.updateLead(values);
    }
    console.log(values)
  }
  logout(){
    this.props.logout();
  }

  render(){
		let {handleSubmit, pristine, submitting, user, model} = this.props
      let noData = ( !user.leads ) ? <div className="no-data text-center"><h3>No leads found</h3></div> : ''

		return (
              
      <div className="row">
              <div className="col-md-12">
              <Modal
                isOpen={model.isOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.handleClose}
                style={customStyles}
                contentLabel="Edit Lead"
              >
              <div>
                {this.state.message !== '' ? this.state.message : null}
              </div>
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                  <Field
                    name="email"
                    component="input"
                    type="text"
                    placeholder="Email"
                    className="input"
                  />
                  <div>
                    <button type="submit" className="btn">Submit</button>
                  </div>
                </form>
              </Modal>

              <div>
                <img style={customStyles.cursor} className="pull-right" width="36" src={require('../logout.png')} onClick={this.logout.bind(this)} />
              </div>

                <div className="table-responsive">
                    <Table className="table table-striped">
                          <thead>
                                <tr>
                                  <th>Email</th>
                                  <th>Action</th>
                                  <th></th>
                                  <th></th>
                                </tr>
                          </thead>

                          { user && user.leads &&
                          <tbody>

                                {user.leads.map((lead, index) =>


                                    <tr key={lead.id}>
                                        <td>{lead.email}</td>
                                        <td id={`action-td-`+lead.id} >
                                          <button id={`action-text-`+lead.id} type="button" className="btn btn-block btn-primary" onClick={this.doEdit.bind(this, lead)}>Edit</button>
                                        </td>
                                    </tr>
                                )}
                           </tbody>
                         }

                    </Table>
                    {noData}
                  </div>
                   {user &&  user.pagination &&
                 <ReactPaginate
                  activeClassName="active"
                  pageCount={user.pagination.last_page}
                  onPageChange={this.onPageChange}
                  containerClassName="pagination"
                  breakLabel={<a href="">...</a>}
                 breakClassName={"break-me"}
                 />
                }

            
            </div>
          </div>
		)
	}
}
Home = reduxForm({
  form: 'editform',
  enableReinitialize: true,
})(Home)

function mapActionCreaterToProps(dispatch){
	return bindActionCreators(Object.assign({}, UserActions, ModelActions), dispatch)
}
function mapStateToProps(state){
  let {user, model} = state
	return {
    user:user,
    model: model,
    initialValues: {  
      email:  user.lead  ? user.lead.email  : 'example@example.com',
  	}
  }
}
const ConnectedHomeComponent = connect(mapStateToProps, mapActionCreaterToProps)(Home)
export {ConnectedHomeComponent as HomeComponent};