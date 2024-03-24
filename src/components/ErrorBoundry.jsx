import { Component } from 'react'

class ErrorBoundry extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="box-border h-dvh flex flex-col justify-center items-center">
        <h1 className='md:text-lg lg:text-xl text-base font-medium'>404</h1>
        <h2 className='sm:text-base lg:text-lg text-xs font-medium'>Something went wrong! PLease try after sometime.</h2>
      </div>
    }

    return this.props.children;
  }
}


export default ErrorBoundry;
