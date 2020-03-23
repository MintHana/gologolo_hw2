import React from 'react'
import { Modal } from 'react-materialize';
import { Button } from 'react-materialize';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);


    console.log("Navbar constructed");
  }

  componentDidMount = () => {
      console.log("\tNavbar component did mount");
  }

  componentWillUnmount = () => {
      console.log("\tNavbar component will unmount");
  }

  handleGoHome = () => {
    console.log("handleGoHome");
    this.props.goToHomeCallback();
  }

  handleDelete = () => {
    console.log("handleDelete");
    this.props.deleteCallback(this.props.logo.key);
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div  className='brand-logo' 
            style={ {cursor: "pointer"} }
            onClick={this.handleGoHome}>
            goLogoLo
          </div>
          <ul id="nav-mobile" className="right">
            <Modal
              actions={[
                  <Button flat modal="close" node="button" waves="green" onClick={this.handleDelete}>YES</Button>,
                  <Button flat modal="close" node="button" waves="green">NO</Button>
              ]}
              bottomSheet={false}
              fixedFooter={false}
              header="Delete Confirmation"
              id="modal-0"
              options={{
                  dismissible: true,
                  endingTop: '10%',
                  inDuration: 200,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  opacity: 0.5,
                  outDuration: 200,
                  preventScrolling: true,
                  startingTop: '0%'
              }}
              trigger={<Button node="button" waves="red">&#128465;</Button>}
              >
              <p>
                  <div>
                      Are you sure you want to delete this Logo?
                  </div>
              </p>
            </Modal>
          </ul>
        </div>
      </nav>
    )
  };
}

export default Navbar;