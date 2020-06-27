import { createBrowserHistory } from 'history';
function forwardTo(location) {
    var history =  createBrowserHistory();
    history.push(location);
    window.location.href = location;
  }
export default forwardTo;