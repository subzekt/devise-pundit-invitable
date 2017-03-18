import { React, expect, TestUtils } from 'lib/testHelper';
import UserList from './index';
import User from './user';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedComponentsWithType,
  findAllInRenderedTree
} = TestUtils;

describe('UserList', () => {
  const users = [
    {
      id: 1,
      username: "test",
      email: "test@example.com",
      temp_password: ''
    }
  ];
  injectTapEventPlugin();
  const component = renderIntoDocument(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <UserList users={users} page={1} pages={1}  />
    </MuiThemeProvider>

  );

  it('renders user list component', () => {
    const list = scryRenderedComponentsWithType(component, UserList);
    expect(1).to.equal(list.length);
  })

  it('renders a list of users in normal order', () => {
    const list = scryRenderedComponentsWithType(component, User);
    expect(1).to.equal(list.length);
    expect(list[0].props.user.username).to.equal('test');
    expect(list[0].props.user.email).to.equal('test@example.com');
  });
});
