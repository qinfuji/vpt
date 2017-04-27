import {BorderLayout as BordLayoutModel} from '../lib/models/BorderLayout';
import {BorderLayout as BordLayoutView} from '../lib/components/BorderLayout';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

let borderLayoutModel:BordLayoutModel = new BordLayoutModel();
ReactDOM.render(<BordLayoutView model={borderLayoutModel}/>,document.getElementById("root"));