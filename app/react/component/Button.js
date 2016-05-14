import React, {Component, PropTypes} from 'react';

class Button extends Component {
    
    onclick(e){
        this.props.onClick(e);
    }
    
    render() {
        return (
            <button onClick={this.onclick.bind(this)}>{this.props.label}</button>
        );
    }
}

Button.propTypes = {

};

export default Button;