import { React, expect, TestUtils } from 'lib/testHelper';
import UserList from './index';
import User from './user';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { shallow, mount } from 'enzyme';
import Paper from 'material-ui/Paper';
import Layout from '../layout/Layout'

const {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} = TestUtils;

describe('UserList', () => {
  const mountWithContext = (node) => mount(node, {
    context: {
      muiTheme: getMuiTheme(),
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired,
    }
  });

  const users = [
    {
      id: 1,
      username: "test",
      email: "test@example.com",
      temp_password: ''
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      temp_password: ''
    }
  ];
  injectTapEventPlugin();

  const wrapper = mountWithContext(<UserList users={users} page={1} pages={1} />);

  it('renders user list component', () => {
    const list = wrapper.find(UserList);
    expect(1).to.equal(list.length);
  })


  it('renders a list of users', () => {
    const list =  wrapper.find(User);
    expect(list).to.have.length(2);
    console.log(list.nodes[0].props.user.username);
    expect(list.nodes[0].props.user.username).to.equal('test');
    expect(list.nodes[0].props.user.email).to.equal('test@example.com');
    expect(list.nodes[1].props.user.email).to.equal('tester@example.com');
    expect(list.nodes[1].props.user.username).to.equal('tester');

  })

});

