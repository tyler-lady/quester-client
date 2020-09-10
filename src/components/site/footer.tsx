import React from 'react';
import { Row } from 'reactstrap';

type FooterProps = {
    message?:  ""
  }


class Footer extends React.Component <FooterProps> {
    constructor(props: FooterProps){
      super(props)
    }
  
    render(){
      return (
        <footer className="footer">
            <Row>
                <p>&copy; OGTJ 2020</p>
            </Row>
        </footer>
      );
    }
  }
  
  export default Footer;