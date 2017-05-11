import * as React from 'react';
import { observer } from 'mobx-react';
import { BorderLayout as BorderLayoutModel } from '../models/BorderLayout';
import  './styles/borderLayout.css';

@observer
export class BorderLayout extends React.Component<{ model: BorderLayoutModel }, {}>{

    clickHandel() {
        this.props.model.title = "aaaaaa";
    }

    render() {

        return <div>
            {this.props.model.east ? <div className='east'>east</div> : null}
            {this.props.model.center ? <div className='center'>center</div> : null}
            {this.props.model.west ? <div className='west'>west</div> : null}
            {this.props.model.north ? <div className='north'>north</div> : null}
            {this.props.model.south ? <div className='south'>south</div> : null}
            <button onClick={this.clickHandel.bind(this)}>{this.props.model.title}</button>
        </div>
    }
}