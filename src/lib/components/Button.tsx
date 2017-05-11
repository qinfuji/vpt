
import * as React from 'react';
import { observer } from 'mobx-react';
import { Button as ButtonModel } from '../models/Button';
import * as styles from './styles/button.css';


@observer
export class Button extends React.Component<ButtonModel, {}>{
        constructor(props: ButtonModel, context?: any) {
                super(props, context);
        }

        render() {
                return <button>Button</button>
        }
}