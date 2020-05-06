import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  //Anonymus class
  return class extends Component {
    state = {
      error: null
    }

    //Need it before the component its created (Before child components are render!)
    componentWillMount() {
      //Once i got the error, clear any error from the req.
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.respInterceptor = axios.interceptors.response.use(resp => resp, error => {
        this.setState({error: error});
      });
    }

    //Interceptors should be ejected after the component its disposed, to prevents MemoryLeaks
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.respInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
        <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
          {this.state.error ? this.state.error.message : null}
        </Modal>
        <WrappedComponent {...this.props} />
      </Aux>
      )
    }
  }
}

export default withErrorHandler;